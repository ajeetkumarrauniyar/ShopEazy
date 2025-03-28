import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Button from '../../components/Button';

// Mock cart data
const initialCartItems = [
  {
    id: '1',
    name: 'Organic Bananas',
    price: 4.99,
    unit: 'kg',
    image: require('./assets/images/favorites/banana.png'),
    quantity: 1,
  },
  {
    id: '3',
    name: 'Bell Pepper Red',
    price: 1.99,
    unit: 'kg',
    image: require('../../assets/images/pepper.png'),
    quantity: 2,
  },
  {
    id: '2',
    name: 'Red Apple',
    price: 1.99,
    unit: 'kg',
    image: require('../../assets/images/apple.png'),
    quantity: 3,
  },
];

const CartScreen = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (action === 'increase') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (action === 'decrease') {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View
        style={tw`flex-row justify-center items-center p-5 border-b border-border`}
      >
        <Text style={tw`text-xl font-bold text-textPrimary`}>My Cart</Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        {cartItems.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center p-10`}>
            <Image
              source={require('../../assets/images/empty-cart.png')}
              style={tw`w-40 h-40 mb-5`}
              resizeMode='contain'
            />
            <Text style={tw`text-lg font-bold text-textPrimary mb-2`}>
              Your cart is empty
            </Text>
            <Text style={tw`text-base text-textSecondary text-center mb-5`}>
              Looks like you haven't added anything to your cart yet.
            </Text>
            <Button
              title='Start Shopping'
              onPress={() => navigation.navigate('Home')}
              size='sm'
              fullWidth={false}
            />
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <View
                key={item.id}
                style={tw`flex-row p-5 border-b border-border`}
              >
                <Image
                  source={item.image}
                  style={tw`w-20 h-20`}
                  resizeMode='contain'
                />

                <View style={tw`flex-1 ml-4 justify-between`}>
                  <View>
                    <Text style={tw`text-base font-bold text-textPrimary`}>
                      {item.name}
                    </Text>
                    <Text style={tw`text-sm text-textSecondary`}>
                      {item.unit}
                    </Text>
                  </View>

                  <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-row items-center`}>
                      <TouchableOpacity
                        style={tw`w-8 h-8 rounded-lg bg-secondary justify-center items-center`}
                        onPress={() =>
                          handleQuantityChange(item.id, 'decrease')
                        }
                      >
                        <Text style={tw`text-lg font-bold text-primary`}>
                          -
                        </Text>
                      </TouchableOpacity>

                      <Text style={tw`mx-3 text-base font-bold`}>
                        {item.quantity}
                      </Text>

                      <TouchableOpacity
                        style={tw`w-8 h-8 rounded-lg bg-secondary justify-center items-center`}
                        onPress={() =>
                          handleQuantityChange(item.id, 'increase')
                        }
                      >
                        <Text style={tw`text-lg font-bold text-primary`}>
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={tw`text-base font-bold text-textPrimary`}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={tw`ml-2 h-8 w-8 justify-center items-center`}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Image
                    source={require('../../assets/icons/trash.png')}
                    style={tw`w-5 h-5`}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <View style={tw`p-5`}>
              <View style={tw`border-b border-border pb-5`}>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text style={tw`text-base text-textSecondary`}>Subtotal</Text>
                  <Text style={tw`text-base font-bold text-textPrimary`}>
                    ₹{subtotal.toFixed(2)}
                  </Text>
                </View>
                <View style={tw`flex-row justify-between mb-3`}>
                  <Text style={tw`text-base text-textSecondary`}>
                    Delivery Fee
                  </Text>
                  <Text style={tw`text-base font-bold text-textPrimary`}>
                    ₹{deliveryFee.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row justify-between mt-3`}>
                <Text style={tw`text-lg font-bold text-textPrimary`}>
                  Total
                </Text>
                <Text style={tw`text-lg font-bold text-textPrimary`}>
                  ₹{total.toFixed(2)}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={tw`bg-white p-5 border-t border-border`}>
          <Button
            title={`Proceed to Checkout • ₹${total.toFixed(2)}`}
            onPress={() => navigation.navigate('Checkout')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
