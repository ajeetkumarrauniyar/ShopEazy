"use client";

import { useUser, SignIn } from "@clerk/nextjs";

const HomePage = () => {
  const { isSignedIn } = useUser();

  return (
    <div>
      <h1>Welcome to the Multi-Tenant RBAC System</h1>
      {isSignedIn ? <p>You are signed in!</p> : <SignIn />}
    </div>
  );
};

export default HomePage;
