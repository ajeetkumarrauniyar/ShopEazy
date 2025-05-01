"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./userProvider";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          {children}
          <Toaster position="top-right" />
        </UserProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
