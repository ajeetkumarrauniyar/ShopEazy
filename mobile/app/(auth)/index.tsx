import ResetButtonDevOnly from "@/components/ResetButtonDevOnly";
import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import i18n from "@/config/i18n";
import { lightColors } from "@/constants/index";
import { useAuthError } from "@/utils/errorHandler";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive } = useSignIn();
  const { error, setCustomError, setClerkError, clearError, hasError } =
    useAuthError();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handlePhoneNumberChange = (input: string) => {
    const cleaned = input.trim();

    if (!cleaned) {
      setPhoneNumber("");
      return;
    }

    if (cleaned.startsWith("+91")) {
      setPhoneNumber(cleaned);
      return;
    }

    setPhoneNumber(`+91${cleaned}`);
  };

  const handleSendOTP = async () => {
    if (!phoneNumber) {
      setCustomError("Please enter your phone number");
      return;
    }

    clearError();
    setIsAuthenticating(true);

    try {
      await signIn?.create({
        strategy: "phone_code",
        identifier: phoneNumber,
      });
      console.log("✅ Phone OTP: SignIn created, OTP sent to", phoneNumber);
      setOtpSent(true);
    } catch (err) {
      console.error("❌ Failed to send OTP:", err);
      setClerkError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setCustomError("Please enter the OTP code");
      return;
    }

    clearError();
    setIsAuthenticating(true);

    try {
      const completeSignIn = await signIn?.attemptFirstFactor({
        strategy: "phone_code",
        code: otp,
      });
      console.log("📋 Phone Verification - Status:", completeSignIn?.status);

      if (completeSignIn?.status === "complete") {
        await setActive?.({ session: completeSignIn.createdSessionId });
        console.log("✅ Phone signin complete, redirecting");
      } else {
        console.log(
          "⚠️ Phone signin incomplete, status:",
          completeSignIn?.status
        );
        setCustomError("Sign in incomplete. Please try again.");
      }
    } catch (err) {
      console.error("❌ Failed to verify OTP:", err);
      setClerkError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email || !userPassword) {
      setCustomError("Please enter both email and password");
      return;
    }

    if (!email.trim() || !userPassword.trim()) {
      setCustomError("Please enter both email and password");
      return;
    }

    console.log("🔄 Email signin: Attempting with email:", email);
    clearError();
    setIsAuthenticating(true);

    try {
      const result = await signIn?.create({
        identifier: email,
        password: userPassword,
      });
      console.log("📋 Email signin - Status:", result?.status);

      if (result?.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
        console.log("✅ Email signin complete, redirecting");
      } else {
        console.log("⚠️ Email signin incomplete, status:", result?.status);
        setCustomError("Sign in incomplete. Please try again.");
      }
    } catch (err) {
      console.error("❌ Failed to sign in:", err);
      setClerkError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* App Logo */}
      <ThemedText type="title" style={styles.logo}>
        {i18n.t("welcome.title")}
      </ThemedText>

      {/* Tagline */}
      <ThemedText type="subtitle" style={styles.tagline}>
        {i18n.t("auth.tagline")}
      </ThemedText>

      <View style={styles.formContainer}>
        {!isEmailMode ? (
          // Phone OTP Login
          <>
            {!otpSent ? (
              <>
                <TextInput
                  variant="filled"
                  size="lg"
                  label={`${i18n.t("auth.mobileNumber")}`}
                  value={phoneNumber}
                  placeholder={i18n.t("auth.mobileNumberPlaceholder")}
                  keyboardType="phone-pad"
                  onChangeText={handlePhoneNumberChange}
                  containerStyle={styles.input}
                />

                <Button
                  size="lg"
                  onPress={handleSendOTP}
                  loading={isAuthenticating}
                  style={styles.button}
                  disabled={!phoneNumber || isAuthenticating}
                >
                  {i18n.t("auth.sendOtp")}
                </Button>
              </>
            ) : (
              <>
                <TextInput
                  variant="filled"
                  size="lg"
                  label="OTP"
                  value={otp}
                  placeholder={i18n.t("auth.otpPlaceholder")}
                  keyboardType="number-pad"
                  onChangeText={setOtp}
                  containerStyle={styles.input}
                />

                <Button
                  size="lg"
                  onPress={handleVerifyOTP}
                  loading={isAuthenticating}
                  style={styles.button}
                  disabled={!otp || isAuthenticating}
                >
                  {i18n.t("auth.loginWithOtp")}
                </Button>
              </>
            )}
          </>
        ) : (
          // Email Password Login
          <>
            <TextInput
              variant="filled"
              size="lg"
              label={i18n.t("auth.email")}
              value={email}
              placeholder={i18n.t("auth.emailPlaceholder")}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              containerStyle={styles.input}
            />

            <TextInput
              variant="filled"
              size="lg"
              label={i18n.t("auth.password")}
              value={userPassword}
              placeholder={i18n.t("auth.passwordPlaceholder")}
              onChangeText={setUserPassword}
              secureTextEntry
              containerStyle={styles.input}
            />

            <Button
              size="lg"
              onPress={handleEmailSignIn}
              loading={isAuthenticating}
              style={styles.button}
              disabled={!email || !userPassword || isAuthenticating}
            >
              {isAuthenticating
                ? i18n.t("auth.loggingIn")
                : i18n.t("auth.login")}
            </Button>

            {/* Forgot Password Section */}

            <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
              <Link href="/reset-password" style={styles.forgotPassword}>
                <ThemedText style={styles.linkText}>
                  {i18n.t("auth.forgotPassword")}
                </ThemedText>
              </Link>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Alternative Login Methods */}
      <View style={styles.alternativeContainer}>
        <ThemedText style={styles.orText}>{i18n.t("auth.or")}</ThemedText>

        <Button
          variant="outline"
          size="lg"
          onPress={() => setIsEmailMode(!isEmailMode)}
          style={styles.button}
        >
          {isEmailMode
            ? i18n.t("auth.loginWithMobile")
            : i18n.t("auth.loginWithEmail")}
        </Button>
      </View>

      {hasError && (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error?.message}</ThemedText>
        </View>
      )}

      {/* Sign Up Section */}
      <View style={styles.signUpContainer}>
        <ThemedText>{i18n.t("auth.noAccount")}</ThemedText>
        <Link href="/sign-up">
          <ThemedText style={styles.signUpText}>
            {i18n.t("auth.signUp")}
          </ThemedText>
        </Link>
      </View>

      {/* Support Section */}
      <View style={styles.supportContainer}>
        <Button variant="ghost" onPress={() => {}} style={styles.supportButton}>
          {i18n.t("auth.needHelp")}
        </Button>
      </View>

      <ResetButtonDevOnly />
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#F5F7FA",
  },
  logo: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: lightColors.primary,
    marginBottom: 8,
  },
  tagline: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 40,
    color: "#5A7086",
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
    fontSize: 14,
  },
  forgotPassword: {
    marginTop: 15,
    alignSelf: "center",
    marginBottom: 24,
  },
  linkText: {
    color: lightColors.primary,
    fontWeight: "500",
  },
  alternativeContainer: {
    marginBottom: 30,
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    color: "#718096",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  signUpText: {
    color: lightColors.primary,
    fontWeight: "bold",
  },
  supportContainer: {
    marginTop: "auto",
    paddingTop: 20,
    marginBottom: 20,
  },
  supportButton: {
    borderWidth: 0,
  },
});
