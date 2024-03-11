"use client";
import { useSignIn } from "@clerk/nextjs";
import { FormEvent } from "react";

export const SignInForm = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: FormEvent) {
    e.preventDefault();

    if (!signIn) return;

    const form = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const result = await signIn.create({
        identifier: form.get("email") as string,
        password: form.get("password") as string,
      });

      console.log(result);

      if (result.status === "complete") {
        return setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={submit}>
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="submit" value="Sign In" />
    </form>
  );
};
