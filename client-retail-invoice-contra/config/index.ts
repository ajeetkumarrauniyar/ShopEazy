import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";

export const useSecureApi = (): AxiosInstance => {
  const { getToken } = useAuth();

  // For development on actual device
  const API_URL = "http://10.0.2.2:5000"; // Android Emulator
  // const API_URL = "http://localhost:5000"; // iOS Simulator

  // For production, you would use a real domain
  // const API_URL = Constants.manifest?.extra?.apiUrl || "https://your-api-domain.com";

  console.log(`Using API URL: ${API_URL}`);

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 15000, // 15 seconds timeout
  });

  // Add token to each request
  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();

        console.log("Token retrieved successfully");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log(`API request with token: ${token.substring(0, 10)}...`);
        } else {
          console.warn("No auth token available");
        }
      } catch (error) {
        console.error("Error getting auth token:", error);
      }
      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Handle response errors consistently
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error(
          `API Error: ${error.response.status}`,
          error.response.data
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);

        // Add more helpful debug info
        if (API_URL.includes("localhost") || API_URL.includes("10.0.2.2")) {
          console.warn(
            "Check if your server is running and accessible from your device/emulator"
          );
        }
      } else {
        // Something happened in setting up the request
        console.error("Request error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return api;
};
