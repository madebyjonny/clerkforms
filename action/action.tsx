"use client";
import { useAuth, useSignIn, useUser } from "@clerk/nextjs";
import { FormEvent } from "react";

export const Action = () => {
  const { isLoaded } = useSignIn();

  const { getToken } = useAuth();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    try {
      const test = await fetch("http://localhost:3001/events", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
        credentials: "include",
      });
      const result = await test.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return <button onClick={submit}>Test Request</button>;
};
