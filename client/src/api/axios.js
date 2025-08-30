import axios from "axios";

// Get the base URL from environment or use default
let baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Remove trailing slash if present
baseURL = baseURL.replace(/\/$/, "");

// Add /api only if it's not already included
if (!baseURL.endsWith('/api')) {
  baseURL += '/api';
}

console.log("Axios baseURL configured as:", baseURL);
console.log("VITE_API_URL from env:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL,
});

// Add request interceptor for debugging
api.interceptors.request.use((config) => {
  console.log("Making API request to:", config.baseURL + config.url);
  return config;
});

export default api;
