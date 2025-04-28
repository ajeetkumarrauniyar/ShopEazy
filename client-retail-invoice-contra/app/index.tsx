import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

/*
 * This controls the overall stack — splash ➔ auth ➔ tabs.
 * At first, it shows Splash (index.tsx)
 * Then depending on isAuthenticated, it shows either (auth) (login/signup) or (tabs) (the real app)
 */

export default function SplashScreen() {
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) return; // still loading Clerk session

    if (isSignedIn) {
      router.replace("/(tabs)"); // if signed in, go to tabs
    } else {
      router.replace("/(auth)/sign-in"); // if not signed in, go to login
    }
  }, [isLoaded, isSignedIn]);

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
