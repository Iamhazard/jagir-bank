import { NextResponse } from 'next/server';
import getCurrentUser from '@/actions/getCurrentUser';
import { db } from '@/lib/db';

interface IParams {
  userId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { userId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingUser = await db.user.findUnique({
      where: { id: userId },
      include: {
        clientProfile: {
          include: {
            Jobs: true,
          },
        },
        conversations: true,
        messages: true, 
      },
    });

    if (!existingUser) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    await db.$transaction(async (tx) => {
    
     await Promise.all(
  existingUser.clientProfile.map((profile) =>
    Promise.all(
      profile.Jobs.map((job) =>
        tx.job.delete({ where: { id: job.id } })
      )
    )
  )
);

      await tx.conversation.deleteMany({
        where: { id: { in: existingUser.conversationIds } },
      });

      
     const messageIds = existingUser.messages.map((message) => message.id);
      await tx.message.deleteMany({
        where: { id: { in: messageIds } },
      });

      
      await tx.clientProfile.deleteMany({ where: { userId } });

      await tx.user.delete({ where: { id: userId } });
    });

    return NextResponse.json({ message: 'User and related records deleted successfully' });
  } catch (error) {
    console.log(error, 'Error on delete');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}