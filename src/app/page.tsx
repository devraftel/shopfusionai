import DummyStoreAPIList from "@/components/DummyStoreAPIList";
import StoreApiInput from "@/components/StoreApiInput";
import { Button } from "@/components/ui/button";
import { run } from "@/scripts";
import { Copy } from "lucide-react";
import { cookies } from "next/headers";

export default function Home() {
  // const generateIndexing = await run();
  // console.log("[GENERATE_INDEXING_RUN]", generateIndexing);

  const api = cookies().get("storeApi")?.value || "";

  return (
    <div className="flex flex-col h-full items-center py-6 md:py-8 px-4 md:px-6  container max-w-7xl mx-auto">
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-center ">
        Meet ShopFusionAI, your new shopping buddy with a flair for fun! Gone
        are the days of endless browsing and tedious checkouts. With
        ShopFusionAI, you'll enjoy personalized suggestions, image-based
        searches, and a seamless checkout experience that's almost as exciting
        as unboxing your delivery. Whether you're on the hunt for the perfect
        gadget or outfitting your entire home, ShopFusionAI turns shopping into
        an adventure. It's not just shopping; it's retail reimagined, all with a
        wink and a smile. Get ready to shop like never before! 🛒🎉
      </p>

      <StoreApiInput>Store_API_Key: {api}</StoreApiInput>

      <DummyStoreAPIList />
    </div>
  );
}
