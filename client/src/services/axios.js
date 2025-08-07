// src/services/axios.js
import axios from "axios";
// import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL:"https://upskiller-backend.onrender.com/api/v1" ,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
