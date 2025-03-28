import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    unit: string;
    image: any;
    discount?: number;
  };
  onPress: () => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
}) => {
  return (
    <TouchableOpacity
      style={tw`w-40 mr-4 bg-white rounded-2xl border border-border p-3 relative`}
      onPress={onPress}
    >
      <Image
        source={product.image}
        style={tw`w-24 h-20 self-center mb-2`}
        resizeMode='contain'
      />

      <View style={tw`flex-1`}>
        <Text style={tw`text-base font-bold text-textPrimary mb-1`}>
          {product.name}
        </Text>
        <Text style={tw`text-sm text-textSecondary mb-2`}>{product.unit}</Text>

        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-lg font-bold text-textPrimary`}>
            ₹{product.price}
          </Text>
          <TouchableOpacity
            style={tw`bg-primary w-10 h-10 rounded-xl justify-center items-center`}
            onPress={onAddToCart}
          >
            <Text style={tw`text-white text-xl font-bold`}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {product.discount && (
        <View style={tw`absolute top-3 left-3 bg-discount px-2 py-1 rounded`}>
          <Text style={tw`text-white text-xs font-bold`}>
            {product.discount}% OFF
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;
