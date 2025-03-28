/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
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

const SignIn = () => {
  const { isLoaded, setActive, signIn } = useSignIn();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
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

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Create the sign-in attempt
      const createdSignIn = await signIn!.create({
        identifier: phoneNumber,
      });

      // Find the phone code factor
      const phoneCodeFactor = createdSignIn.supportedFirstFactors?.find(
        (factor) => factor.strategy === "phone_code"
      );

      if (!phoneCodeFactor) {
        throw new Error("Phone code factor not found");
      }

      // Prepare the verification with phoneNumberId
      await createdSignIn.prepareFirstFactor({
        strategy: "phone_code",
        phoneNumberId: phoneCodeFactor.phoneNumberId,
      });

      setPendingVerification(true);
    } catch (error: any) {
      console.error("Sign in error:", JSON.stringify(error, null, 2));
      setError(
        error.errors?.[0]?.message || "An error occurred during sign in"
      );
    } finally {
      setIsLoading(false);
    }
  }
  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive!({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log("Sign in result:", JSON.stringify(result, null, 2));
        setError("Verification failed. Please check the code and try again.");
      }
    } catch (error: any) {
      console.error("Verification error:", JSON.stringify(error, null, 2));
      setError(error.errors?.[0]?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In to ShopEazy</CardTitle>
          <CardDescription>
            {!pendingVerification
              ? "Enter your phone number to continue"
              : "Enter the verification code sent to your phone"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!pendingVerification ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone No.</Label>
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
                {isLoading ? "Sending Code..." : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  type="text"
                  id="code"
                  placeholder="123456"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
