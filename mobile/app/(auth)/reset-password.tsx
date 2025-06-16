import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import i18n from "@/config/i18n";
import { COLORS } from "@/constants/index";
import { useAuthError } from "@/utils/errorHandler";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ResetStep = 'contact' | 'verification' | 'newPassword';
type ResetMode = 'email' | 'phone';

export default function ResetPasswordScreen() {
  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const { error, setCustomError, setClerkError, clearError, hasError } = useAuthError();

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resetMode, setResetMode] = useState<ResetMode>('email');
  
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState<ResetStep>('contact');
  const [isLoading, setIsLoading] = useState(false);

  // Handle phone number formatting (from signup)
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

  // Switch between email and phone modes
  const switchResetMode = () => {
    setResetMode(resetMode === 'email' ? 'phone' : 'email');
    setEmail("");
    setPhoneNumber("");
    setCode("");
    clearError();
    console.log("🔄 Switched to", resetMode === 'email' ? "PHONE" : "EMAIL", "reset mode");
  };

  // Step 1: Send reset code (Email)
  const handleSendEmailResetCode = async () => {
    if (!email.trim()) {
      setCustomError("Please enter your email address");
      return;
    }

    clearError();
    setIsLoading(true);

    try {
      await signIn?.create({
        strategy: "reset_password_email_code",
        identifier: email.trim(),
      });
      
      console.log("✅ Email reset code sent to:", email);
      setCurrentStep('verification');
    } catch (err) {
      console.error("❌ Failed to send email reset code:", err);
      setClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: Send reset code (Phone) - Using signup patterns
  const handleSendPhoneResetCode = async () => {
    if (!phoneNumber.trim()) {
      setCustomError("Please enter your phone number");
      return;
    }

    clearError();
    setIsLoading(true);

    try {
      // Use signUp create and prepare pattern for phone verification
      await signUp?.create({
        phoneNumber: phoneNumber.trim(),
      });
      console.log("✅ Phone reset: SignUp created for verification");

      await signUp?.preparePhoneNumberVerification({
        strategy: "phone_code",
      });
      console.log("✅ Phone reset: Verification prepared, OTP sent to:", phoneNumber);
      
      setCurrentStep('verification');
    } catch (err) {
      console.error("❌ Failed to send phone reset code:", err);
      setClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify reset code (Email)
  const handleVerifyEmailCode = async () => {
    if (!code.trim()) {
      setCustomError("Please enter the verification code");
      return;
    }

    clearError();
    setIsLoading(true);

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code.trim(),
      });

      console.log("📋 Email code verification - Status:", result?.status);
      
      if (result?.status === "needs_new_password") {
        console.log("✅ Email code verified, proceed to new password");
        setCurrentStep('newPassword');
      } else {
        console.log("⚠️ Unexpected email verification status:", result?.status);
        setCustomError("Verification incomplete. Please try again.");
      }
    } catch (err) {
      console.error("❌ Failed to verify email code:", err);
      setClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify reset code (Phone) - Using signup patterns
  const handleVerifyPhoneCode = async () => {
    if (!code.trim()) {
      setCustomError("Please enter the verification code");
      return;
    }

    clearError();
    setIsLoading(true);

    try {
      const result = await signUp?.attemptPhoneNumberVerification({
        code: code.trim(),
      });

      console.log("📋 Phone code verification - Status:", result?.status);
      
      if (result?.status === "complete" || result?.status === "missing_requirements") {
        console.log("✅ Phone code verified, proceed to new password");
        setCurrentStep('newPassword');
      } else {
        console.log("⚠️ Unexpected phone verification status:", result?.status);
        setCustomError("Verification incomplete. Please try again.");
      }
    } catch (err) {
      console.error("❌ Failed to verify phone code:", err);
      setClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Set new password
  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      setCustomError("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setCustomError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setCustomError("Password must be at least 8 characters long");
      return;
    }

    clearError();
    setIsLoading(true);

    try {
      if (resetMode === 'email') {
        // Email reset using signIn
        const result = await signIn?.resetPassword({
          password: newPassword,
        });

        console.log("📋 Email password reset - Status:", result?.status);

        if (result?.status === "complete") {
          await setActive?.({ session: result.createdSessionId });
          console.log("✅ Email password reset complete, redirecting");
          router.replace("/(protected)");
        } else {
          console.log("⚠️ Email password reset incomplete, status:", result?.status);
          setCustomError("Password reset incomplete. Please try again.");
        }
      } else {
        // Phone reset using signUp patterns
        const result = await signUp?.update({
          password: newPassword,
        });

        console.log("📋 Phone password reset - Status:", result?.status);

        if (result?.status === "complete") {
          await setActive?.({ session: result.createdSessionId });
          console.log("✅ Phone password reset complete, redirecting");
          router.replace("/(protected)");
        } else {
          console.log("⚠️ Phone password reset incomplete, status:", result?.status);
          setCustomError("Password reset incomplete. Please try again.");
        }
      }
    } catch (err) {
      console.error("❌ Failed to reset password:", err);
      setClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const handleResendCode = async () => {
    clearError();
    setIsLoading(true);

    try {
      if (resetMode === 'email') {
        await signIn?.create({
          strategy: "reset_password_email_code",
          identifier: email.trim(),
        });
        console.log("✅ Email reset code resent to:", email);
      } else {
        await signUp?.preparePhoneNumberVerification({
          strategy: "phone_code",
        });
        console.log("✅ Phone reset code resent to:", phoneNumber);
      }
    } catch (err) {
      console.error("❌ Failed to resend code:", err);
      setClerkError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to contact step
  const handleBackToContact = () => {
    setCurrentStep('contact');
    setCode("");
    clearError();
  };

  const renderContactStep = () => (
    <>
      <ThemedText type="title" style={styles.title}>
        Reset Password
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        {resetMode === 'email' 
          ? "Enter your email address and we'll send you a verification code to reset your password."
          : "Enter your phone number and we'll send you a verification code to reset your password."
        }
      </ThemedText>

      {resetMode === 'email' ? (
        <TextInput
          variant="filled"
          size="lg"
          label="Email Address"
          value={email}
          placeholder="Enter your email address"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          containerStyle={styles.input}
        />
      ) : (
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
      )}

      <Button
        size="lg"
        onPress={resetMode === 'email' ? handleSendEmailResetCode : handleSendPhoneResetCode}
        loading={isLoading}
        style={styles.button}
        disabled={(resetMode === 'email' ? !email.trim() : !phoneNumber.trim()) || isLoading}
      >
        Send Reset Code
      </Button>

      {/* Alternative reset method */}
      <View style={styles.alternativeContainer}>
        <ThemedText style={styles.orText}>{i18n.t("auth.or")}</ThemedText>
        <Button
          variant="outline"
          size="lg"
          onPress={switchResetMode}
          style={styles.button}
        >
          {resetMode === 'email' ? "Reset with Phone Number" : "Reset with Email"}
        </Button>
      </View>
    </>
  );

  const renderVerificationStep = () => (
    <>
      <ThemedText type="title" style={styles.title}>
        Enter Verification Code
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        We&apos;ve sent a verification code to {resetMode === 'email' ? email : phoneNumber}
      </ThemedText>

      <TextInput
        variant="filled"
        size="lg"
        label="Verification Code"
        value={code}
        placeholder="Enter 6-digit code"
        keyboardType="number-pad"
        onChangeText={setCode}
        containerStyle={styles.input}
        maxLength={6}
      />

      <Button
        size="lg"
        onPress={resetMode === 'email' ? handleVerifyEmailCode : handleVerifyPhoneCode}
        loading={isLoading}
        style={styles.button}
        disabled={!code.trim() || isLoading}
      >
        Verify Code
      </Button>

      <View style={styles.resendContainer}>
        <Text style={styles.linkText}>Didn&apos;t receive the code?</Text>
        <TouchableOpacity style={styles.link} onPress={handleResendCode} disabled={isLoading}>
          <Text style={styles.linkTextBold}>Resend Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToContact}>
        <Text style={styles.backButtonText}>← Back to {resetMode === 'email' ? 'Email' : 'Phone'}</Text>
      </TouchableOpacity>
    </>
  );

  const renderNewPasswordStep = () => (
    <>
      <ThemedText type="title" style={styles.title}>
        Set New Password
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Choose a strong password for your account
      </ThemedText>

      <TextInput
        variant="filled"
        size="lg"
        label="New Password"
        value={newPassword}
        placeholder="Enter new password"
        onChangeText={setNewPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      <TextInput
        variant="filled"
        size="lg"
        label="Confirm Password"
        value={confirmPassword}
        placeholder="Confirm new password"
        onChangeText={setConfirmPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      <Button
        size="lg"
        onPress={handleResetPassword}
        loading={isLoading}
        style={styles.button}
        disabled={!newPassword.trim() || !confirmPassword.trim() || isLoading}
      >
        Reset Password
      </Button>
    </>
  );

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* App Logo */}
      <ThemedText type="title" style={styles.logo}>
        {i18n.t("welcome.title")}
      </ThemedText>

      <View style={styles.formContainer}>
        {currentStep === 'contact' && renderContactStep()}
        {currentStep === 'verification' && renderVerificationStep()}
        {currentStep === 'newPassword' && renderNewPasswordStep()}
      </View>

      {/* Error Display */}
      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>
      )}

      {/* Back to Sign In */}
      <View style={styles.signInContainer}>
        <ThemedText>Remember your password?</ThemedText>
        <Link href="/">
          <ThemedText style={styles.signInText}>Sign In</ThemedText>
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
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.light.tint,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 40,
    color: "#5A7086",
    lineHeight: 22,
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
  backButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    color: COLORS.light.tint,
    fontSize: 16,
    fontWeight: "500",
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
});
