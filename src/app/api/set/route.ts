import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { run } from "@/scripts";
import { extractMetadataKeys, getIndexNameFromUrl } from "@/lib/utils";

export const POST = async (req: Request) => {
  const cookie = cookies();
  const body = await req.json();

  cookies().delete('storeApi')
  cookies().delete('storeApiIndex')

  const { storeApi } = body;

  cookie.set("storeApi", storeApi);

  const storeApiIndex = getIndexNameFromUrl(storeApi)

  cookie.set("storeApiIndex", storeApiIndex);

  const generateIndexing = await run();
  console.log("[GENERATE_INDEXING_RUN]", generateIndexing);

  // const response = await fetch(storeApi);
  // const products = (await response.json()) as any[];

  // const metadataKeys = extractMetadataKeys(products[0]);

  // cookie.set("metadataKeys", JSON.stringify(metadataKeys));

  return NextResponse.json("ok", { status: 200 });
};
