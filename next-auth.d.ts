import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  createdAt: string;
  lastName: string;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;

};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
