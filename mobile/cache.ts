import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo";

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
        return "";
      }
    },

    saveToken: (key: string, token: string) => {
      console.log(`💾 Info: Saving token under key "${key}"...`);
      return SecureStore.setItemAsync(key, token);
    },
  };
};

export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
