import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

import { useColorScheme } from "@/hooks/useColorScheme";
import { tokenCache } from "@/cache";

const CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY! || "";

if (!CLERK_PUBLISHABLE_KEY) {
  console.error(
    "❌ Missing Clerk Publishable Key! \n🔐 Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment variables."
  );
  throw new Error("Missing Clerk Publishable Key.");
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Slot />
          <StatusBar style="auto" />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
