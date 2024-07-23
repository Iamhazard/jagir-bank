import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { UserRole } from "@prisma/client";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmations";
import { getAccountByUserId } from "./data/account";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //console.log(" account form auth", account);
      //Allow Oauth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user?.id as string);

      //prevent sign in without email verification

      if (!existingUser?.emailVerified) {
        return false;
      }

      //@fA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;
      }

      return true;
    },

    async session(params) {
      const { session, token} = params as any;
      // console.log({ sessionToken: token }); 
      try {
         if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.lastName=token.lastName;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
      } catch (error) {
         console.error("Error setting session:", error);
        return session;
      }
     
    },
    async jwt({ token }) {
      try {
        token.exp = Math.floor(Date.now() / 1000) + (60 * 60 * 24) 

      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.lastName = existingUser.lastName;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      //console.log({token}fan)
      return token;
      } catch (error) {
        console.error("Error updating JWT token:", error);
        return token;
      }
      
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});