import { useAppStore, useSettingsStore } from "@/stores/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const syncStoresWithStorage = async () => {
  try {
    // Sync settings with AsyncStorage
    const settingsData = await AsyncStorage.getItem("user-settings");
    if (settingsData) {
      const settings = JSON.parse(settingsData);

      // Update settings store
      useSettingsStore.getState().updateAppSettings(settings.appSettings);

      // Sync with app store for global state
      if (settings.appSettings.darkMode !== undefined) {
        useAppStore.getState().setDarkMode(settings.appSettings.darkMode);
      }
    }

    // Sync language preferences
    const languageData = await AsyncStorage.getItem("@user_language");
    if (languageData) {
      useAppStore.getState().setLanguage(languageData);
    }
  } catch (error) {
    console.error("Failed to sync stores:", error);
  }
};
