import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";

const API_URL = process.env.API_URL;

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the JWT token
api.interceptors.request.use(async (config) => {
  try {
    const { getToken } = useAuth();
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

// Optional: Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 errors (unauthorized) - could happen if token expires
    if (error.response?.status === 401) {
      // You might want to trigger a sign out or token refresh here
    }
    return Promise.reject(error);
  }
);

export default api;
