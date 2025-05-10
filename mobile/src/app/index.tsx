import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const SplashScreen = () => {
  useEffect(() => {
    // Auto-navigate to main app after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace("/(protected)/(tabs)/");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        style={styles.logoContainer}
      >
        {/* Replace with your app logo */}
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(1000)}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * 0.5, // 50% of screen width
    height: width * 0.5,
  },
  loadingContainer: {
    position: "absolute",
    bottom: height * 0.15, // 15% from bottom
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
});

export default SplashScreen;
