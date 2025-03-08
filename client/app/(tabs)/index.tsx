import React from "react";
import "../../global.css";
import { Text, View } from "react-native";
import { Link } from "expo-router";
// import ImageViewer from "../../components/ImageViewer";

// import PlaceHolderImage from "../../assets/images/background-image.png";
// import Button from "../../components/ui/Button";

const ShopScreen = () => {
  return (
    <View className="flex justify-center items-center  bg-gray-400 h-full px-4">
      {/* <ImageViewer
        imgSource={PlaceHolderImage}
        className="absolute top-0 right-0 bottom-0 left-0"
      /> */}
      <Text className="text-white text-2xl font-semibold tracking-wide z-10">
        ShopScreen
      </Text>
      <Link
        href="/account"
        className="text-lg text-white underline mt-3 z-10"
      >
        Go to Account screen
      </Link>
      {/* <View className="flex-[1/3] items-center space-y-4 mt-5 z-10">
        <Button label="Choose a Photo" />
        <Button label="Use this Photo" />
      </View> */}
    </View>
  );
};
export default ShopScreen;
