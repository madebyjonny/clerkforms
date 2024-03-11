"use client";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const SignUpForm = () => {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!signUp) return;

    const form = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await signUp.create({
        emailAddress: form.get("email") as string,
        password: form.get("password") as string,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      router.push("/verify-code");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={submit}>
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};
