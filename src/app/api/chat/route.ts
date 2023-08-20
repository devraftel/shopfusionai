import {
  ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { searchStore } from "@/lib/searchStore";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
export const runtime = "edge";

import weaviate from "weaviate-ts-client";

// Initialize Wealivite
const client = (weaviate as any).client({
  scheme: process.env.WEAVIATE_SCHEME || "https",
  host: process.env.WEAVIATE_HOST || "localhost",
  apiKey: new (weaviate as any).ApiKey(
    process.env.WEAVIATE_API_KEY || "default"
  ),
  headers: { 'X-OpenAI-Api-Key': `${process.env.OPENAI_API_KEY}` }
});

const apiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(apiConfig);

export async function POST(req: Request) {
  // await addProducts();

  try {
    const body = await req.json();
    const { messages } = body;

    const systemMessage: ChatCompletionRequestMessage = {
      content:
        "You are an ecommerce AI chatbot that can search a shopify store. You always reply with search results in markdown format. You always includes product name, description, image and price for each item. Be as concise aas possible to fit infomation on small screen. ",
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
          console.log('[ORIGINAL_QUERY]', query);

          // const embedding = await generateEmbedding(query);
          // console.log('[QuERY_EMBEDDING]', embedding);

          // Create a store from existing index
          // Create a store for an existing index
          const store = await WeaviateStore.fromExistingIndex(new OpenAIEmbeddings(), {
            client,
            indexName: "Products",
            metadataKeys: ["price", "description", "category", "image"],
          });

          // Search the index without any filters
          const products = await store.similaritySearch(query as string, 1);
          console.log('[SIMILARIT_SEARCH]', products);


          // const products = await searchStore(query as string);

          return openai.createChatCompletion({
            model: "gpt-3.5-turbo-0613",
            stream: true,
            messages: [
              systemMessage,
              ...messages,
              ...createFunctionMessages({
                // products,
                products: JSON.stringify(products),
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

// async function generateEmbedding(_input: any) {
//   const input = _input.replace(/\n/g, " ");
//   const embeddingResponse = await openai.createEmbedding({
//     model: "text-embedding-ada-002",
//     input,
//   });

//   const embeddingData = await embeddingResponse.json();

//   if (embeddingData.data) {
//     const [{ embedding }] = (embeddingData as any).data;
//     return embedding;
//   }

//   throw new Error("No Embedding generated.");
// }
