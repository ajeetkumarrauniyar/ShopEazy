import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to My App</CardTitle>
          <CardDescription>
            A Turborepo monorepo with Next.js and Expo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignedIn>
            <p className="mb-4">You are signed in!</p>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <p className="mb-4">Please sign in to continue</p>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500">
            Powered by Clerk, Neon, and Prisma
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
