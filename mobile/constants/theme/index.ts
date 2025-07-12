import { Colors, darkColors, lightColors } from './colors';
import { borderRadius, BorderRadius, shadows, Shadows, spacing, Spacing } from './spacing';
import { typography, Typography } from './typography';

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
export * from './spacing';
export * from './typography';

