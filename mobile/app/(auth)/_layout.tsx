import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    console.log("✅ User is signed in. Redirecting to protected route...");
    return <Redirect href={"/(protected)"} />;
  }
  
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {
              headerTitleAlign: "center",
              headerLargeTitle: true,
              headerTitleStyle: {
                fontSize: 20,
                fontWeight: "600",
              },
              headerStyle: {
                backgroundColor: "#F5F7FA",
              },
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                backgroundColor: "transparent",
              },
              headerBackTitleVisible: false,
              headerTintColor: "#2A4D8F",
              contentStyle: {
                backgroundColor: "#F5F7FA",
              },
            }
          : {}),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "signIn",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerTitle: "signUp",
          headerBackTitle: "back",
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          headerTitle: "resetPassword",
          headerBackTitle: "back",
        }}
      />
    </Stack>
  );
}