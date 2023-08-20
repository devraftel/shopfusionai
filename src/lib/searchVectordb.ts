import { PineconeClient } from "@pinecone-database/pinecone";

export const searchVectordb = async (vector: number[]) => {
  const pine = new PineconeClient();
  await pine.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  const index = pine.Index("chat-test");
  const match = await index.query({
    queryRequest: {
      topK: 3,
      vector,
      includeMetadata: true,
      namespace: "y",
    },
  });

  return match.matches;
};
