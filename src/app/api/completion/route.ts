// import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = "edge";

// export async function POST(req: Request) {
//   const { prompt } = await req.json();

//   // Ask OpenAI for a streaming completion given the prompt
//   const response = await openai.completions.create({
//     model: "text-davinci-003",
//     stream: true,
//     temperature: 0.6,
//     max_tokens: 300,
//     prompt: `Create three slogans for a business with unique features.

//   Business: Bookstore with cats
//   Slogans: "Purr-fect Pages", "Books and Whiskers", "Novels and Nuzzles"
//   Business: Gym with rock climbing
//   Slogans: "Peak Performance", "Reach New Heights", "Climb Your Way Fit"
//   Business: ${prompt}
//   Slogans:`,
//   });
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { searchStore } from "@/lib/searchStore";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    // Request the OpenAI API for a streaming completion given the prompt and messages
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0614",
      stream: true,
      messages: messages,
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
          const products = await searchStore(query as string);

          return openai.createChatCompletion({
            model: "gpt-3.5-turbo-0614",
            stream: true,
            messages: [
              ...messages,
              ...createFunctionMessages({
                products: JSON.stringify(products),
              }),
            ],
          });
        }
      },
    });
  } catch (error) {
    console.log("API_ERROR_EDGE", (error as { message: string }).message);
  }
}
