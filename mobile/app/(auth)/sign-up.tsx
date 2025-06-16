import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import i18n from "@/config/i18n";
import { COLORS } from "@/constants/index";
import { useAuthError } from "@/utils/errorHandler";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();
  const { error, setCustomError, setClerkError, clearError, hasError } = useAuthError();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Common state for both modes
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

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

  const handleSendPhoneOTP = async () => {
    if (!phoneNumber || !fullName) {
      setCustomError("Please fill in all required fields");
      return;
    }

    clearError();
    setIsRegistering(true);

    try {
      await signUp?.create({
        phoneNumber: phoneNumber,
      });
      console.log("✅ Phone OTP: SignUp created");

      await signUp?.preparePhoneNumberVerification({
        strategy: "phone_code",
      });
      console.log("✅ Phone OTP: Verification prepared, OTP sent");

      setOtpSent(true);
    } catch (err) {
      console.error("❌ Phone OTP Error:", err);
      setClerkError(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handlePhoneVerification = async () => {
    if (!otp) {
      setCustomError("Please enter the verification code");
      return;
    }

    clearError();
    setIsRegistering(true);

    try {
      const completeSignUp = await signUp?.attemptPhoneNumberVerification({
        code: otp,
      });

      console.log("📋 Phone Verification - Status:", completeSignUp?.status);

      if (completeSignUp?.status === "complete") {
        await setActive?.({ session: completeSignUp?.createdSessionId });
        console.log("✅ Phone signup complete, redirecting");
        router.replace("/(protected)");
      } else if (
        completeSignUp?.status === "missing_requirements" &&
        completeSignUp?.missingFields?.includes("password")
      ) {
        console.log("🔧 Phone signup missing password, auto-generating...");

        const autoPassword = `Phone${Date.now()}!${Math.random()
          .toString(36)
          .slice(2)}`;

        try {
          const updatedSignUp = await signUp?.update({
            password: autoPassword,
          });

          if (updatedSignUp?.status === "complete") {
            await setActive?.({ session: updatedSignUp?.createdSessionId });
            console.log("✅ Phone signup complete after password update");
            router.replace("/(protected)");
          } else {
            console.log("⚠️ Phone signup still incomplete:", updatedSignUp?.status);
            setCustomError("Registration incomplete. Please try again.");
          }
        } catch (updateErr) {
          console.error("❌ Phone signup password update failed:", updateErr);
          setClerkError(updateErr);
        }
      } else {
        console.log("⚠️ Phone signup incomplete, status:", completeSignUp?.status);
        setCustomError("Registration incomplete. Please try again.");
      }
    } catch (err) {
      console.error("❌ Phone verification failed:", err);
      setClerkError(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleEmailSignUp = async () => {
    if (!email || !password || !fullName) {
      setCustomError("Please fill in all required fields");
      return;
    }
    
    if (password !== confirmPassword) {
      setCustomError("Passwords do not match");
      return;
    }

    clearError();
    setIsRegistering(true);

    try {
      await signUp?.create({
        emailAddress: email,
        password,
      });
      console.log("✅ Email signup: Account created");

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      console.log("✅ Email signup: Verification prepared, OTP sent");

      setOtpSent(true);
    } catch (err) {
      console.error("❌ Email signup error:", err);
      setClerkError(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleEmailVerification = async () => {
    if (!otp) {
      setCustomError("Please enter the verification code");
      return;
    }

    clearError();
    setIsRegistering(true);

    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: otp,
      });

      console.log("📋 Email verification - Status:", completeSignUp?.status);

      if (completeSignUp?.status === "complete") {
        await setActive?.({ session: completeSignUp?.createdSessionId });
        console.log("✅ Email signup complete, redirecting");
        router.replace("/(protected)");
      } else {
        console.log("⚠️ Email signup incomplete, status:", completeSignUp?.status);
        setCustomError("Registration incomplete. Please try again.");
      }
    } catch (err) {
      console.error("❌ Email verification failed:", err);
      setClerkError(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleResendCode = async () => {
    if (!isEmailMode) return;

    clearError();
    setIsRegistering(true);

    try {
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      console.log("✅ Email OTP resent");
    } catch (err) {
      console.error("❌ Email OTP resend error:", err);
      setClerkError(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const switchMode = () => {
    setIsEmailMode(!isEmailMode);
    setOtpSent(false);
    setOtp("");
    console.log("🔄 Switched to", !isEmailMode ? "EMAIL" : "PHONE", "mode");
  };

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      {/* App Logo */}
      <ThemedText type="title" style={styles.logo}>
        {i18n.t("welcome.title")}
      </ThemedText>

      {/* Tagline */}
      <ThemedText type="subtitle" style={styles.tagline}>
        {i18n.t("auth.createAccount")}
      </ThemedText>

      <View style={styles.formContainer}>
        {!isEmailMode ? (
          // Phone OTP Registration (NO PASSWORD FIELDS)
          <>
            {!otpSent ? (
              <>
                {/* Full Name - Only show during initial signup */}
                <TextInput
                  variant="filled"
                  size="lg"
                  label={i18n.t("auth.fullName")}
                  value={fullName}
                  placeholder={i18n.t("auth.fullNamePlaceholder")}
                  onChangeText={setFullName}
                  containerStyle={styles.input}
                />
                <TextInput
                  variant="filled"
                  size="lg"
                  label={i18n.t("auth.mobileNumber")}
                  value={phoneNumber}
                  placeholder={i18n.t("auth.mobileNumberPlaceholder")}
                  keyboardType="phone-pad"
                  onChangeText={handlePhoneNumberChange}
                  containerStyle={styles.input}
                />
                <Button
                  size="lg"
                  onPress={handleSendPhoneOTP}
                  loading={isRegistering}
                  style={styles.button}
                  disabled={!phoneNumber || !fullName || isRegistering}
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
                  onPress={handlePhoneVerification}
                  loading={isRegistering}
                  style={styles.button}
                  disabled={!otp || isRegistering}
                >
                  {i18n.t("auth.register")}
                </Button>
              </>
            )}
          </>
        ) : (
          // Email Password Registration
          <>
            {!otpSent ? (
              <>
                {/* Full Name - Only show during initial signup */}
                <TextInput
                  variant="filled"
                  size="lg"
                  label={i18n.t("auth.fullName")}
                  value={fullName}
                  placeholder={i18n.t("auth.fullNamePlaceholder")}
                  onChangeText={setFullName}
                  containerStyle={styles.input}
                />
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
                  value={password}
                  placeholder={i18n.t("auth.passwordPlaceholder")}
                  onChangeText={setPassword}
                  secureTextEntry
                  containerStyle={styles.input}
                />

                <TextInput
                  variant="filled"
                  size="lg"
                  label={i18n.t("auth.confirmPassword")}
                  value={confirmPassword}
                  placeholder={i18n.t("auth.confirmPasswordPlaceholder")}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  containerStyle={styles.input}
                />

                <Button
                  size="lg"
                  onPress={handleEmailSignUp}
                  loading={isRegistering}
                  style={styles.button}
                  disabled={
                    !email ||
                    !password ||
                    !confirmPassword ||
                    !fullName ||
                    password !== confirmPassword ||
                    isRegistering
                  }
                >
                  {i18n.t("auth.sendOtp")}
                </Button>
              </>
            ) : (
              <>
                <Text style={styles.title}>{i18n.t("auth.verifyEmail")}</Text>
                <Text style={styles.subtitle}>
                  {i18n.t("auth.verificationCodeSent")} {email}
                </Text>

                <TextInput
                  variant="filled"
                  size="lg"
                  label={i18n.t("auth.emailOtp")}
                  value={otp}
                  placeholder={i18n.t("auth.emailOtpPlaceholder")}
                  keyboardType="number-pad"
                  onChangeText={setOtp}
                  containerStyle={styles.input}
                />
                <Button
                  size="lg"
                  onPress={handleEmailVerification}
                  loading={isRegistering}
                  style={styles.button}
                  disabled={!otp || isRegistering}
                >
                  {i18n.t("auth.register")}
                </Button>

                <View style={styles.resendContainer}>
                  <Text style={styles.linkText}>{i18n.t("auth.didntReceiveCode")}</Text>
                  <TouchableOpacity style={styles.link} onPress={handleResendCode}>
                    <Text style={styles.linkTextBold}>{i18n.t("auth.resendCode")}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}
      </View>

      {/* Alternative Registration Methods */}
      <View style={styles.alternativeContainer}>
        <ThemedText style={styles.orText}>{i18n.t("auth.or")}</ThemedText>

        <Button
          variant="outline"
          size="lg"
          onPress={switchMode}
          style={styles.button}
        >
          {isEmailMode ? i18n.t("auth.signUpWithMobile") : i18n.t("auth.signUpWithEmail")}
        </Button>
      </View>

      {/* Error Display */}
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>
      )}

      {/* Sign In Section */}
      <View style={styles.signInContainer}>
        <ThemedText>{i18n.t("auth.alreadyHaveAccount")}</ThemedText>
        <Link href="/">
          <ThemedText style={styles.signInText}>{i18n.t("auth.signIn")}</ThemedText>
        </Link>
      </View>

      {/* Support Section */}
      <View style={styles.supportContainer}>
        <Button variant="ghost" onPress={() => {}} style={styles.supportButton}>
          {i18n.t("auth.needHelp")}
        </Button>
      </View>
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
    color: COLORS.light.tint,
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
  alternativeContainer: {
    marginBottom: 30,
  },
  orText: {
    textAlign: "center",
    marginVertical: 15,
    color: "#718096",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  signInText: {
    color: COLORS.light.tint,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: COLORS.light.tint,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#5A7086",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#718096",
    fontSize: 14,
  },
  link: {
    marginLeft: 4,
  },
  linkTextBold: {
    color: COLORS.light.tint,
    fontSize: 14,
    fontWeight: "bold",
  },
});
