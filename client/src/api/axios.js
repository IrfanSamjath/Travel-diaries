import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://travel-diaries-backend-e8ud.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // keep false unless using auth cookies
});

export default api;
