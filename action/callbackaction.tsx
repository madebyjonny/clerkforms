"use client";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export const HandleCallback = () => {
  return <AuthenticateWithRedirectCallback />;
};
