
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


interface IParams {
  userId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
 try {
   const {userId}=params;

   const currentUser=await getCurrentUser()


    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existinguser=await db .user.findUnique({
        where:{
            id:userId
        },
        
    })

      if (!existinguser) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedUser = await db.user.deleteMany({
      where: {
        id: userId,
       
      },
    });

    

    return NextResponse.json(deletedUser)
    
 } catch (error) {
    console.log(error,"Error_on_delete")
    return NextResponse.json(null);
 }

}
