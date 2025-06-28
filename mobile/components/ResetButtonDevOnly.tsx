import { resetOnboarding } from "@/utils/onboarding";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "@react-navigation/elements";
import React from "react";
import { Alert, NativeModules } from 'react-native';
import { clearDatabase, clearDatabaseData } from "@/db/clearDatabase";

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

  const handleClearDatabase = async () => {
    Alert.alert(
      "Clear Database",
      "Choose how to clear the database:",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear Data Only",
          onPress: async () => {
            try {
              await clearDatabaseData();
              Alert.alert("Success", "Database data cleared successfully!");
            } catch (error) {
              console.error("Error clearing database data:", error);
              Alert.alert("Error", "Failed to clear database data.");
            }
          }
        },
        {
          text: "Full Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await clearDatabase();
              Alert.alert("Success", "Database completely reset!");
            } catch (error) {
              console.error("Error clearing database:", error);
              Alert.alert("Error", "Failed to clear database.");
            }
          }
        }
      ]
    );
  };

  return (
    <>
      <Button
        onPress={handleReset}
        style={{ marginBottom: 20 }}
      >
        Reset Onboarding & Sign Out (Dev Only)
      </Button>
      
      <Button
        onPress={handleClearDatabase}
        style={{ marginBottom: 20 }}
      >
        Clear Database (Dev Only)
      </Button>
    </>
  );
};

export default ResetButtonDevOnly;