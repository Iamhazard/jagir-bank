"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { AiOutlineApple } from "react-icons/ai";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");
  const onClick = (provider: "google" | "apple") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Button
        className="w-full max-w-3xl font-bold shadow-sm rounded-3xl py-2 bg-blue-600 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        size="lg"
        variant="outline"
        onClick={() => onClick("google")}>
        <div className="bg-white p-1 rounded-full">
          <FcGoogle />
        </div>
        <span className="ml-4">Sign in with Google</span>
      </Button>
      <Button
        className="w-full font-bold shadow-sm rounded-3xl py-2 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline "
        size="lg"
        variant="outline"
        onClick={() => onClick("apple")}>
        <div className="bg-white p-1 rounded-full">
          <AiOutlineApple />
        </div>
        <span className="ml-4">Sign in with Apple</span>
      </Button>
    </div>
  );
};
