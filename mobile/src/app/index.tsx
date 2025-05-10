import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SplashScreen = () => {
  return (
    <View>
      <Text>SplashScreen</Text>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/settings">Settings</Link>
    </View>
  );
};

export default SplashScreen;
