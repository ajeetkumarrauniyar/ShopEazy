"use client";

import { useOrganizationContext } from "@/components/providers/organization-provider";
import { useOrganization } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizationData } from "@/hooks/use-organization-data";

export default function OrganizationDashboard({
  params,
}: {
  params: { orgId: string };
}) {
  const { currentOrgId, isLoading: contextLoading } = useOrganizationContext();
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { data, isLoading, error } = useOrganizationData();

  if (contextLoading || isLoading || !orgLoaded) {
    return (
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        {organization?.name} Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Organization Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Members: {data?.stats.memberCount}</p>
              <p>Products: {data?.stats.productCount}</p>
              <p>Plan: {data?.subscription?.plan}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                Status: {data?.subscription?.isActive ? "Active" : "Inactive"}
              </p>
              <p>Renews: {data?.subscription?.endDate?.toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.financialYears?.map((year) => (
              <div key={year.id} className="py-2">
                <p>{year.name}</p>
                <p className="text-sm text-muted-foreground">
                  {year.startDate.toLocaleDateString()} -{" "}
                  {year.endDate.toLocaleDateString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
