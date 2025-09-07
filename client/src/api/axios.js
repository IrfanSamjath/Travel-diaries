import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // comes from .env
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // keep false unless using auth cookies
});

export default api;
