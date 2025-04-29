import { useAuth } from "@clerk/clerk-expo";
import { router, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

/*
 * This controls the overall stack — splash ➔ auth ➔ tabs.
 * At first, it shows Splash (index.tsx)
 * Then depending on isAuthenticated, it shows either (auth) (login/signup) or (tabs) (the real app)
 */

export default function SplashScreen() {
  const { isLoaded, isSignedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // Make sure both Clerk auth is loaded AND navigation is ready
    if (!isLoaded || !rootNavigationState?.key) return;

    const navigateBasedOnAuth = () => {
      if (isSignedIn) {
        router.replace("/(tabs)"); // if signed in, go to tabs
      } else {
        router.replace("/(auth)/sign-in"); // if not signed in, go to login
      }
    };

    // Add a slight delay to ensure everything is fully mounted
    const timer = setTimeout(navigateBasedOnAuth, 100);
    return () => clearTimeout(timer);
  }, [isLoaded, isSignedIn, rootNavigationState?.key]);

  console.log("Index file loaded");
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading App...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
