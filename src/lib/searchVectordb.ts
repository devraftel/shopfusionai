import { PineconeClient } from "@pinecone-database/pinecone";
import { getProducts } from "./searchStore";

export const searchVectordb = async (vector: number[]) => {
  await getProducts();

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
