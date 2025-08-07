import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axios";

// AuthContext
const AuthContext = createContext();

// Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("/users/me") // interceptor adds Authorization header
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => {
          setLoading(false); // ✅ This should always run outside the `then/catch`
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", JSON.stringify(userData.token)); // ✅ Store token correctly
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
