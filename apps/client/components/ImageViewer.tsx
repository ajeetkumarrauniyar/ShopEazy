import { Image, ImageSourcePropType } from "react-native";

type Props = {
  imgSource: ImageSourcePropType;
};

const ImageViewer = ({ imgSource }: Props) => {
  return (
    <Image
      source={imgSource}
      className="w-[320px] h-[440px] rounded-[18px] object-cover"
    />
  );
};

export default ImageViewer;
