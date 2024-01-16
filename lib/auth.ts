import { auth } from "@/auth";

export const currentUser = async () => {
  try {
    const session = await auth();
    return session?.user;
  } catch (error) {
    console.error("Error retrieving current user:", error);
    return null;
  }
};

export const currentRole = async () => {
  try {
    const session = await auth();
    return session?.user?.role;
  } catch (error) {
    console.error("Error retrieving current role:", error);
    return null;
  }
};
