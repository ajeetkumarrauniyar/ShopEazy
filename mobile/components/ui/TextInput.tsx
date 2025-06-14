import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  View,
  TextInputProps as RNTextInputProps,
  ViewStyle,
  TextStyle,
  useColorScheme,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";

type TextInputVariant = "filled" | "outline" | "underline";
type TextInputSize = "sm" | "md" | "lg";

interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  variant?: TextInputVariant;
  size?: TextInputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  variant = "default",
  size = "md",
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  disabled = false,
  onFocus,
  onBlur,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isFocused, setIsFocused] = useState(false);

  const sizeStyles: Record<
    TextInputSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: 14, padding: 8 },
    md: { height: 44, fontSize: 16, padding: 12 },
    lg: { height: 52, fontSize: 18, padding: 16 },
  };

  const currentSize = sizeStyles[size] ? size : "md";
  const currentSizeStyles = sizeStyles[currentSize];

  const getVariantStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: variant === "underline" ? 0 : 8,
      height: currentSizeStyles.height,
      paddingHorizontal: currentSizeStyles.padding,
      opacity: disabled ? 0.6 : 1,
    };

    const focusedColor = error ? "#FF3B30" : "#007AFF";
    const defaultColor = isDark ? "#333333" : "#E5E5E7";
    const borderColor = error
      ? "#FF3B30"
      : isFocused
      ? focusedColor
      : defaultColor;

    switch (variant) {
      case "filled":
        return {
          ...baseStyles,
          backgroundColor: isDark ? "#1C1C1E" : "#F2F2F7",
          borderWidth: 2,
          borderColor: isFocused ? focusedColor : "transparent",
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderWidth: 1.5,
          borderColor,
        };
      case "underline":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          borderBottomWidth: 2,
          borderBottomColor: borderColor,
          borderRadius: 0,
        };
      default:
        return baseStyles;
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? "#666666" : "#AAAAAA";
    }
    return isDark ? "#FFFFFF" : "#000000";
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[containerStyle]}>
      {label && (
        <ThemedText
          style={[
            {
              fontSize: 14,
              fontWeight: "500",
              marginBottom: 6,
              color: error ? "#FF3B30" : isDark ? "#FFFFFF" : "#000000",
            },
            labelStyle,
          ]}
        >
          {label}
        </ThemedText>
      )}

      <View style={[getVariantStyles()]}>
        {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}

        <RNTextInput
          {...props}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[
            {
              flex: 1,
              fontSize: currentSizeStyles.fontSize,
              color: getTextColor(),
              paddingVertical: 0,
            },
            inputStyle,
          ]}
          placeholderTextColor={isDark ? "#888888" : "#999999"}
        />

        {rightIcon && (
          <Pressable style={{ marginLeft: 8 }}>{rightIcon}</Pressable>
        )}
      </View>

      {(error || helperText) && (
        <ThemedText
          style={{
            fontSize: 12,
            marginTop: 4,
            color: error ? "#FF3B30" : isDark ? "#888888" : "#666666",
          }}
        >
          {error || helperText}
        </ThemedText>
      )}
    </View>
  );
};
