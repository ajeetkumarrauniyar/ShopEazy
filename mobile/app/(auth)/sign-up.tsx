import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { COLORS } from "@/constants/index";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("+918084840429");
  const [email, setEmail] = useState("ajeetkumarrauniyar@gmail.com");
  const [password, setPassword] = useState("Aj#cool$00");
  const [confirmPassword, setConfirmPassword] = useState("Aj#cool$00");
  const [fullName, setFullName] = useState("Ajeet Kumar");
  const [isEmailMode, setIsEmailMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSendPhoneOTP = async () => {
    if (!phoneNumber || !fullName) {
      console.log("❌ Phone OTP: Missing required fields");
      return;
    }
    
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
    } finally {
      setIsRegistering(false);
    }
  };

  const handlePhoneVerification = async () => {
    if (!otp) return;
    
    setIsRegistering(true);
    
    try {
      const completeSignUp = await signUp?.attemptPhoneNumberVerification({
        code: otp,
      });

      console.log("📋 Phone Verification - Status:", completeSignUp?.status);
      console.log("📋 Phone Verification - Missing fields:", completeSignUp?.missingFields);

      if (completeSignUp?.status === "complete") {
        await setActive?.({ session: completeSignUp?.createdSessionId });
        console.log("✅ Phone signup complete, redirecting");
        router.replace("/(protected)");
      } else if (completeSignUp?.status === "missing_requirements" && 
                 completeSignUp?.missingFields?.includes("password")) {
        console.log("🔧 Phone signup missing password, auto-generating...");
        
        const autoPassword = `Phone${Date.now()}!${Math.random().toString(36).slice(2)}`;
        
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
          }
        } catch (updateErr) {
          console.error("❌ Phone signup password update failed:", updateErr);
        }
      } else {
        console.log("⚠️ Phone signup incomplete, status:", completeSignUp?.status);
      }
    } catch (err) {
      console.error("❌ Phone verification failed:", err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleEmailSignUp = async () => {
    if (!email || !password || !fullName || password !== confirmPassword) {
      console.log("❌ Email signup: Validation failed");
      return;
    }
    
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
    } finally {
      setIsRegistering(false);
    }
  };

  const handleEmailVerification = async () => {
    if (!otp) return;
    
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
      }
    } catch (err) {
      console.error("❌ Email verification failed:", err);
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
        RuralLedger
      </ThemedText>

      {/* Tagline */}
      <ThemedText type="subtitle" style={styles.tagline}>
        अपना खाता बनाएं
      </ThemedText>

      <View style={styles.formContainer}>
        {/* Full Name - Common for both modes */}
        <TextInput
          variant="filled"
          size="lg"
          label="पूरा नाम"
          value={fullName}
          placeholder="अपना पूरा नाम डालें"
          onChangeText={setFullName}
          containerStyle={styles.input}
        />

        {!isEmailMode ? (
          // Phone OTP Registration (NO PASSWORD FIELDS)
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
                  onPress={handleSendPhoneOTP}
                  loading={isRegistering}
                  style={styles.button}
                  disabled={!phoneNumber || !fullName || isRegistering}
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
                  onPress={handlePhoneVerification}
                  loading={isRegistering}
                  style={styles.button}
                  disabled={!otp || isRegistering}
                >
                  रजिस्टर करें
                </Button>
              </>
            )}
          </>
        ) : (
          // Email Password Registration
          <>
            {!otpSent ? (
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
                  value={password}
                  placeholder="पासवर्ड डालें"
                  onChangeText={setPassword}
                  secureTextEntry
                  containerStyle={styles.input}
                />

                <TextInput
                  variant="filled"
                  size="lg"
                  label="पासवर्ड की पुष्टि करें"
                  value={confirmPassword}
                  placeholder="पासवर्ड दोबारा डालें"
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
                  OTP भेजें
                </Button>
              </>
            ) : (
              <>
                <TextInput
                  variant="filled"
                  size="lg"
                  label="ईमेल OTP"
                  value={otp}
                  placeholder="ईमेल से मिला OTP डालें"
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
                  रजिस्टर करें
                </Button>
              </>
            )}
          </>
        )}
      </View>

      {/* Alternative Registration Methods */}
      <View style={styles.alternativeContainer}>
        <ThemedText style={styles.orText}>या</ThemedText>

        <Button
          variant="outline"
          size="lg"
          onPress={switchMode}
          style={styles.button}
        >
          {isEmailMode ? "मोबाइल नंबर से रजिस्टर करें" : "ईमेल से रजिस्टर करें"}
        </Button>
      </View>

      {/* Sign In Section */}
      <View style={styles.signInContainer}>
        <ThemedText>पहले से खाता है? </ThemedText>
        <Link href="/">
          <ThemedText style={styles.signInText}>लॉगिन करें</ThemedText>
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
  errorText: {
    color: "#E53E3E",
    marginBottom: 15,
    textAlign: "center",
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
});
