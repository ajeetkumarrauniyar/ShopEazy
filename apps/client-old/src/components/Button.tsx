import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import tw from 'twrnc';

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
}) => {
  const getButtonStyle = () => {
    const baseStyle = 'rounded-2xl flex items-center justify-center';
    const sizeStyle =
      size === 'sm' ? 'py-2 px-4' : size === 'md' ? 'py-4 px-6' : 'py-5 px-8';
    const widthStyle = fullWidth ? 'w-full' : '';

    switch (variant) {
      case 'primary':
        return `${baseStyle} ${sizeStyle} ${widthStyle} ${disabled ? 'bg-opacity-50' : ''} bg-primary`;
      case 'secondary':
        return `${baseStyle} ${sizeStyle} ${widthStyle} bg-secondary`;
      case 'outline':
        return `${baseStyle} ${sizeStyle} ${widthStyle} border border-primary`;
      default:
        return `${baseStyle} ${sizeStyle} ${widthStyle} bg-primary`;
    }
  };

  const getTextStyle = () => {
    const baseStyle = 'font-bold';
    const sizeStyle =
      size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';

    switch (variant) {
      case 'primary':
        return `${baseStyle} ${sizeStyle} text-white`;
      case 'secondary':
        return `${baseStyle} ${sizeStyle} text-textPrimary`;
      case 'outline':
        return `${baseStyle} ${sizeStyle} text-primary`;
      default:
        return `${baseStyle} ${sizeStyle} text-white`;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={tw`${getButtonStyle()}`}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#53B175' : '#FFFFFF'}
        />
      ) : (
        <Text style={tw`${getTextStyle()}`}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
