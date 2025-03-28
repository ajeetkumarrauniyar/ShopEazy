import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import Button from '../../components/Button';

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView>
        {/* Header */}
        <View style={tw`flex-row justify-between px-5 pt-5`}>
          <TouchableOpacity
            style={tw`w-11 h-11 rounded-xl bg-secondary justify-center items-center`}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../assets/icons/back.png')}
              style={tw`w-5 h-5`}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`w-11 h-11 rounded-xl bg-secondary justify-center items-center`}
          >
            <Image
              source={require('../../assets/icons/favorite.png')}
              style={tw`w-5 h-5`}
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={tw`items-center my-8`}>
          <Image
            source={product.image}
            style={tw`w-60 h-48`}
            resizeMode='contain'
          />
        </View>

        {/* Product Details */}
        <View style={tw`bg-white rounded-t-3xl px-6 pt-6`}>
          {/* Name and Unit */}
          <View style={tw`mb-4`}>
            <Text style={tw`text-2xl font-bold text-textPrimary mb-1`}>
              {product.name}
            </Text>
            <Text style={tw`text-base text-textSecondary`}>{product.unit}</Text>
          </View>

          {/* Quantity Control */}
          <View style={tw`flex-row items-center mb-8`}>
            <TouchableOpacity
              style={tw`w-11 h-11 rounded-xl bg-secondary justify-center items-center`}
              onPress={decreaseQuantity}
            >
              <Text style={tw`text-xl font-bold text-primary`}>-</Text>
            </TouchableOpacity>

            <Text style={tw`text-lg font-bold mx-5`}>{quantity}</Text>

            <TouchableOpacity
              style={tw`w-11 h-11 rounded-xl bg-secondary justify-center items-center`}
              onPress={increaseQuantity}
            >
              <Text style={tw`text-xl font-bold text-primary`}>+</Text>
            </TouchableOpacity>

            <Text style={tw`text-2xl font-bold text-textPrimary ml-auto`}>
              ₹{product.price}
            </Text>
          </View>

          {/* Divider */}
          <View style={tw`h-px bg-border my-4`} />

          {/* Product Description */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-lg font-bold text-textPrimary mb-2`}>
              Product Detail
            </Text>
            <Text style={tw`text-base text-textSecondary`}>
              Fresh and organic {product.name.toLowerCase()} sourced directly
              from farms. Rich in nutrients and perfect for your daily diet.
            </Text>
          </View>

          {/* Divider */}
          <View style={tw`h-px bg-border my-4`} />

          {/* Nutritional Info */}
          <View style={tw`mb-6`}>
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-lg font-bold text-textPrimary`}>
                Nutritional Value
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/arrow-right.png')}
                  style={tw`w-5 h-5`}
                />
              </TouchableOpacity>
            </View>

            <View style={tw`ml-2`}>
              <Text style={tw`text-base text-textSecondary mb-1`}>
                100 calories per 100g
              </Text>
              <Text style={tw`text-base text-textSecondary mb-1`}>
                Protein: 3g
              </Text>
              <Text style={tw`text-base text-textSecondary`}>
                Carbohydrates: 20g
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={tw`h-px bg-border my-4`} />

          {/* Reviews */}
          < style={tw`mb-10`}>
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-lg font-bold text-textPrimary`}>
                Reviews
              </Text>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/icons/arrow-right.png')}
                  style={tw`w-5 h-5`}
                />
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center`}>
              <View style={tw`flex-row`}>
                {Array(5).fill(0).map((_, index) => (
                  <Image 
                    key={index}
                    source={require('../../assets/icons/star.png')} 
                    style={tw`w-4 h-4 mr-1`} 
                  />
                ))}
              </View>
              <Text style={tw`text-base text-textSecondary ml-2`}>4.8 (256 ratings)</Text>
            </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={tw`bg-white p-5 border-t border-border`}>
        <Button 
          title={`Add to Cart • ₹${totalPrice}`}
          onPress={() => {
            // Add to cart logic would go here
            navigation.navigate('Cart');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
