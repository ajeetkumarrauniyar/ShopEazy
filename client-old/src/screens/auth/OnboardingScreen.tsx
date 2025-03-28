import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Button from '../../components/Button';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-primary`}>
      <Image
        source={require('../../assets/images/onboarding-image.png')}
        style={tw`w-full h-1/2 mt-10`}
        resizeMode='contain'
      />

      <View
        style={tw`flex-1 bg-white rounded-t-3xl p-6 justify-center items-center`}
      >
        <Text style={tw`text-3xl font-bold text-center text-textPrimary mb-4`}>
          Welcome to Our Store
        </Text>

        <Text style={tw`text-base text-center text-textSecondary mb-10 px-5`}>
          Shop groceries, fresh produce and more at affordable prices
        </Text>

        <Button
          title='Get Started'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;
