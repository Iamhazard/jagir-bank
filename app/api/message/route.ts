import OpenAI from 'openai';
import { MessageArraySchema } from "@/Schemas";

import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { chatbotPrompt } from '@/helpers/constants/chatbot-prompt';


const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request:Request){
    
const {messages}=await request.json();
//console.log("messages",messages)

const parsedMessages=MessageArraySchema.parse(messages)
//console.log("parsed messages",parsedMessages)


//for sending to gpt

 const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? 'user' : 'system',
      content: message.text,
    }
  })
 //console.log(outboundMessages)


outboundMessages.unshift({
    role:'system',
    content: chatbotPrompt,
})



 const payload:OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  }


  const stream = await OpenAIStream(payload)
  //console.log(stream)

  return new  Response(stream)

}