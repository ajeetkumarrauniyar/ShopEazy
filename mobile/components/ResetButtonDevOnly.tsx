import { resetOnboarding } from "@/utils/onboarding";
import { Button } from "@react-navigation/elements";
import React from "react";
import { Alert, NativeModules } from 'react-native';

const ResetButtonDevOnly = () => {
  const handleReset = async () => {
    try {
      // Reset onboarding status
      await resetOnboarding();
      console.log("Onboarding reset!");
      
      // Show alert and reload
      Alert.alert(
        "Onboarding Reset",
        "Onboarding has been reset. The app will reload now.",
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
      console.error("Error resetting onboarding:", error);
      Alert.alert("Error", "Failed to reset onboarding. Please try again.");
    }
  };

  return (
    <Button
      onPress={handleReset}
      style={{ marginBottom: 40 }}
    >
      Reset Onboarding & Reload (Dev Only)
    </Button>
  );
};

export default ResetButtonDevOnly;
