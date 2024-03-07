import { NextApiRequest, NextApiResponse } from "next"


import { pusherServer } from "@/lib/pusher";
import { auth } from "@/auth";


export default async function handler(
  request: NextApiRequest, 
  response: NextApiResponse
) {
  const session = await auth();
  //console.log("pages/pusher",session)

  if (!session?.user?.email) {
    return response.status(401);
  }

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return response.send(authResponse);
};