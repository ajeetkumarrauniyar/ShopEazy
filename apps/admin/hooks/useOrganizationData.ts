"use client";

import { useOrganizationContext } from "@/components/providers/organization-provider";
import { useState, useEffect } from "react";

export function useOrganizationData() {
  const { currentOrgId } = useOrganizationContext();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentOrgId) {
      setIsLoading(false);
      return;
    }

    const fetchOrgData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/organizations/${currentOrgId}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch organization data: ${response.statusText}`
          );
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error in useOrganizationData:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrgData();
  }, [currentOrgId]);

  return { data, isLoading, error, refetch: () => setData(null) };
}
