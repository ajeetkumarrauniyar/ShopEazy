"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setLoading(true);
      setError("");

      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      // Start the email verification process
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Move to the verification step
      setVerifying(true);
    } catch (err) {
      console.error("Error signing up:", err);
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setLoading(true);
      setError("");

      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        // User has been created and logged in
        router.push("/dashboard");
      } else {
        console.log("Verification result:", result);
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Error verifying email:", err);
      setError(err.message || "Failed to verify email");
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Verify Your Email</h1>

        {error && (
          <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-6">
            <label className="mb-2 block text-gray-700" htmlFor="code">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !isLoaded}
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-bold">Create Account</h1>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !isLoaded}
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
