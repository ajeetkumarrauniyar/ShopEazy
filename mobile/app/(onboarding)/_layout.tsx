import { loadSavedLanguage } from '@/config/i18n';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function OnboardingLayout() {
  useEffect(() => {
    // Load saved language when app starts
    loadSavedLanguage();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="language-selection" />
    </Stack>
  );
}
