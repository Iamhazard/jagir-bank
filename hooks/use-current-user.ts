import UsersTable from "@/Components/admin/dashbaord/UsersTable";
import { db } from "@/lib/db";
import { PrismaClient } from "@prisma/client";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  //console.log({ session });
  return session.data?.user;
};

export const getAllUser = async () => {

  try {
    const users = await db.user.findMany();

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return null;
  }
};



