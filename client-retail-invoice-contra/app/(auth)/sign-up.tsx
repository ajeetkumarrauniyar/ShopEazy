import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

console.log("SignUp component loaded");

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    console.log("onSignUpPress: Starting the sign up process.");
    if (!isLoaded) return;
    
    setLoading(true);
    console.log(emailAddress, password);

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", "Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
      console.log("onSignUpPress: Finished the sign up process.");
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    console.log("onVerifyPress: Starting the verification process.");
    console.log('onVerifyPress - Verifying with code: ', code);
    
    if (!isLoaded) {
      console.log("onVerifyPress: Clerk not loaded");
      return;
    }
    
    setLoading(true);

    try {
      // Use the code the user provided to attempt verification
      console.log("onVerifyPress: Attempting verification with code:", code);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log("onVerifyPress: Verification attempt result:", JSON.stringify(signUpAttempt.status));

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        console.log("onVerifyPress: Verification complete, setting active session");
        await setActive({ session: signUpAttempt.createdSessionId });
        console.log("onVerifyPress: Session activated successfully!");
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error("onVerifyPress: Incomplete verification:", JSON.stringify(signUpAttempt, null, 2));
        Alert.alert("Verification Error", "Please check your verification code and try again.");
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("onVerifyPress ERROR:", JSON.stringify(err, null, 2));
      Alert.alert("Verification Error", "Failed to verify. Please try again.");
    } finally {
      setLoading(false);
      console.log("onVerifyPress: Finished the verification process.");
    }
  };

  if (pendingVerification) {
    console.log('Verification screen loaded. pendingVerification:', pendingVerification);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <Text style={styles.subtitle}>Enter the verification code sent to your email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={onVerifyPress}
          disabled={loading || !code}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={onSignUpPress}
        disabled={loading || !emailAddress || !password}
      >
        <Text style={styles.buttonText}>
          {loading ? "Please wait..." : "Continue"}
        </Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text>Already have an account?</Text>
        <Link href="/sign-in" style={styles.link}>
          <Text style={styles.linkText}>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  link: {
    marginLeft: 5,
  },
  linkText: {
    color: "blue",
  },
});