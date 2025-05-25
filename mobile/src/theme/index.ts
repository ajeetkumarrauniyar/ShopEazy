import { lightColors, darkColors, Colors } from './colors';
import { typography, Typography } from './typography';
import { spacing, borderRadius, shadows, Spacing, BorderRadius, Shadows } from './spacing';

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  isDark: boolean;
}

export const lightTheme: Theme = {
  colors: lightColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  isDark: false,
};

export const darkTheme: Theme = {
  colors: darkColors,
  typography,
  spacing,
  borderRadius,
  shadows,
  isDark: true,
};

export * from './colors';
export * from './typography';
export * from './spacing'; 