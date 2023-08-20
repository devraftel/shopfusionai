import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  const cookie = cookies();
  const body = await req.json();
  const { storeApi } = body;

  cookie.set("storeApi", storeApi);

  return NextResponse.json("ok", { status: 200 });
};
