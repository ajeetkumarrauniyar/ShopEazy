import axios, { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Invoice } from "@/types";

// Get the correct base URL based on the platform
const getBaseUrl = () => {
  // Extract the base URL without any endpoint paths
  const rawUrl = process.env.EXPO_PUBLIC_API_URL || "";
  const baseUrl = rawUrl.split("/api/")[0]; // Get only the base part

  // If running on a physical device or emulator, localhost won't work properly
  if (Platform.OS !== "web" && baseUrl.includes("localhost")) {
    // For Android emulator, use 10.0.2.2 to access host machine's localhost
    if (Platform.OS === "android") {
      return baseUrl.replace("localhost", "10.0.2.2");
    }

    // For iOS simulator
    if (Platform.OS === "ios") {
      return baseUrl.replace("localhost", "host.docker.internal");
    }
  }

  return baseUrl;
};

// Create the API client
const apiClient = axios.create({
  baseURL: `${getBaseUrl()}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log the actual URL being used for debugging
console.log("Using API base URL:", apiClient.defaults.baseURL);

// Add authentication token to every request
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync("clerk_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Using auth token:", token.substring(0, 15) + "...");
    } else {
      console.warn("No auth token found in SecureStore");
    }
  } catch (error) {
    console.error("Error retrieving auth token:", error);
  }
  return config;
});

// Handle responses and errors consistently
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.message === "Network Error") {
      console.error(
        "Network Error: Check your internet connection or API server availability"
      );
      console.error(`Attempted to connect to: ${apiClient.defaults.baseURL}`);
    } else if (error.response) {
      console.error(
        `API Error (${error.response.status}):`,
        error.response.data?.message || error.response.data || "Unknown error"
      );

      // If unauthorized, we might need to refresh the token
      if (
        error.response.status === 401 ||
        (error.response.status === 500 &&
          error.response.data?.message === "Unauthenticated")
      ) {
        console.warn("Authentication error - token may be invalid or expired");
      }
    } else {
      console.error("API Error:", error.message || "Unknown error");
    }

    return Promise.reject(error.response?.data || error.message || error);
  }
);

// Hook to get authenticated API client
export const useAuthenticatedApi = () => {
  const { getToken } = useAuth();

  const getAuthenticatedClient = async () => {
    const token = await getToken();

    if (token) {
      // Store the token in SecureStore for future use
      await SecureStore.setItemAsync("clerk_token", token);

      // Return a client instance with the token
      return {
        ...apiClient,
        defaults: {
          ...apiClient.defaults,
          headers: {
            ...apiClient.defaults.headers,
            Authorization: `Bearer ${token}`,
          },
        },
      };
    }

    return apiClient;
  };

  return { getAuthenticatedClient };
};

// API endpoints
export const createInvoice = async (data: {
  customerId: string;
  items: Array<{ productId: string; quantity: number }>;
  discount?: string;
}) => {
  // Get a fresh token for this request
  const token = await SecureStore.getItemAsync("clerk_token");
  return apiClient.post("/invoices", data, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
};

// Update getInvoices implementation
export const getInvoices = async (): Promise<Invoice[]> => {
  const token = await SecureStore.getItemAsync("clerk_token");
  const response = await apiClient.get<{ data: Invoice[] }>("/invoices", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return response.data.data.map((invoice) => ({
    ...invoice,
    // Ensure nested objects are properly typed
    customer: {
      id: invoice.customer.id,
      name: invoice.customer.name,
      phone: invoice.customer.phone,
      email: invoice.customer.email || "",
    },
    items: invoice.items.map((item) => ({
      ...item,
      productName: item.productName || "Unknown Product",
    })),
  }));
};

// Test connection to API
export const testConnection = async () => {
  console.log("Testing connection to:", apiClient.defaults.baseURL);

  // Get a fresh token for this request
  const token = await SecureStore.getItemAsync("clerk_token");

  return apiClient
    .get("/health-check", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
    .then((response) => {
      console.log("Connection successful:", response);
      return response;
    })
    .catch((error) => {
      console.error("Connection test failed");
      return Promise.reject(error);
    });
};
