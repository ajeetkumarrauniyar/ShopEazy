import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading screen while auth is being checked
  if (!isLoaded) {
    return null;
  }

  // Redirect to login if not signed in
  if (!isSignedIn) {
    console.log("❌ User not signed in. Redirecting to login...");
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                backgroundColor: "transparent",
              },
            }
          : {}),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
