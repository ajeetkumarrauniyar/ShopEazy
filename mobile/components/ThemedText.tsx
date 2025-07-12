import { useTheme } from '@/hooks/useTheme';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 
    | 'default' 
    | 'title' 
    | 'defaultSemiBold' 
    | 'subtitle' 
    | 'link'
    | 'headline1'
    | 'headline2'
    | 'headline3'
    | 'headline4'
    | 'headline5'
    | 'headline6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'overline'
    | 'price'
    | 'currency'
    | 'invoiceNumber';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text.primary');

  // Get typography styles from theme
  const getTypeStyle = () => {
    switch (type) {
      case 'headline1':
      case 'headline2':
      case 'headline3':
      case 'headline4':
      case 'headline5':
      case 'headline6':
      case 'subtitle1':
      case 'subtitle2':
      case 'body1':
      case 'body2':
      case 'button':
      case 'caption':
      case 'overline':
      case 'price':
      case 'currency':
      case 'invoiceNumber':
        return theme.typography.textStyles[type];
      case 'title':
        return theme.typography.textStyles.headline4;
      case 'subtitle':
        return theme.typography.textStyles.subtitle1;
      case 'defaultSemiBold':
        return {
          ...theme.typography.textStyles.body1,
          fontFamily: theme.typography.fonts.medium,
        };
      case 'link':
        return {
          ...theme.typography.textStyles.body1,
          color: theme.colors.primary,
        };
      default:
        return theme.typography.textStyles.body1;
    }
  };

  const typeStyle = getTypeStyle();

  return (
    <Text
      style={[
        { color },
        typeStyle,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
