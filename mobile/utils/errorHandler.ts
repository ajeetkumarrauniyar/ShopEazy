import { ClerkAPIError } from "@clerk/types";

// Import React for the hook
import React from "react";

// Custom error type to handle both Clerk errors and string messages
export type AuthError = {
  type: "clerk" | "custom";
  clerkErrors?: ClerkAPIError[];
  message: string;
};

// Helper function to check if error has Clerk API error structure
const isClerkAPIError = (
  error: unknown
): error is { errors: ClerkAPIError[] } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray((error as any).errors)
  );
};

// Map Clerk error codes to user-friendly messages
const getClerkErrorMessage = (errorCode: string | undefined): string => {
  switch (errorCode) {
    case "form_identifier_not_found":
      return "Account not found. Please check your phone number or email.";
    case "form_password_incorrect":
      return "Incorrect password. Please try again.";
    case "form_code_incorrect":
      return "Invalid OTP code. Please check and try again.";
    case "verification_expired":
      return "OTP code has expired. Please request a new one.";
    case "verification_failed":
      return "Verification failed. Please try again.";
    case "too_many_requests":
      return "Too many attempts. Please wait before trying again.";
    case "phone_number_exists":
      return "An account with this phone number already exists.";
    case "email_address_exists":
      return "An account with this email address already exists.";
    case "session_exists":
      return "You are already signed in.";
    case "identification_exists":
      return "This identifier is already in use.";
    case "form_param_format_invalid":
      return "Invalid format. Please check your input.";
    case "form_param_nil":
      return "Required field is missing.";
    case "form_param_unknown":
      return "Unknown parameter provided.";
    case "captcha_invalid":
      return "Captcha verification failed. Please try again.";
    case "captcha_unavailable":
      return "Captcha is currently unavailable. Please try again later.";
    default:
      return "Authentication failed. Please try again.";
  }
};

// Main error handler function
export const handleError = (error: unknown): AuthError => {
  if (isClerkAPIError(error)) {
    const errorCode = error.errors[0]?.code;
    const clerkMessage = error.errors[0]?.message;
    const userFriendlyMessage = getClerkErrorMessage(errorCode);

    return {
      type: "clerk",
      clerkErrors: error.errors,
      message:
        userFriendlyMessage ||
        clerkMessage ||
        "Authentication failed. Please try again.",
    };
  }

  if (error instanceof Error) {
    return {
      type: "custom",
      message: error.message,
    };
  }

  return {
    type: "custom",
    message: "An unexpected error occurred. Please try again.",
  };
};

// Helper function to create custom error
export const createCustomError = (message: string): AuthError => {
  return {
    type: "custom",
    message,
  };
};

// Hook for managing auth errors in components
export const useAuthError = () => {
  const [error, setError] = React.useState<AuthError | null>(null);

  const setCustomError = (message: string) => {
    setError(createCustomError(message));
  };

  const setClerkError = (error: unknown) => {
    setError(handleError(error));
  };

  const clearError = () => {
    setError(null);
  };

  return {
    error,
    setCustomError,
    setClerkError,
    clearError,
    hasError: !!error,
  };
};

//USAGE EXAMPLE::
// const MyComponent = () => {
//   const { error, setCustomError, setClerkError, clearError, hasError } =
//     useAuthError();

//   // For simple errors
//   setCustomError("Please fill all fields");

//   // For Clerk errors
//   setClerkError(err);

//   // Clear errors
//   clearError();

//   // Display errors
//   return hasError ? <Text>{error?.message}</Text> : null;
// };
