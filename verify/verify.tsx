"use client";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const VerifyForm = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  if (!isLoaded) {
    return null;
  }

  const submitCode = async (e: FormEvent) => {
    e.preventDefault();
    const code = new FormData(e.currentTarget as HTMLFormElement).get(
      "code"
    ) as string;
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <form onSubmit={submitCode}>
        <label>Code</label>
        <input name="code" placeholder="Code..." autoComplete="false" />
        <button type="submit">Verify Email</button>
      </form>
    </>
  );
};
