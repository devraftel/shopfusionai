import { generateEmbedding } from "@/app/api/chat/route";
import { getProducts } from "@/lib/searchStore";
import { randomUUID } from "crypto";
import { PineconeClient } from "@pinecone-database/pinecone";

export const addProducts = async () => {
  const pinecone = new PineconeClient();

  await pinecone.init({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  const data = await getProducts();

  const products = data.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    image: product.image,
  }));

  const embedding: number[] = await generateEmbedding(products);

  await pinecone.createIndex({
    createRequest: {
      name: "chat-test",
      dimension: 1024,
    },
  });
};
