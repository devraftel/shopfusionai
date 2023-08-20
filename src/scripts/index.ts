import weaviate from "weaviate-ts-client";
import { WeaviateStore } from "langchain/vectorstores/weaviate";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import fetch from 'node-fetch';
import { PRODUCTS_STORE_URL } from "@/config";

interface Rating {
    rate: number;
    count: number;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}


export async function run() {
    // Fetch products from the API
    const response = await fetch(PRODUCTS_STORE_URL);
    const products = await response.json();

    // Create client
    console.log('CREATE_WEAVIATE_CLIENT');

    const client = (weaviate as any).client({
        scheme: process.env.WEAVIATE_SCHEME || "https",
        host: process.env.WEAVIATE_HOST || "localhost",
        apiKey: new (weaviate as any).ApiKey(
            process.env.WEAVIATE_API_KEY || "default"
        ),
        headers: { 'X-OpenAI-Api-Key': `${process.env.OPENAI_API_KEY}` }
    });

    // Extract texts and metadata from products
    const texts = products.map((product: Product) => product.title);

    console.log('TEXTs GENERATED');

    const metadata = products.map((product: Product) => ({
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating
    }));

    console.log('METADATAGENERATED');


    // Create a store and fill it with products' texts + metadata
    const createStore = await WeaviateStore.fromTexts(
        texts,
        metadata,
        new OpenAIEmbeddings(),
        {
            client,
            indexName: "Products",
            textKey: "text",
            metadataKeys: ["price", "description", "category", "image", "rating"],
        }
    );

    console.log('STATUS_EMBEDDING', createStore);

}
