"use client";

import { useUser } from "@clerk/nextjs";
import { useOrganizationContext } from "@/components/providers/organization-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function OrganizationSelector() {
  const { user, isLoaded } = useUser();
  const { switchOrganization } = useOrganizationContext();

  if (!isLoaded) {
    return (
      <div className="container mx-auto py-10">
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-md" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-10 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Select Organization</h1>

      <div className="grid gap-4">
        {user?.organizationMemberships?.map(({ organization }) => (
          <Card
            key={organization.id}
            className="hover:bg-muted/50 transition-colors"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  {organization.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-medium">{organization.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {organization.membersCount} members
                  </p>
                </div>
              </div>
              <Button onClick={() => switchOrganization(organization.id)}>
                Select
              </Button>
            </CardContent>
          </Card>
        ))}

        <Link href="/create-organization">
          <Card className="hover:bg-muted/50 transition-colors border-dashed">
            <CardContent className="p-6 flex items-center justify-center gap-2">
              <span className="text-primary">+</span>
              <span>Create New Organization</span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
