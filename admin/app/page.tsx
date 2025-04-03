import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
          <p className="mb-4">You are signed in!</p>

          <p className="mb-4">Please sign in to continue</p>

          <Button>Sign In</Button>
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
