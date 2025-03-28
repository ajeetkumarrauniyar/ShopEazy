"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { useOrganizationContext } from "@/components/providers/organization-provider";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  CreditCard,
} from "lucide-react";

export function OrganizationNav() {
  const pathname = usePathname();
  const { organization } = useOrganization();
  const { currentOrgId } = useOrganizationContext();

  if (!currentOrgId) return null;

  const isAdmin =
    organization?.membership?.role === "org:admin" ||
    organization?.membership?.role === "org:owner";

  const routes = [
    {
      href: `/orgId/${currentOrgId}/dashboard`,
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === `/orgId/${currentOrgId}/dashboard`,
    },
    {
      href: `/orgId/${currentOrgId}/products`,
      label: "Products",
      icon: Package,
      active: pathname.includes(`/orgId/${currentOrgId}/products`),
    },
    ...(isAdmin
      ? [
          {
            href: `/orgId/${currentOrgId}/members`,
            label: "Members",
            icon: Users,
            active: pathname.includes(`/orgId/${currentOrgId}/members`),
          },
          {
            href: `/orgId/${currentOrgId}/billing`,
            label: "Billing",
            icon: CreditCard,
            active: pathname.includes(`/orgId/${currentOrgId}/billing`),
          },
          {
            href: `/orgId/${currentOrgId}/settings`,
            label: "Settings",
            icon: Settings,
            active: pathname.includes(`/orgId/${currentOrgId}/settings`),
          },
        ]
      : []),
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          <route.icon className="h-4 w-4 mr-2" />
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
