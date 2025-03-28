// client/auth/clerk-expo.ts
import { CLERK_CONFIG } from "../../../shared/auth/clerk/shared-clerk-config";
import { useAuth } from "@clerk/clerk-expo";

export const useExpoAuth = () => {
  const { isLoaded, userId, sessionId } = useAuth();
  // Mobile-specific auth logic
  return { isLoaded, userId, sessionId };
};
