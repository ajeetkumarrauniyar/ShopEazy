// Typography system following Material Design
export const typography = {
  fonts: {
    regular: 'Roboto_400Regular',
    medium: 'Roboto_500Medium',
    bold: 'Roboto_700Bold',
    light: 'Roboto_300Light',
    
    // For headings
    headingRegular: 'Montserrat_400Regular',
    headingMedium: 'Montserrat_500Medium',
    headingBold: 'Montserrat_700Bold',
    headingLight: 'Montserrat_300Light',
  },
  
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 36,
    '7xl': 48,
    '8xl': 60,
    '9xl': 96,
  },
  
  lineHeights: {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
    '5xl': 48,
    '6xl': 56,
    '7xl': 64,
    '8xl': 80,
    '9xl': 128,
  },
  
  // Material Design text styles
  textStyles: {
    // Headlines
    headline1: {
      fontFamily: 'Montserrat_300Light',
      fontSize: 96,
      lineHeight: 128,
      letterSpacing: -1.5,
    },
    headline2: {
      fontFamily: 'Montserrat_300Light',
      fontSize: 60,
      lineHeight: 80,
      letterSpacing: -0.5,
    },
    headline3: {
      fontFamily: 'Montserrat_400Regular',
      fontSize: 48,
      lineHeight: 64,
      letterSpacing: 0,
    },
    headline4: {
      fontFamily: 'Montserrat_400Regular',
      fontSize: 34,
      lineHeight: 40,
      letterSpacing: 0.25,
    },
    headline5: {
      fontFamily: 'Montserrat_400Regular',
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
    },
    headline6: {
      fontFamily: 'Montserrat_500Medium',
      fontSize: 20,
      lineHeight: 28,
      letterSpacing: 0.15,
    },
    
    // Subtitles
    subtitle1: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontFamily: 'Roboto_500Medium',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
    },
    
    // Body text
    body1: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    body2: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    
    // Button text
    button: {
      fontFamily: 'Roboto_500Medium',
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 1.25,
      textTransform: 'uppercase' as const,
    },
    
    // Caption and overline
    caption: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
    },
    overline: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 10,
      lineHeight: 14,
      letterSpacing: 1.5,
      textTransform: 'uppercase' as const,
    },
    
    // Business-specific text styles
    price: {
      fontFamily: 'Roboto_700Bold',
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
    },
    currency: {
      fontFamily: 'Roboto_500Medium',
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
    },
    invoiceNumber: {
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
  },
};

export type Typography = typeof typography; 