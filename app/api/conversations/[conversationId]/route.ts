
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";


interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
 try {
   const {conversationId}=params;

   const currentUser=await getCurrentUser()


    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation=await db .conversation.findUnique({
        where:{
            id:conversationId
        },
        include:{
            users:true
        }
    })

      if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await db.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        },
      },
    });

    existingConversation.users.forEach((user)=>{
      if(user.email){
        pusherServer.trigger(user.email,'conversation:remove',existingConversation)
      }
    })

    return NextResponse.json(deletedConversation)
    
 } catch (error) {
    console.log(error,"Error_on_delete")
    return NextResponse.json(null);
 }

}
