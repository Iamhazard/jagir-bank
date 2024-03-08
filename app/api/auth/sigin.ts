import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";

export default async function handler(request:Request) {
  try {
    const body=await request.json();
    const {signupType } =body;

    // Dynamically construct the signIn options
    const signInOptions = {
      callbackUrl: `${process.env.NEXTAUTH_URL_INTERNAL}/dashboard`,
      redirect: false,
      signupType,
    };

    await signIn("google", signInOptions);

        return new NextResponse('sucess', { status: 200 });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return new NextResponse('An error occurred during sign-in.', { status: 500 });
  }
}
