import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Button from '../../components/Button';

const OrderAcceptedScreen = () => {
  const navigation = useNavigation();

  const handleTrackOrder = () => {
    navigation.navigate('OrderTracking');
  };

  const handleBackToShopping = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 justify-center items-center p-8`}>
        <Image
          source={require('../../assets/images/order-success.png')}
          style={tw`w-60 h-60 mb-8`}
          resizeMode='contain'
        />

        <Text style={tw`text-2xl font-bold text-textPrimary mb-3 text-center`}>
          Order Accepted
        </Text>

        <Text style={tw`text-base text-textSecondary mb-8 text-center`}>
          Your order has been placed successfully. For more details, track your
          order.
        </Text>

        <View style={tw`w-full max-w-sm`}>
          <Button
            title='Track Order'
            onPress={handleTrackOrder}
            size='lg'
            variant='primary'
            style={tw`mb-4`}
          />

          <Button
            title='Back to Shopping'
            onPress={handleBackToShopping}
            size='lg'
            variant='outline'
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderAcceptedScreen;
