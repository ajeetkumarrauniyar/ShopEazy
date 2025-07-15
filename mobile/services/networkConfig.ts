import { Platform } from "react-native";

/**
 * Helper file to configure the network for the app
 */

// Network configuration for different environments
const NETWORK_CONFIG = {
  // Replace this with your computer's actual IP address
  // Find it by running: ifconfig (macOS/Linux) or ipconfig (Windows)
  COMPUTER_IP: "192.168.31.90", // 👈 UPDATE THIS!

  // Server port
  SERVER_PORT: 5000,

  // Production URL
  //TODO: Replace with actual server URL
  PRODUCTION_URL: "https://your-production-server.com",
};

// Get the appropriate server URL based on platform and environment
export const getServerUrl = (): string => {
  if (!__DEV__) {
    return NETWORK_CONFIG.PRODUCTION_URL;
  }

  const { COMPUTER_IP, SERVER_PORT } = NETWORK_CONFIG;

  if (Platform.OS === "ios") {
    // iOS simulator can use localhost
    return `http://localhost:${SERVER_PORT}`;
  } else {
    // Android - for physical devices, use computer's IP
    // For emulator, you can change this back to 10.0.2.2 if needed
    return `http://${COMPUTER_IP}:${SERVER_PORT}`;
  }
};

export const API_BASE_URL = `${getServerUrl()}/api/v1`;

// Debug function to log current configuration
export const logNetworkConfig = () => {
  console.log("🌐 Network Configuration:");
  console.log(`📱 Platform: ${Platform.OS}`);
  console.log(`🏠 Server URL: ${getServerUrl()}`);
  console.log(`🔗 API Base URL: ${API_BASE_URL}`);
  console.log(`💻 Computer IP: ${NETWORK_CONFIG.COMPUTER_IP}`);
  console.log(`🚪 Server Port: ${NETWORK_CONFIG.SERVER_PORT}`);
};
