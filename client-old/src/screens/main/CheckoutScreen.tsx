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
import Input from '../../components/Input';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [deliveryAddress, setDeliveryAddress] = useState(
    '42 Park Avenue, New Delhi',
  );
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Order summary
  const subtotal = 12.96;
  const discount = isPromoApplied ? 2.0 : 0;
  const deliveryFee = 2.99;
  const total = subtotal - discount + deliveryFee;

  const handleAddPromoCode = () => {
    if (promoCode.toLowerCase() === 'first20') {
      setIsPromoApplied(true);
    }
  };

  const handlePlaceOrder = () => {
    navigation.navigate('OrderAccepted');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row items-center p-5 border-b border-border`}>
        <TouchableOpacity
          style={tw`w-10 h-10 justify-center items-center`}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require('../../assets/icons/back.png')}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
        <Text
          style={tw`flex-1 text-xl font-bold text-center text-textPrimary mr-10`}
        >
          Checkout
        </Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        {/* Delivery Address */}
        <View style={tw`p-5 border-b border-border`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-lg font-bold text-textPrimary`}>
              Delivery Address
            </Text>
            <TouchableOpacity>
              <Text style={tw`text-base text-primary`}>Change</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row items-start`}>
            <View
              style={tw`w-10 h-10 bg-secondary rounded-full justify-center items-center mr-3`}
            >
              <Image
                source={require('../../assets/icons/location.png')}
                style={tw`w-5 h-5`}
              />
            </View>

            <View style={tw`flex-1`}>
              <Text style={tw`text-base font-bold text-textPrimary mb-1`}>
                Home
              </Text>
              <Text style={tw`text-base text-textSecondary`}>
                {deliveryAddress}
              </Text>
            </View>
          </View>
        </View>

        {/* Delivery Options */}
        <View style={tw`p-5 border-b border-border`}>
          <Text style={tw`text-lg font-bold text-textPrimary mb-3`}>
            Delivery Time
          </Text>

          <View style={tw`flex-row mb-3`}>
            <TouchableOpacity
              style={tw`flex-1 p-4 border border-primary rounded-xl mr-3`}
            >
              <Text style={tw`text-base font-bold text-textPrimary mb-1`}>
                Today
              </Text>
              <Text style={tw`text-sm text-textSecondary`}>Within 30 min</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`flex-1 p-4 border border-border rounded-xl`}
            >
              <Text style={tw`text-base font-bold text-textPrimary mb-1`}>
                Tomorrow
              </Text>
              <Text style={tw`text-sm text-textSecondary`}>
                10:00 AM - 12:00 PM
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={tw`p-5 border-b border-border`}>
          <Text style={tw`text-lg font-bold text-textPrimary mb-3`}>
            Payment Method
          </Text>

          <TouchableOpacity
            style={tw`flex-row items-center p-4 border border-primary rounded-xl mb-3`}
            onPress={() => setPaymentMethod('card')}
          >
            <Image
              source={require('../../assets/icons/card.png')}
              style={tw`w-8 h-8 mr-3`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-base font-bold text-textPrimary mb-1`}>
                Credit Card
              </Text>
              <Text style={tw`text-sm text-textSecondary`}>
                **** **** **** 4567
              </Text>
            </View>
            <View
              style={tw`w-6 h-6 rounded-full border-2 border-primary justify-center items-center`}
            >
              {paymentMethod === 'card' && (
                <View style={tw`w-4 h-4 rounded-full bg-primary`} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center p-4 border border-border rounded-xl mb-3`}
            onPress={() => setPaymentMethod('cod')}
          >
            <Image
              source={require('../../assets/icons/cash.png')}
              style={tw`w-8 h-8 mr-3`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-base font-bold text-textPrimary mb-1`}>
                Cash on Delivery
              </Text>
              <Text style={tw`text-sm text-textSecondary`}>
                Pay when your order arrives
              </Text>
            </View>
            <View
              style={tw`w-6 h-6 rounded-full border-2 border-primary justify-center items-center`}
            >
              {paymentMethod === 'cod' && (
                <View style={tw`w-4 h-4 rounded-full bg-primary`} />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Promo Code */}
        <View style={tw`p-5 border-b border-border`}>
          <Text style={tw`text-lg font-bold text-textPrimary mb-3`}>
            Promo Code
          </Text>

          <View style={tw`flex-row items-center`}>
            <Input
              placeholder='Enter promo code'
              value={promoCode}
              onChangeText={setPromoCode}
              style={tw`flex-1 mr-3`}
            />

            <Button
              title={isPromoApplied ? 'Applied' : 'Apply'}
              onPress={handleAddPromoCode}
              disabled={isPromoApplied || !promoCode}
              size='sm'
              fullWidth={false}
              variant={isPromoApplied ? 'secondary' : 'primary'}
              style={tw`w-24`}
            />
          </View>

          {isPromoApplied && (
            <Text style={tw`text-sm text-primary mt-2`}>
              Promo code applied successfully!
            </Text>
          )}
        </View>

        {/* Order Summary */}
        <View style={tw`p-5`}>
          <Text style={tw`text-lg font-bold text-textPrimary mb-3`}>
            Order Summary
          </Text>

          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-base text-textSecondary`}>Subtotal</Text>
            <Text style={tw`text-base text-textPrimary`}>
              ₹{subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-base text-textSecondary`}>Delivery Fee</Text>
            <Text style={tw`text-base text-textPrimary`}>
              ₹{deliveryFee.toFixed(2)}
            </Text>
          </View>

          {isPromoApplied && (
            <View style={tw`flex-row justify-between mb-2`}>
              <Text style={tw`text-base text-discount`}>Discount</Text>
              <Text style={tw`text-base text-discount`}>
                -₹{discount.toFixed(2)}
              </Text>
            </View>
          )}

          <View
            style={tw`flex-row justify-between mt-3 pt-3 border-t border-border`}
          >
            <Text style={tw`text-lg font-bold text-textPrimary`}>Total</Text>
            <Text style={tw`text-lg font-bold text-primary`}>
              ₹{total.toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={tw`p-5 border-t border-border`}>
        <Button
          title='Place Order'
          onPress={handlePlaceOrder}
          size='lg'
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
