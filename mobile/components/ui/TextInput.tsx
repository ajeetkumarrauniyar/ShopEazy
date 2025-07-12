import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import React, { useState } from "react";
import {
    Pressable,
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";

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
  variant = "filled",
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
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const sizeStyles: Record<
    TextInputSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: theme.typography.fontSizes.sm, padding: theme.spacing.sm },
    md: { height: 44, fontSize: theme.typography.fontSizes.md, padding: theme.spacing.md },
    lg: { height: 52, fontSize: theme.typography.fontSizes.lg, padding: theme.spacing.lg },
  };

  const currentSize = sizeStyles[size] ? size : "md";
  const currentSizeStyles = sizeStyles[currentSize];

  const getVariantStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: variant === "underline" ? 0 : theme.borderRadius.md,
      height: currentSizeStyles.height,
      paddingHorizontal: currentSizeStyles.padding,
      opacity: disabled ? 0.6 : 1,
    };

    const focusedColor = error ? theme.colors.error : theme.colors.primary;
    const defaultColor = theme.colors.grey[300];
    const borderColor = error
      ? theme.colors.error
      : isFocused
      ? focusedColor
      : defaultColor;

    switch (variant) {
      case "filled":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.grey[100],
          borderWidth: 2,
          borderColor: isFocused ? focusedColor : "transparent",
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.surface,
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
      return theme.colors.text.disabled;
    }
    return theme.colors.text.primary;
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
          type="subtitle2"
          style={[
            {
              marginBottom: theme.spacing.xs,
              color: error ? theme.colors.error : theme.colors.text.primary,
            },
            labelStyle,
          ]}
        >
          {label}
        </ThemedText>
      )}

      <View style={[getVariantStyles()]}>
        {leftIcon && <View style={{ marginRight: theme.spacing.sm }}>{leftIcon}</View>}

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
              fontFamily: theme.typography.fonts.regular,
            },
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.text.hint}
        />

        {rightIcon && (
          <Pressable style={{ marginLeft: theme.spacing.sm }}>{rightIcon}</Pressable>
        )}
      </View>

      {(error || helperText) && (
        <ThemedText
          type="caption"
          style={{
            marginTop: theme.spacing.xs,
            color: error ? theme.colors.error : theme.colors.text.secondary,
          }}
        >
          {error || helperText}
        </ThemedText>
      )}
    </View>
  );
};
