import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type BackgroundColor = 
  | 'background' | 'surface' | 'primary' | 'secondary' 
  | 'error' | 'success' | 'warning' | 'info'
  | 'transparent';

interface ThemedViewProps extends Omit<ViewProps, 'style'> {
  backgroundColor?: BackgroundColor;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  backgroundColor = 'background',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = (bgColor: BackgroundColor): string | undefined => {
    switch (bgColor) {
      case 'background': return theme.colors.background;
      case 'surface': return theme.colors.surface;
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'error': return theme.colors.error;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      case 'transparent': return 'transparent';
      default: return theme.colors.background;
    }
  };

  const viewStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(backgroundColor),
    ...style,
  };

  return (
    <View style={viewStyle} {...props}>
      {children}
    </View>
  );
}; 