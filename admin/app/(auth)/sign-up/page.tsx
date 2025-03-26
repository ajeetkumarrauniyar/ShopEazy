"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp = () => {
  const { isLoaded, setActive, signUp } = useSignUp();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [sentVerificationCode, setSentVerificationCode] = useState("");
  const [pendingVerification, setpendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading authentication system...</p>
      </div>
    );
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading authentication system...</p>
        </div>
      );
    }

    try {
      await signUp.create({
        phoneNumber,
      });

      await signUp.preparePhoneNumberVerification({
        strategy: "phone_code",
      });

      setpendingVerification(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Sign up error:", JSON.stringify(error, null, 2));
      setError(
        error.errors?.[0]?.message || "An error occurred during sign up"
      );
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!isLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading authentication system...</p>
        </div>
      );
    }

    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code: sentVerificationCode,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      } //TODO: Handle the case when staus is !== complete, i.e., SignUpStatus = 'missing_requirements' | 'complete' | 'abandoned';

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard"); //TODO: After login, where the user should be redirected to.
      } else if (completeSignUp.status === "missing_requirements") {
        // Handle missing requirements
        setError("Additional information is required to complete sign up");
      } else {
        setError("Verification failed. Please check the code and try again.");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Verification error:", JSON.stringify(error, null, 2));
      setError(error.errors?.[0]?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign Up to ShopEazy</CardTitle>
            <CardDescription>
              {!pendingVerification
                ? "Enter your phone number to create an account"
                : "Enter the verification code sent to your phone"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!pendingVerification ? (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Phone No.</Label>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-sm text-muted-foreground">
                    Include country code (e.g., +91 for IN)
                  </p>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending Code..." : "Sign Up"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Verification Code</Label>
                  <Input
                    type="text"
                    id="code"
                    placeholder="123456"
                    value={sentVerificationCode}
                    onChange={(e) => setSentVerificationCode(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Verify Code
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
