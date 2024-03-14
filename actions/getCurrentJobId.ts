import { auth } from "@/auth";
import { db } from "@/lib/db";

const getCurrentJobId = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    const currentUser = await db.clientProfile.findUnique({
      where: {
        id: session.user.id as string
      },include:{
        
      }
    });

    console.log("current clientProfile",{currentUser})

    if (!currentUser) {
      return null;
    }
    //console.log({currentUser})

    return currentUser;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentJobId;