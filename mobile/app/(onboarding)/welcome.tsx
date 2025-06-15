import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import i18n from "@/config/i18n";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const handleStart = () => {
    router.push("/(onboarding)/language-selection" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <ThemedText style={styles.logoText}>📱</ThemedText>
        </View>

        <ThemedText type="title" style={styles.appTitle}>
          {i18n.t("welcome.title")}
        </ThemedText>

        <ThemedText type="subtitle" style={styles.tagline}>
          {i18n.t("welcome.tagline")}
        </ThemedText>
      </View>

      {/* Illustration Space */}
      <View style={styles.illustrationContainer}>
        <View style={styles.illustrationBox}>
          <ThemedText style={styles.illustrationText}>🏪</ThemedText>
          <ThemedText style={styles.illustrationSubtext}>
            Digital Ledger for Your Business
          </ThemedText>
        </View>
      </View>

      {/* Start Button */}
      <View style={styles.buttonContainer}>
        <Button size="lg" onPress={handleStart} style={styles.startButton}>
          {i18n.t("welcome.startButton")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 48,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  tagline: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
    marginHorizontal: 32,
    lineHeight: 24,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  illustrationBox: {
    width: width * 0.7,
    height: width * 0.5,
    backgroundColor: "#fafafa",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderStyle: "dashed",
  },
  illustrationText: {
    fontSize: 64,
    marginBottom: 12,
  },
  illustrationSubtext: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  startButton: {
    backgroundColor: "#007AFF",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
