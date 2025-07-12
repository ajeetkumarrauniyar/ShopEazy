import { TokenCache } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`🔐 Success: Retrieved token for key "${key}" ✅\n`);
        } else {
          console.log(`📭 Warning: No token found for key "${key}" ⚠️`);
        }
        return item ?? "";
      } catch (error) {
        console.error(`🚨 Error retrieving token for key "${key}":`, error);
        // Return empty string on error to prevent app crashes
        return "";
      }
    },

    saveToken: async (key: string, token: string) => {
      try {
        console.log(`💾 Info: Saving token under key "${key}"...`);
        await SecureStore.setItemAsync(key, token);
        console.log(`✅ Success: Token saved for key "${key}"`);
      } catch (error) {
        console.error(`🚨 Error saving token for key "${key}":`, error);
      }
    },
  };
};

export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
