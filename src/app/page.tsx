import Chat from "@/components/Chat";
import { run } from "@/scripts";

export default async function Home() {
  // const generateIndexing = await run();
  // console.log("[GENERATE_INDEXING_RUN]", generateIndexing);

  return (
    <div className="flex flex-col h-full items-center py-4 md:py-6 px-4 md:px-6  container max-w-7xl mx-auto ">
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-center ">
        Ai Shopping Expert tends to be a shopping expert for you. It will help
        you to find the best product for you. It will also help you to find the
        best price for the product you want to buy.
      </p>
    </div>
  );
}
