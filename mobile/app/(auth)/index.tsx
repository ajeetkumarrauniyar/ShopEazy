import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS } from "@/constants/index";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string>("");

  const handleSendOTP = async () => {
    if (!phoneNumber) return;
    setIsAuthenticating(true);
    try {
      await signIn?.create({
        strategy: "phone_code",
        identifier: phoneNumber,
      });
      setOtpSent(true);
    } catch (err) {
      console.error("Failed to send OTP:", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return;
    setIsAuthenticating(true);
    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: "phone_code",
        code: otp,
      });
      if (result?.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
      }
    } catch (err) {
      console.error("Failed to verify OTP:", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email || !userPassword) return;
    setIsAuthenticating(true);
    try {
      const result = await signIn?.create({
        identifier: email,
        password: userPassword,
      });
      if (result?.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
      }
    } catch (err) {
      console.error("Failed to sign in:", err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      {/* App Logo */}
      <ThemedText type="title" style={styles.logo}>
        RuralLedger
      </ThemedText>

      {/* Tagline */}
      <ThemedText type="subtitle" style={styles.tagline}>
        आसान बिल, आसान हिसाब
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
                  label="मोबाइल नंबर"
                  value={phoneNumber}
                  placeholder="अपना मोबाइल नंबर डालें"
                  keyboardType="phone-pad"
                  onChangeText={setPhoneNumber}
                  containerStyle={styles.input}
                />
                <Button
                  size="lg"
                  onPress={handleSendOTP}
                  loading={isAuthenticating}
                  style={styles.button}
                  disabled={!phoneNumber || isAuthenticating}
                >
                  OTP भेजें
                </Button>
              </>
            ) : (
              <>
                <TextInput
                  variant="filled"
                  size="lg"
                  label="OTP"
                  value={otp}
                  placeholder="OTP डालें"
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
                  OTP से लॉगिन करें
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
              label="ईमेल"
              value={email}
              placeholder="अपना ईमेल डालें"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={setEmail}
              containerStyle={styles.input}
            />

            <TextInput
              variant="filled"
              size="lg"
              label="पासवर्ड"
              value={userPassword}
              placeholder="अपना पासवर्ड डालें"
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
              लॉगिन करें
            </Button>

            <Link href="/reset-password" style={styles.forgotPassword}>
              <ThemedText style={styles.linkText}>पासवर्ड भूल गए?</ThemedText>
            </Link>
          </>
        )}
      </View>

      {/* Alternative Login Methods */}
      <View style={styles.alternativeContainer}>
        <ThemedText style={styles.orText}>या</ThemedText>

        <Button
          variant="outline"
          size="lg"
          onPress={() => setIsEmailMode(!isEmailMode)}
          style={styles.button}
        >
          {isEmailMode ? "मोबाइल नंबर से लॉगिन करें" : "ईमेल से लॉगिन करें"}
        </Button>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      ) : null}

      {/* Sign Up Section */}
      <View style={styles.signUpContainer}>
        <ThemedText>खाता नहीं है? </ThemedText>
        <Link href="/sign-up">
          <ThemedText style={styles.signUpText}>साइन अप करें</ThemedText>
        </Link>
      </View>

      {/* Support Section */}
      <View style={styles.supportContainer}>
        <Button variant="ghost" onPress={() => {}} style={styles.supportButton}>
          मदद चाहिए?
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
  forgotPassword: {
    marginTop: 15,
    alignSelf: "center",
  },
  linkText: {
    color: COLORS.light.tint,
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
