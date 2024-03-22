import OpenAI from "openai";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (!apiKey) {
  throw Error("OPENAI_API_KEY is not a key");
}

const openai = new OpenAI({ apiKey });

export default openai;

export async function getMessageEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: "Your text string goes here",
    encoding_format: "float",
  });

  const embedding = response.data[0].embedding;

  if (!embedding) throw Error("Error generating embedding.");

  console.log(embedding);

  return embedding;
}
