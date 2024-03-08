import { db } from "@/lib/db";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    //console.log({user})
    return user;
    
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return null;
  }
};

export const getAllUserEmail = async (email: string) => {
  try {
    const user = await db.user.findMany({ where: { email } });
    console.log({user})
    return user;
  } catch (error) {
    console.error("Error fetching users by email:", error);
    return null;
  }
};
