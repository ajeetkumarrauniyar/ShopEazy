import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Stack } from "expo-router";

const tokenCache = {
  async getToken(key: string) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key: string, value: string) {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" /> {/* Splash */}
        <Stack.Screen name="(auth)" /> {/* Auth */}
        <Stack.Screen name="(tabs)" /> {/* Main app */}
      </Stack>
    </ClerkProvider>
  );
}
