// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://jobportal-backend-ew1j.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;