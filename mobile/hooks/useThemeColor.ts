/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from '@/hooks/useTheme';

type ColorPath = string;

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorPath?: ColorPath
) {
  const theme = useTheme();
  const colorFromProps = props[theme.isDark ? 'dark' : 'light'];

  if (colorFromProps) {
    return colorFromProps;
  }

  // If a color path is provided, try to get it from the theme
  if (colorPath) {
    // Handle nested color paths like 'text.primary' or 'status.pending'
    const pathArray = colorPath.split('.');
    let colorValue: any = theme.colors;
    
    for (const path of pathArray) {
      colorValue = colorValue?.[path];
    }
    
    if (colorValue) {
      return colorValue;
    }
  }

  // Fallback to primary text color
  return theme.colors.text.primary;
}

// Helper function to get specific colors from theme
export function useThemeColors() {
  const theme = useTheme();
  return theme.colors;
}

// Helper function to get typography styles
export function useTypography() {
  const theme = useTheme();
  return theme.typography;
}

// Helper function to get spacing values
export function useSpacing() {
  const theme = useTheme();
  return theme.spacing;
}
