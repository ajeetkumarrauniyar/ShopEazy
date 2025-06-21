import { resetOnboarding } from "@/utils/onboarding";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "@react-navigation/elements";
import React from "react";
import { Alert, NativeModules } from 'react-native';

const ResetButtonDevOnly = () => {
  const { signOut } = useAuth();

  const handleReset = async () => {
    try {
      // Reset onboarding status
      await resetOnboarding();
      console.log("Onboarding reset!");
      
      // Sign out user and clear token cache
      await signOut();
      console.log("User signed out and token cache cleared!");
      
      // Show alert and reload
      Alert.alert(
        "Reset Complete",
        "Onboarding has been reset and user signed out. The app will reload now.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reload the app
              if (__DEV__ && NativeModules.DevSettings) {
                NativeModules.DevSettings.reload();
              } else {
                // Fallback: show instruction to manually restart
                Alert.alert(
                  "Please Restart",
                  "Please close and reopen the app to see the changes."
                );
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("Error during reset:", error);
      Alert.alert("Error", "Failed to reset. Please try again.");
    }
  };

  return (
    <Button
      onPress={handleReset}
      style={{ marginBottom: 40 }}
    >
      Reset Onboarding & Sign Out (Dev Only)
    </Button>
  );
};

export default ResetButtonDevOnly;
