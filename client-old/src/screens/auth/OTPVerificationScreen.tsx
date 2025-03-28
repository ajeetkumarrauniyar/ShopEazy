import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import Button from '../../components/Button';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber } = route.params || {};

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (text !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    // In real implementation, this would verify OTP with Firebase Auth
    if (otp.join('').length === 4) {
      navigation.navigate('Home');
    }
  };

  const handleResendOTP = () => {
    setTimer(60);
    // Here you would call the Firebase Auth API to resend OTP
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
          Enter verification code
        </Text>

        <Text style={tw`text-base text-textSecondary mb-10`}>
          We have sent SMS with code to +91 {phoneNumber}
        </Text>

        <View style={tw`flex-row justify-between mb-10`}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={tw`w-16 h-16 border border-border rounded-xl text-center text-2xl font-bold`}
              maxLength={1}
              keyboardType='number-pad'
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
            />
          ))}
        </View>

        <Button
          title='Verify OTP'
          onPress={handleVerifyOTP}
          disabled={otp.join('').length !== 4}
          style={tw`mb-5`}
        />

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-sm text-textSecondary`}>
            Didn't receive code?
          </Text>
          {timer > 0 ? (
            <Text style={tw`text-sm text-textSecondary`}>
              Resend in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={tw`text-sm font-bold text-primary`}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;
