import React from "react";
import "../../global.css";
import { Text, View } from "react-native";
import { Link } from "expo-router";

const HomeScreen = () => {
  return (
    <View className="flex justify-center items-center bg-black min-h-screen">
      <Text className="text-white text-2xl">ShopScreen</Text>
      <Link
        href="/account"
        className="text-lg text-white underline"
      >
        Go to Account screen
      </Link>
    </View>
  );
};
export default HomeScreen;
