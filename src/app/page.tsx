import Chat from "@/components/Chat";
import { run } from "@/scripts";

export default async function Home() {
  // const generateIndexing = await run();
  // console.log("[GENERATE_INDEXING_RUN]", generateIndexing);

  return (
    <div className="bg-gray-100 flex flex-col h-full">
      <Chat />
    </div>
  );
}
