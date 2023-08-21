import fetch from "node-fetch";
import weaviate from "weaviate-ts-client";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { cookies } from "next/headers";

export async function run() {

  const PRODUCTS_API = cookies().get("storeApi")?.value || "";
  console.log('[GENERATE_PRODUCTS_API]', PRODUCTS_API);

  const API_INDEX_NAME = cookies().get("storeApiIndex")?.value || "";
  console.log('[GENERATE_API_INDEX_NAME]', API_INDEX_NAME);


  console.log("Fetching products from API...");
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();


  console.log("Creating Weaviate client...");
  const client = (weaviate as any).client({
    scheme: process.env.WEAVIATE_SCHEME || "https",
    host: process.env.WEAVIATE_HOST || "localhost",
    apiKey: new (weaviate as any).ApiKey(process.env.WEAVIATE_API_KEY || "default"),
    headers: { "X-OpenAI-Api-Key": `${process.env.OPENAI_API_KEY}` },
  });

  console.log("Extracting texts and metadata from products...");

  const texts = products.map((product: any) => product.title);

  const metadata = products.map((product: any) => ({
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image ? product.image : product.images[0],
    rating: product.rating ? product.rating : 0,
  }));


  console.log("Attempting to access existing store...");
  let store;

  try {

    const storeExists = await client.schema.exists(API_INDEX_NAME);
    console.log('{EXIST???}', storeExists);

    if (storeExists) {
      console.log("Existing store found. Terminating operations.");
      return true;
    } else {
      console.log("Store not found. Creating a new one...");
      throw new Error(' No Store Found')
    }
  } catch (error) {
    console.log("Store not found. Creating a new one...");
    await WeaviateStore.fromTexts(
      texts,
      metadata,
      new OpenAIEmbeddings(),
      {
        client,
        indexName: API_INDEX_NAME,
        textKey: "text",
        metadataKeys: metadata,
      }
    );
    console.log('Store Created');
    return false;
  }
}
