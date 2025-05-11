import { Redirect, Slot } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // If auth is still loading, show nothing
  if (!isLoaded) return null;

  // If user is not signed in, redirect to sign-in page
  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  // If user is signed in, show the protected content
  return <Slot />;
}
