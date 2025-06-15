import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';

// Define translations
const translations = {
  en: {
    welcome: {
      title: "RuralLedger",
      tagline: "Your Shop's Digital Bahi-Khata",
      startButton: "Start →"
    },
    language: {
      title: "Select Language",
      subtitle: "Choose your preferred language",
      hindi: "हिन्दी",
      english: "English",
      other: "+ Other",
      continue: "Continue"
    },
    auth: {
      // Login Screen
      tagline: "Easy Bill, Easy Account",
      mobileNumber: "Mobile Number",
      mobileNumberPlaceholder: "Enter your mobile number",
      email: "Email",
      emailPlaceholder: "Enter your email",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      sendOtp: "Send OTP",
      otpPlaceholder: "Enter OTP",
      loginWithOtp: "Login with OTP",
      loggingIn: "Logging in...",
      login: "Login",
      forgotPassword: "Forgot Password?",
      or: "or",
      loginWithEmail: "Login with Email",
      loginWithMobile: "Login with Mobile",
      noAccount: "Don't have an account? ",
      signUp: "Sign Up",
      needHelp: "Need Help?",
      
      // Sign Up Screen
      createAccount: "Create Your Account",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Enter password again",
      emailOtp: "Email OTP",
      emailOtpPlaceholder: "Enter OTP from email",
      register: "Register",
      signUpWithEmail: "Sign Up with Email",
      signUpWithMobile: "Sign Up with Mobile",
      alreadyHaveAccount: "Already have an account? ",
      signIn: "Sign In"
    }
  },
  hi: {
    welcome: {
      title: "RuralLedger",
      tagline: "आपकी दुकान का Digital Bahi-Khata",
      startButton: "शुरू करें →"
    },
    language: {
      title: "भाषा चुनें",
      subtitle: "अपनी पसंदीदा भाषा चुनें",
      hindi: "हिन्दी",
      english: "English", 
      other: "+ अन्य",
      continue: "जारी रखें"
    },
    auth: {
      // Login Screen
      tagline: "आसान बिल, आसान हिसाब",
      mobileNumber: "मोबाइल नंबर",
      mobileNumberPlaceholder: "अपना मोबाइल नंबर डालें",
      email: "ईमेल",
      emailPlaceholder: "अपना ईमेल डालें",
      password: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड डालें",
      sendOtp: "OTP भेजें",
      otpPlaceholder: "OTP डालें",
      loginWithOtp: "OTP से लॉगिन करें",
      loggingIn: "लॉगिन हो रहा है...",
      login: "लॉगिन करें",
      forgotPassword: "पासवर्ड भूल गए?",
      or: "या",
      loginWithEmail: "ईमेल से लॉगिन करें",
      loginWithMobile: "मोबाइल नंबर से लॉगिन करें",
      noAccount: "खाता नहीं है? ",
      signUp: "साइन अप करें",
      needHelp: "मदद चाहिए?",
      
      // Sign Up Screen
      createAccount: "अपना खाता बनाएं",
      fullName: "पूरा नाम",
      fullNamePlaceholder: "अपना पूरा नाम डालें",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      confirmPasswordPlaceholder: "पासवर्ड दोबारा डालें",
      emailOtp: "ईमेल OTP",
      emailOtpPlaceholder: "ईमेल से मिला OTP डालें",
      register: "रजिस्टर करें",
      signUpWithEmail: "ईमेल से रजिस्टर करें",
      signUpWithMobile: "मोबाइल नंबर से रजिस्टर करें",
      alreadyHaveAccount: "पहले से खाता है? ",
      signIn: "लॉगिन करें"
    }
  }
};

// Initialize i18n
const i18n = new I18n(translations);

// Set fallback language
i18n.defaultLocale = 'en';
i18n.locale = 'en';

// Language storage key
const LANGUAGE_KEY = '@user_language';

// Function to load saved language
export const loadSavedLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) {
      i18n.locale = savedLanguage;
      return savedLanguage;
    }
    return 'en';
  } catch (error) {
    console.error('Error loading saved language:', error);
    return 'en';
  }
};

// Function to save language preference
export const saveLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
    i18n.locale = language;
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

// Function to change language
export const changeLanguage = (language: string) => {
  i18n.locale = language;
  saveLanguage(language);
};

export default i18n; 