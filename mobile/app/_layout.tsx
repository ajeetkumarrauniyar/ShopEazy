import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import "react-native-reanimated";

import { tokenCache } from "@/cache";
import { loadSavedLanguage } from "@/config/i18n";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "@/hooks/useFonts";
import { checkOnboardingStatus } from "@/utils/onboarding";
import ResetButtonDevOnly from "@/components/ResetButtonDevOnly";

const CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY! || "";

if (!CLERK_PUBLISHABLE_KEY) {
  console.error(
    "❌ Missing Clerk Publishable Key! \n🔐 Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your environment variables."
  );
  throw new Error("Missing Clerk Publishable Key.");
}

// Prevent the splash screen from auto-hiding before we're ready
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  
  // Use the new font loading system
  const fontsLoaded = useFonts();

  // Check onboarding status when app loads
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await loadSavedLanguage();
        const completed = await checkOnboardingStatus();
        setIsOnboardingCompleted(completed);
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setAppIsReady(true);
      }
    };

    if (fontsLoaded) {
      initializeApp();
    }
  }, [fontsLoaded]);

  // Re-check onboarding status when segments change
  useEffect(() => {
    const recheckOnboarding = async () => {
      const completed = await checkOnboardingStatus();
      setIsOnboardingCompleted(completed);
    };

    // Only recheck when moving between route groups
    if (segments.length > 0) {
      recheckOnboarding();
    }
  }, [segments[0]]); // Only trigger when the route group changes

  useEffect(() => {
    if (isOnboardingCompleted === null) return;

    const inOnboarding = segments[0] === "(onboarding)";

    if (!isOnboardingCompleted && !inOnboarding) {
      // User hasn't completed onboarding, redirect to welcome
      router.replace("/(onboarding)/welcome");
    } else if (isOnboardingCompleted && inOnboarding) {
      // User has completed onboarding but is still in onboarding flow
      router.replace("/(auth)");
    }
  }, [isOnboardingCompleted, segments]);

  // Hide splash screen when app is ready
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (appIsReady && fontsLoaded && isOnboardingCompleted !== null) {
        await SplashScreen.hideAsync();
      }
    };

    hideSplashScreen();
  }, [appIsReady, fontsLoaded, isOnboardingCompleted]);

  if (!appIsReady || !fontsLoaded || isOnboardingCompleted === null) {
    // Keep splash screen visible while loading
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
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 25}
          >
            <Slot />
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
