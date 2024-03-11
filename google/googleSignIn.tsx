"use client";
import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/server";
import { FormEvent } from "react";

export const GoogleSignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWith = async (e: FormEvent) => {
    e.preventDefault();
    return signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  return <button onClick={signInWith}>Sign in with google</button>;
};
