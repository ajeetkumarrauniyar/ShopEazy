"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

interface UserData {
  id: string;
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  // Add other properties from your database
}

export function useUserData() {
  const { isLoaded, isSignedIn } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!isLoaded || !isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/user/me");

        console.log("Response from Hooks API:", response);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [isLoaded, isSignedIn]);

  return { userData, loading, error };
}
