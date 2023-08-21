import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { NextRequest } from "next/server";

export const runtime = "edge";

import weaviate from "weaviate-ts-client";
import { PRODUCTS_STORE_URL } from "@/config";
import { cookies } from "next/headers";

// Initialize Wealivite
const client = (weaviate as any).client({
  scheme: process.env.WEAVIATE_SCHEME || "https",
  host: process.env.WEAVIATE_HOST || "localhost",
  apiKey: new (weaviate as any).ApiKey(
    process.env.WEAVIATE_API_KEY || "default"
  ),
  headers: { "X-OpenAI-Api-Key": `${process.env.OPENAI_API_KEY}` },
});

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: NextRequest) {
  const storeApi =
    req.cookies.get("storeApi")?.value.replace(/["\s]/g, "") ||
    PRODUCTS_STORE_URL;

  const API_INDEX_NAME = req.cookies.get("storeApiIndex")?.value || "Products";

  console.log('[API_INDEX_NAME]', API_INDEX_NAME);

  // const metadataKeysCookie = cookies().get("metadataKeys");
  // const metadataKeysString = metadataKeysCookie ? metadataKeysCookie.value : undefined;

  // let metadataKeys = metadataKeysString ? JSON.parse(metadataKeysString) : [];

  // metadataKeys = metadataKeys.filter((key: string) =>
  //   key !== 'id' &&
  //   key !== 'creationAt' &&
  //   key !== 'updatedAt' &&
  //   key !== 'title'
  // );

  // console.log('[INDEXING_METADATA_KEYS]', metadataKeys);

  try {
    const body = await req.json();

    const { messages } = body;

    const systemMessage: ChatCompletionRequestMessage = {
      content:
        "You are an ecommerce AI chatbot that can search a shopify store. You always reply with search results in markdown format. You always includes product name, description, image and price for each item. Be as concise aas possible to fit infomation on small screen. Do not return a product if it's not present in the Store. Instead make a soft apology ",
      role: "system",
    };

    // Request the OpenAI API for a streaming completion given the prompt and messages
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      stream: true,
      messages: [systemMessage, ...messages],
      functions: [
        {
          name: "search_products",
          description: "Searches for products in the catalog",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query",
              },
            },
            required: ["query"],
          },
        },
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      async experimental_onFunctionCall(
        { name, arguments: args },
        createFunctionMessages
      ) {
        if (name === "search_products") {
          const { query } = args;
          console.log("[ORIGINAL_QUERY]", query);

          // Create a store for an existing index
          const store = await WeaviateStore.fromExistingIndex(
            new OpenAIEmbeddings(),
            {
              client,
              indexName: API_INDEX_NAME,
              metadataKeys: ["price", "description", "category", "image"],
            }
          );

          // Search the index without any filters
          const products = await store.similaritySearch(query as string, 1);
          console.log("[SIMILARITY_SEARCH]", products);

          const buyNowData = {
            title: products[0]?.pageContent,
            description: products[0]?.metadata.category,
            price: products[0]?.metadata.price,
            image: products[0]?.metadata.image,
          }

          return openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            stream: true,
            messages: [
              systemMessage,
              // buyNowData,
              ...messages,
              ...createFunctionMessages({
                products: JSON.stringify(products),
                buyNowData
              }),
            ],
          });
        }
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("API_ERROR_EDGE", (error as { message: string }).message);
  }
}