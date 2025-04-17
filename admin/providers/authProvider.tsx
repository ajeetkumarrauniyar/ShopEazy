import { ClerkProvider } from "@clerk/nextjs";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
