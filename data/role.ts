import { db } from "@/lib/db";

export const getUserRoleByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email },select:{role:true} });
    //console.log({user})
    return user?.role || null;
    
  } catch (error) {
    console.log(error)
  }
    return null;
    
};