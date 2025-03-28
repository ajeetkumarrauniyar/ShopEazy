import { View } from "react-native";
import { Link, Stack } from "expo-router";

const NotFoundScreen = () => {
  return (
    <View className="flex justify-center items-center bg-[#25292e] min-h-screen px-4">
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View>
        <Link
          href="/"
          className="text-center text-white text-xl font-bold underline mt-5"
        >
          Go back to Home screen!
        </Link>
      </View>
    </View>
  );
};

export default NotFoundScreen;
