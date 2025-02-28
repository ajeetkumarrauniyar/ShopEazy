import { View } from "react-native";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View className="flex justify-center items-center bg-[#25292e] min-h-screen">
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View>
        <Link
          href="/"
          className="text-white text-xl"
        >
          Go back to Home screen!
        </Link>
      </View>
    </View>
  );
}
