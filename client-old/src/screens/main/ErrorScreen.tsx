import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Button from '../../components/Button';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred. Please try again later.',
  buttonText = 'Try Again',
  onButtonPress,
}) => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 justify-center items-center p-8`}>
        <Image
          source={require('../../assets/images/error.png')}
          style={tw`w-60 h-60 mb-8`}
          resizeMode='contain'
        />

        <Text style={tw`text-2xl font-bold text-textPrimary mb-3 text-center`}>
          {title}
        </Text>

        <Text style={tw`text-base text-textSecondary mb-8 text-center`}>
          {message}
        </Text>

        <View style={tw`w-full max-w-sm`}>
          <Button
            title={buttonText}
            onPress={handleButtonPress}
            size='lg'
            variant='primary'
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ErrorScreen;
