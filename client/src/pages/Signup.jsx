import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/ButtonSpinner";
import { Box, Button, TextField } from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';


export default function Signup() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  let handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    // console.log(formData)
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await api.post("/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/");
      console.log(res);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "SignUp failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 2,
          boxShadow: 3, borderRadius: 2,mt:4
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LockOpenIcon sx={{ fontSize: 50, color: "rgb(96 103 149)" }} />
        </div>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          onChange={handleOnChange}
          value={formData.username}
          required
        />
        <TextField
          type="email"
          placeholder="email"
          name="email"
          onChange={handleOnChange}
          value={formData.email}
          required
        />
        <TextField
          type="password"
          placeholder="passwrod"
          name="password"
          onChange={handleOnChange}
          value={formData.password}
          required
        />
        <Button type="submit" variant="contained">
          {loading ? <ButtonSpinner /> : "Signup"}
        </Button>
        
      </Box>
    </div>
  );
}
