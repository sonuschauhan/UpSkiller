import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import Spinner from "../components/Spinner";
import ButtonSpinner from "../components/ButtonSpinner";
import { Box, Button, TextField } from "@mui/material";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function Login() {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    setLoading(true);
    try {
      let res = await api.post("/users/login", {
        username: formData.username,
        password: formData.password,
      });
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      setError("");
      console.log(res);
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "Login failed");
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
        <div style={{display:"flex",justifyContent:"center"}}><LockOpenIcon sx={{ fontSize: 50,color:"rgb(96 103 149)" }}/></div>
        
        <TextField
          type="text"
          placeholder="username"
          name="username"
          onChange={handleOnChange}
          value={formData.username}
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
          {loading ? <ButtonSpinner /> : "Login"}
        </Button>
      </Box>
    </div>
  );
}
