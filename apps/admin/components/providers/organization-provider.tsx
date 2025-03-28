"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";

type OrganizationContextType = {
  currentOrgId: string | null;
  isLoading: boolean;
  switchOrganization: (orgId: string) => void;
};

const OrganizationContext = createContext<OrganizationContextType>({
  currentOrgId: null,
  isLoading: true,
  switchOrganization: () => {},
});

export const useOrganizationContext = () => useContext(OrganizationContext);

export const OrganizationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organization } = useOrganization();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [currentOrgId, setCurrentOrgId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoaded) return;

    // Check URL for orgId first
    const pathOrgId = pathname.match(/\/orgId\/([^/]+)/)?.[1];

    if (pathOrgId) {
      setCurrentOrgId(pathOrgId);
      setIsLoading(false);
      return;
    }

    // Use active Clerk organization
    if (organization) {
      setCurrentOrgId(organization.id);
      setIsLoading(false);
      return;
    }

    // Handle organization selection logic
    if (user?.organizationMemberships) {
      if (user.organizationMemberships.length === 0) {
        router.push("/create-organization");
      } else if (user.organizationMemberships.length === 1) {
        setCurrentOrgId(user.organizationMemberships[0].organization.id);
        router.push(`/orgId/${currentOrgId}/dashboard`);
      } else {
        router.push("/organization-selector");
      }
    }

    setIsLoading(false);
  }, [isUserLoaded, organization, pathname, router, user]);

  const switchOrganization = (orgId: string) => {
    setCurrentOrgId(orgId);
    router.push(`/orgId/${orgId}/dashboard`);
  };

  return (
    <OrganizationContext.Provider
      value={{ currentOrgId, isLoading, switchOrganization }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};
