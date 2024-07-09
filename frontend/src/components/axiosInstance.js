import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Replace with your backend's base URL
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Set CSRF token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("csrftoken");
    if (token) {
      config.headers["X-CSRFToken"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
