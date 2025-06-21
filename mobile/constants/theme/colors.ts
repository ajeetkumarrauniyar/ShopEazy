export const lightColors = {
  primary: '#4CAF50',
  secondary: '#FF9800',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  error: '#F44336',
  warning: '#FFC107',
  success: '#4CAF50',
  info: '#2196F3',
  
  // Text colors
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',
  onBackground: '#212121',
  onSurface: '#212121',
  onError: '#FFFFFF',
  
  // Additional colors for your business app
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
  },
  
  // Status colors for sync indicators
  status: {
    pending: '#FF9800',
    synced: '#4CAF50',
    failed: '#F44336',
    offline: '#9E9E9E',
  },
  
  // Business-specific colors
  business: {
    credit: '#F44336', // Red for udhaar/credit
    debit: '#4CAF50', // Green for payments
    invoice: '#2196F3', // Blue for invoices
    inventory: '#9C27B0', // Purple for inventory
  },
  
  // Neutral colors
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

export const darkColors = {
  primary: '#81C784',
  secondary: '#FFB74D',
  background: '#303030',
  surface: '#424242',
  error: '#EF5350',
  warning: '#FFD54F',
  success: '#81C784',
  info: '#64B5F6',
  
  // Text colors
  onPrimary: '#000000',
  onSecondary: '#000000',
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  onError: '#000000',
  
  // Additional colors for dark theme
  text: {
    primary: '#FFFFFF',
    secondary: '#BDBDBD',
    disabled: '#616161',
    hint: '#757575',
  },
  
  // Status colors for sync indicators (adjusted for dark theme)
  status: {
    pending: '#FFB74D',
    synced: '#81C784',
    failed: '#EF5350',
    offline: '#757575',
  },
  
  // Business-specific colors (adjusted for dark theme)
  business: {
    credit: '#EF5350',
    debit: '#81C784',
    invoice: '#64B5F6',
    inventory: '#BA68C8',
  },
  
  // Neutral colors for dark theme
  grey: {
    50: '#424242',
    100: '#383838',
    200: '#2E2E2E',
    300: '#242424',
    400: '#1A1A1A',
    500: '#121212',
    600: '#0E0E0E',
    700: '#0A0A0A',
    800: '#060606',
    900: '#000000',
  },
};

export type Colors = typeof lightColors; 