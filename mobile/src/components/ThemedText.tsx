import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

type TextVariant = 
  | 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'headline6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'button' | 'caption' | 'overline'
  | 'price' | 'currency' | 'invoiceNumber';

type TextColor = 
  | 'primary' | 'secondary' | 'onPrimary' | 'onSecondary' | 'onBackground' | 'onSurface'
  | 'error' | 'onError' | 'success' | 'warning' | 'info'
  | 'textPrimary' | 'textSecondary' | 'textDisabled' | 'textHint'
  | 'credit' | 'debit' | 'invoice' | 'inventory'
  | 'statusPending' | 'statusSynced' | 'statusFailed' | 'statusOffline';

interface ThemedTextProps extends Omit<TextProps, 'style'> {
  variant?: TextVariant;
  color?: TextColor;
  style?: TextStyle;
  children: React.ReactNode;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'body1',
  color = 'textPrimary',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextColor = (colorKey: TextColor): string => {
    switch (colorKey) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'onPrimary': return theme.colors.onPrimary;
      case 'onSecondary': return theme.colors.onSecondary;
      case 'onBackground': return theme.colors.onBackground;
      case 'onSurface': return theme.colors.onSurface;
      case 'error': return theme.colors.error;
      case 'onError': return theme.colors.onError;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      case 'textPrimary': return theme.colors.text.primary;
      case 'textSecondary': return theme.colors.text.secondary;
      case 'textDisabled': return theme.colors.text.disabled;
      case 'textHint': return theme.colors.text.hint;
      case 'credit': return theme.colors.business.credit;
      case 'debit': return theme.colors.business.debit;
      case 'invoice': return theme.colors.business.invoice;
      case 'inventory': return theme.colors.business.inventory;
      case 'statusPending': return theme.colors.status.pending;
      case 'statusSynced': return theme.colors.status.synced;
      case 'statusFailed': return theme.colors.status.failed;
      case 'statusOffline': return theme.colors.status.offline;
      default: return theme.colors.text.primary;
    }
  };

  const textStyle: TextStyle = {
    ...theme.typography.textStyles[variant],
    color: getTextColor(color),
    ...style,
  };

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

// Convenience components for common use cases
export const Headline1: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="headline1" {...props} />
);

export const Headline2: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="headline2" {...props} />
);

export const Headline3: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="headline3" {...props} />
);

export const Headline4: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="headline4" {...props} />
);

export const Headline5: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="headline5" {...props} />
);

export const Headline6: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="headline6" {...props} />
);

export const Subtitle1: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="subtitle1" {...props} />
);

export const Subtitle2: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="subtitle2" {...props} />
);

export const Body1: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="body1" {...props} />
);

export const Body2: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="body2" {...props} />
);

export const ButtonText: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="button" {...props} />
);

export const Caption: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="caption" {...props} />
);

export const Overline: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="overline" {...props} />
);

// Business-specific text components
export const PriceText: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="price" {...props} />
);

export const CurrencyText: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="currency" {...props} />
);

export const InvoiceNumberText: React.FC<Omit<ThemedTextProps, 'variant'>> = (props) => (
  <ThemedText variant="invoiceNumber" {...props} />
); 