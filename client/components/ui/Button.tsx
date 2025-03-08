import React from "react";
import { View, Pressable, Text } from "react-native";

type Props = {
  label: string;
};

const Button = ({ label }: Props) => {
  return (
    <View className="w-72 h-16 mx-5 items-center justify-center p-3">
      <Pressable
        className="rounded-lg w-full h-full items-center justify-center flex-row bg-blue-600 active:bg-blue-700 shadow-md"
        onPress={() => alert("You pressed a button.")}
      >
        <Text className="text-white text-xl font-semibold">{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
