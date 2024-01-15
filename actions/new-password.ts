"use server";

import { NewPasswordSchema } from "@/Schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Token is required!" };

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { password } = validateFields.data;
  const exitingToken = await getPasswordResetTokenByToken(token);

  if (!exitingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(exitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(exitingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: exitingToken.id },
  });
  return { success: "Password updated!" };
};
