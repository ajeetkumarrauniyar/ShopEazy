import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import tw from 'twrnc';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    image: any;
  };
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      style={tw`items-center mr-5`}
      onPress={onPress}
    >
      <Image
        source={category.image}
        style={tw`w-16 h-16 rounded-full mb-2`}
      />
      <Text style={tw`text-base text-textPrimary`}>{category.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
