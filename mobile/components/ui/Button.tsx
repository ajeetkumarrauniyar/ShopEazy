import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
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
  style?: ViewStyle | ViewStyle[]; 
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
  const theme = useTheme();

  const sizeStyles: Record<
    ButtonSize,
    { height: number; fontSize: number; paddingHorizontal: number }
  > = {
    sm: {
      height: 36,
      fontSize: 14,
      paddingHorizontal: theme.spacing.sm,
    },
    md: {
      height: 44,
      fontSize: 16,
      paddingHorizontal: theme.spacing.md,
    },
    lg: {
      height: 52,
      fontSize: 18,
      paddingHorizontal: theme.spacing.lg,
    },
  };

  const {
    buttonStyle,
    textColor,
  }: { buttonStyle: ViewStyle; textColor: string } = (() => {
    const baseStyle: ViewStyle = {
      ...sizeStyles[size],
      justifyContent: "center",
      alignItems: "center",
      borderRadius: theme.borderRadius.md,
      flexDirection: "row",
      borderWidth: 1,
    };

    if (disabled) {
      return {
        buttonStyle: {
          ...baseStyle,
          backgroundColor: theme.colors.grey[200],
          borderColor: theme.colors.grey[200],
          ...theme.shadows.none,
        },
        textColor: theme.colors.text.disabled,
      };
    }

    switch (variant) {
      case "filled":
        return {
          buttonStyle: {
            ...baseStyle,
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
            ...theme.shadows.md,
          },
          textColor: theme.colors.onPrimary,
        };
      case "outline":
        return {
          buttonStyle: {
            ...baseStyle,
            backgroundColor: "transparent",
            borderColor: theme.colors.primary,
            borderWidth: 2,
            ...theme.shadows.none,
          },
          textColor: theme.colors.primary,
        };
      case "ghost":
        return {
          buttonStyle: {
            ...baseStyle,
            backgroundColor: "transparent",
            borderColor: "transparent",
            ...theme.shadows.none,
          },
          textColor: theme.colors.primary,
        };
      default:
        return {
          buttonStyle: baseStyle,
          textColor: theme.colors.text.primary,
        };
    }
  })();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        buttonStyle,
        { opacity: pressed ? 0.8 : 1 },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator
            color={textColor}
            size="small"
            style={{ marginRight: theme.spacing.sm }}
          />
        ) : (
          <ThemedText
            type="button"
            style={StyleSheet.flatten([
              {
                fontSize: sizeStyles[size].fontSize,
                color: textColor,
                textAlign: "center",
              },
              textStyle,
            ])}
          >
            {children}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
};
