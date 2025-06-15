import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import i18n, { changeLanguage } from "@/config/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ONBOARDING_COMPLETED_KEY = "@onboarding_completed";

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

const languages: Language[] = [
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "en", name: "English", nativeName: "English" },
];

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("hi");
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    changeLanguage(languageCode);
  };

  const handleContinue = async () => {
    if (!selectedLanguage) {
      Alert.alert("Error", "Please select a language");
      return;
    }

    setIsLoading(true);
    try {
      // Save onboarding completion
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");

      // Navigate to auth screen
      router.replace("/(auth)");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtherLanguages = () => {
    Alert.alert(
      "Coming Soon",
      "More languages will be available in future updates!",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.languageIcon}>
          <ThemedText style={styles.iconText}>🌐</ThemedText>
        </View>

        <ThemedText type="title" style={styles.title}>
          {i18n.t("language.title")}
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          {i18n.t("language.subtitle")}
        </ThemedText>
      </View>

      {/* Language Options */}
      <View style={styles.languageContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageOption,
              selectedLanguage === language.code &&
                styles.selectedLanguageOption,
            ]}
            onPress={() => handleLanguageSelect(language.code)}
            activeOpacity={0.7}
          >
            <View style={styles.languageContent}>
              <ThemedText
                style={[
                  styles.languageName,
                  selectedLanguage === language.code &&
                    styles.selectedLanguageName,
                ]}
              >
                {language.nativeName}
              </ThemedText>
              <ThemedText
                style={[
                  styles.languageSubName,
                  selectedLanguage === language.code &&
                    styles.selectedLanguageSubName,
                ]}
              >
                {language.name}
              </ThemedText>
            </View>

            <View
              style={[
                styles.radioButton,
                selectedLanguage === language.code &&
                  styles.selectedRadioButton,
              ]}
            >
              {selectedLanguage === language.code && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Other Languages Option */}
        <TouchableOpacity
          style={styles.otherLanguageOption}
          onPress={handleOtherLanguages}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.otherLanguageText}>
            {i18n.t("language.other")}
          </ThemedText>
          <ThemedText style={styles.comingSoonText}>Coming Soon</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Button
          size="lg"
          onPress={handleContinue}
          loading={isLoading}
          style={styles.continueButton}
          disabled={!selectedLanguage}
        >
          {i18n.t("language.continue")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  languageIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconText: {
    fontSize: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  languageContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
  languageOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 12,
    backgroundColor: "#fafafa",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e5e5e5",
  },
  selectedLanguageOption: {
    backgroundColor: "#f0f9ff",
    borderColor: "#007AFF",
  },
  languageContent: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  selectedLanguageName: {
    color: "#007AFF",
  },
  languageSubName: {
    fontSize: 14,
    color: "#666666",
  },
  selectedLanguageSubName: {
    color: "#0056CC",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRadioButton: {
    borderColor: "#007AFF",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  otherLanguageOption: {
    padding: 20,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    borderStyle: "dashed",
    alignItems: "center",
  },
  otherLanguageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666666",
    marginBottom: 4,
  },
  comingSoonText: {
    fontSize: 12,
    color: "#999999",
  },
  buttonContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: "#007AFF",
  },
});
