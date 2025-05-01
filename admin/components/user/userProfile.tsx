"use client";

import { useState } from "react";
import { useUser } from "@/providers/userProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, loading, refetch } = useUser();
  const { user: clerkUser } = useClerkUser();
  const [isSyncing, setIsSyncing] = useState(false);

  const syncProfile = async () => {
    if (!clerkUser) return;

    setIsSyncing(true);
    try {
      // Call an API endpoint to trigger profile sync
      const response = await fetch("/api/user/sync", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to sync profile");
      }

      await refetch();
      toast.success("Profile synchronized successfully");
    } catch (error) {
      toast.error("Failed to sync profile");
      console.error("Profile sync error:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-2xl py-10">
        <Card>
          <CardHeader>
            <Skeleton className="mb-2 h-8 w-64" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Your profile information as stored in our database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">Email:</div>
            <div>{user?.emailAddress}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">First Name:</div>
            <div>{user?.firstName || "Not set"}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">Last Name:</div>
            <div>{user?.lastName || "Not set"}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="font-medium">Phone:</div>
            <div>{user?.phoneNumber || "Not set"}</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={syncProfile} disabled={isSyncing}>
            {isSyncing ? "Syncing..." : "Sync Profile from Clerk"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
