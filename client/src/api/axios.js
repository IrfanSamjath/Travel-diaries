import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://travel-diaries-ekeo.onrender.com/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("Making API request to:", config.baseURL + config.url);
  return config;
});

export default api;
