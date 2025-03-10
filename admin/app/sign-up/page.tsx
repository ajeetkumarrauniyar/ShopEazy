"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp = () => {
  const { isLoaded, setActive, signUp } = useSignUp();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [pendingVerificationCode, setPendingVerificationCode] = useState(false);
  const [sentVerificationCode, setSentVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  if (!isLoaded) {
    return null;
  } //TODO: Add a loader

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return null;
    } //TODO: Add a loader

    try {
      await signUp.create({
        phoneNumber,
      });

      await signUp.preparePhoneNumberVerification({
        strategy: "phone_code",
      });
      setPendingVerificationCode(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  async function handleVerification(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoaded) {
      return null;
    } //TODO: Add a loader

    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      } //TODO: Handle the case when staus is !== complete, i.e., SignUpStatus = 'missing_requirements' | 'complete' | 'abandoned';

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard"); //TODO: After login, where the user should be redirected to.
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2));
      setError(error.errors[0].message);
    }
  }

  return (
    <>
      <div>The current sign-up attempt status is {signUp?.status}.</div>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign Up to ShopEazy</CardTitle>
          </CardHeader>
          <CardContent>
            {!pendingVerificationCode ? (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Phone No.</Label>
                  <Input
                    type="tel"
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Verification Code</Label>
                  <Input
                    type="text"
                    id="code"
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
                  Verify
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
