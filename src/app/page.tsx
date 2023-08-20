import StoreApiInput from "@/components/StoreApiInput";
import { cookies } from "next/headers";

export default function Home() {
  const api = cookies().get("storeApi")?.value || "";

  return (
    <div className="flex flex-col h-full items-center py-4 md:py-6 px-4 md:px-6  container max-w-7xl mx-auto ">
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-center ">
        Ai Shopping Expert tends to be a shopping expert for you. It will help
        you to find the best product for you. It will also help you to find the
        best price for the product you want to buy.
      </p>

      <StoreApiInput>Store API_Key: {api}</StoreApiInput>
    </div>
  );
}
