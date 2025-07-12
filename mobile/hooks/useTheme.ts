import { darkTheme, lightTheme, Theme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
} 