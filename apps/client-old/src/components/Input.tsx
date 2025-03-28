import React from 'react';
import { View, TextInput, Text, Image, TextInputProps } from 'react-native';
import tw from 'twrnc';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: any;
  rightIcon?: any;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <View style={tw`mb-4`}>
      {label && (
        <Text style={tw`text-textPrimary text-base mb-2`}>{label}</Text>
      )}

      <View
        style={tw`flex-row items-center border-b border-border ${error ? 'border-red-500' : ''}`}
      >
        {leftIcon && (
          <Image
            source={leftIcon}
            style={tw`w-5 h-5 mr-2`}
          />
        )}

        <TextInput
          style={tw`flex-1 py-2 text-base text-textPrimary`}
          placeholderTextColor='#7C7C7C'
          {...props}
        />

        {rightIcon && (
          <Image
            source={rightIcon}
            style={tw`w-5 h-5 ml-2`}
          />
        )}
      </View>

      {error && <Text style={tw`text-red-500 text-sm mt-1`}>{error}</Text>}
    </View>
  );
};

export default Input;
