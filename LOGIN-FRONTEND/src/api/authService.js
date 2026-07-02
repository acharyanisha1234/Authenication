import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

// Request Interceptor – Minimal change
API.interceptors.request.use(
  (config) => {
    // Only add token if the request is NOT for /api/auth/
    if (!config.url.includes("/api/auth/")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (unchanged)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;