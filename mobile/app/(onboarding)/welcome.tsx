import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import i18n from "@/config/i18n";
import { useTheme } from "@/hooks/useTheme";
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
  const theme = useTheme();

  const handleStart = () => {
    router.push("/(onboarding)/language-selection" as any);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar 
          barStyle={theme.isDark ? "light-content" : "dark-content"} 
          backgroundColor={theme.colors.background} 
        />

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={[styles.logoCircle, { 
            backgroundColor: theme.colors.primary + '20',
            ...theme.shadows.lg,
          }]}>
            <ThemedText style={styles.logoText}>📱</ThemedText>
          </View>

          <ThemedText type="headline3" style={[styles.appTitle, { marginBottom: theme.spacing.md }]}>
            {i18n.t("welcome.title")}
          </ThemedText>

          <ThemedText type="subtitle1" style={[styles.tagline, { 
            color: theme.colors.text.secondary,
            marginHorizontal: theme.spacing['2xl'],
          }]}>
            {i18n.t("welcome.tagline")}
          </ThemedText>
        </View>

        {/* Illustration Space */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.illustrationBox, {
            backgroundColor: theme.colors.grey[50],
            borderColor: theme.colors.grey[200],
            borderRadius: theme.borderRadius['2xl'],
          }]}>
            <ThemedText style={styles.illustrationText}>🏪</ThemedText>
            <ThemedText type="body2" style={[styles.illustrationSubtext, { 
              color: theme.colors.text.secondary 
            }]}>
              Digital Ledger for Your Business
            </ThemedText>
          </View>
        </View>

        {/* Start Button */}
        <View style={[styles.buttonContainer, { paddingHorizontal: theme.spacing['2xl'] }]}>
          <Button 
            size="lg" 
            onPress={handleStart} 
            style={[styles.startButton, {
              ...theme.shadows.lg,
            }]}
          >
            {i18n.t("welcome.startButton")}
          </Button>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logoText: {
    fontSize: 48,
  },
  appTitle: {
    textAlign: "center",
  },
  tagline: {
    textAlign: "center",
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
  },
  illustrationText: {
    fontSize: 64,
    marginBottom: 12,
  },
  illustrationSubtext: {
    textAlign: "center",
  },
  buttonContainer: {
    paddingBottom: 40,
  },
  startButton: {},
});
