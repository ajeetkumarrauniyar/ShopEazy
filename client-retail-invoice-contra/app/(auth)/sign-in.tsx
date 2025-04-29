import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("SignIn component loaded");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    console.log("onSignInPress: Starting the sign in process.");
    if (!isLoaded) return;

    setLoading(true);

    try {
      console.log(
        "onSignInPress: Attempting to sign in with email:",
        emailAddress
      );
      // Start the sign-in process using the email and password provided
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      console.log(
        "onSignInPress: Sign in attempt result:",
        signInAttempt.status
      );

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        console.log("onSignInPress: Sign in complete, setting active session");
        await setActive({ session: signInAttempt.createdSessionId });
        console.log("onSignInPress: Session activated successfully!");
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(
          "onSignInPress: Incomplete sign in:",
          JSON.stringify(signInAttempt, null, 2)
        );
        Alert.alert(
          "Sign In Error",
          "Please check your credentials and try again."
        );
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("onSignInPress ERROR:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Sign In Error",
        "Failed to sign in. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
      console.log("onSignInPress: Finished the sign in process.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
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
        onChangeText={(pass) => setPassword(pass)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={onSignInPress}
        disabled={loading || !emailAddress || !password}
      >
        <Text style={styles.buttonText}>
          {loading ? "Please wait..." : "Sign In"}
        </Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up" style={styles.link}>
          <Text style={styles.linkText}>Sign up</Text>
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
