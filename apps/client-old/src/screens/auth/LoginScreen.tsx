import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Input from '../../components/Input';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSendOTP = () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // In real implementation, this would connect to Firebase Auth
    navigation.navigate('OTPVerification', { phoneNumber });
  };

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <TouchableOpacity
        style={tw`mt-5 w-10 h-10 justify-center items-center`}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../../assets/icons/back.png')}
          style={tw`w-6 h-6`}
        />
      </TouchableOpacity>

      <View style={tw`flex-1 justify-center pb-24`}>
        <Text style={tw`text-2xl font-bold text-textPrimary mb-2`}>
          Enter your mobile number
        </Text>

        <Text style={tw`text-base text-textSecondary mb-10`}>
          We'll send you a verification code
        </Text>

        <View style={tw`flex-row items-center border-b border-border mb-10`}>
          <Text style={tw`text-lg text-textPrimary mr-2`}>+91</Text>
          <Input
            placeholder='Phone Number'
            keyboardType='phone-pad'
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              setError('');
            }}
            maxLength={10}
            error={error}
          />
        </View>

        <Button
          title='Send OTP'
          onPress={handleSendOTP}
          disabled={phoneNumber.length !== 10}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
