"use server";

import { RegisterSchema } from "@/Schemas";
import { getUserByEmail, } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";

import { generateVerificationToken } from "@/lib/token";

import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFiled = RegisterSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, lastName, role } = validatedFiled.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      lastName,
      email,
      password: hashedPassword,
      role,
    },
  });

  //for dowola

  //for verification
  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "confirmation email Sent!" };
};
