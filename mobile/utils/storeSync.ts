import { useSettingsStore } from "@/stores/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const syncStoresWithStorage = async () => {
  try {
    // Sync settings with AsyncStorage
    const settingsData = await AsyncStorage.getItem("user-settings");
    if (settingsData) {
      const settings = JSON.parse(settingsData);
      useSettingsStore.getState().updateAppSettings(settings.appSettings);
    }
  } catch (error) {
    console.error("Failed to sync stores:", error);
  }
}; 