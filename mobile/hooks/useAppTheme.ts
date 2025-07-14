import { useAppStore } from "@/stores";

export function useAppTheme() {
  const { isDarkMode, setDarkMode } = useAppStore();

  // Use app store preference, fallback to system preference
  const currentTheme = isDarkMode ? "dark" : "light";

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  return {
    theme: currentTheme,
    isDarkMode,
    toggleTheme,
    setDarkMode,
  };
}
