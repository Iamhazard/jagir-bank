"use server";

import { signOut } from "next-auth/react";

export const logout = async () => {
  try {
    await signOut({ redirect: false });
    return { success: true };
  } catch (error) {
    console.error("Logout failed:", error);
    return { success: false, error: "Logout failed" };
  }
};