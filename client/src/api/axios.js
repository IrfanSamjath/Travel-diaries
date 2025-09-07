import axios from "axios";

const api = axios.create({
  // ✅ Use env var in local, Render backend in production
  baseURL: import.meta.env.VITE_API_URL || "https://travel-diaries-backend-e8ud.onrender.com",
});

export default api;
