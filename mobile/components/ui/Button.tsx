import { ThemedText } from "@/components/ThemedText";
import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    TextStyle,
    useColorScheme,
    View,
    ViewStyle,
} from "react-native";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = "filled",
  size = "md",
  disabled = false,
  loading = false,
  children,
  style,
  textStyle,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: 14, padding: 8 },
    md: { height: 44, fontSize: 16, padding: 12 },
    lg: { height: 52, fontSize: 18, padding: 16 },
  };

  const getVariantStyles = () => {
    const baseStyles: ViewStyle = {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      flexDirection: "row",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    };

    switch (variant) {
      case "filled":
        return {
          ...baseStyles,
          backgroundColor: isDark ? "#007AFF" : "#007AFF",
          borderColor: isDark ? "#007AFF" : "#007AFF",
          shadowColor: isDark ? "#007AFF" : "#000",
          shadowOpacity: isDark ? 0.3 : 0.15,
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          borderColor: isDark ? "#007AFF" : "#007AFF",
          borderWidth: 2,
          shadowOpacity: 0,
          elevation: 0,
        };
      case "ghost":
        return {
          ...baseStyles,
          backgroundColor: isDark
            ? "rgba(0, 122, 255, 0.1)"
            : "rgba(0, 122, 255, 0.05)",
          borderColor: "transparent",
          borderWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
        };
      default:
        return baseStyles;
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return isDark ? "#666666" : "#AAAAAA";
    }

    switch (variant) {
      case "filled":
        return "#FFFFFF";
      case "outline":
        return isDark ? "#007AFF" : "#007AFF";
      case "ghost":
        return isDark ? "#007AFF" : "#0056CC";
      default:
        return isDark ? "#FFFFFF" : "#000000";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        getVariantStyles(),
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].padding,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {loading && (
          <ActivityIndicator 
            color={getTextColor()} 
            size="small" 
            style={{ marginRight: 8 }} 
          />
        )}
        <ThemedText
          style={StyleSheet.flatten([
            {
              fontSize: sizeStyles[size].fontSize,
              color: getTextColor(),
              textAlign: "center",
              marginBottom: 0,
              fontWeight: "500",
            },
            textStyle,
          ])}
        >
          {children}
        </ThemedText>
      </View>
    </Pressable>
  );
};
