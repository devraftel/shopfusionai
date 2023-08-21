import Link from "next/link";
import { cookies } from "next/headers";
import Balancer from "react-wrap-balancer";
import { Montserrat } from "next/font/google";

import { run } from "@/scripts";
import { cn } from "@/lib/utils";
import StoreApiInput from "@/components/StoreApiInput";
import DummyStoreAPIList from "@/components/DummyStoreAPIList";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function Home() {
  const api = cookies().get("storeApi")?.value || "";

  return (
    // <div className="flex flex-col h-full items-center  justify-center py-6 md:py-8 px-4 md:px-6  container max-w-7xl mx-auto">
    <div className="flex flex-col min-h-screen items-center justify-center py-4 px-2 container max-w-7xl mx-auto sm:py-6 sm:px-4 md:py-8 md:px-6">
      <Link href="/">
        <h1
          className={cn(
            // "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-gray-800 ",
            "scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-gray-800",
            montserrat.className
          )}
        >
          ShopFusionAI
        </h1>
      </Link>
      {/* <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-center "> */}
      <p className="leading-7 mt-2 text-sm sm:text-base lg:text-lg text-center ">
        <Balancer>
          Meet ShopFusionAI, your new shopping buddy with a flair for fun! Gone
          are the days of endless browsing and tedious checkouts. With
          ShopFusionAI, you&apos;ll enjoy personalized suggestions, image-based
          searches, and a seamless checkout experience that&apos;s almost as
          exciting as unboxing your delivery. Get ready to shop like never
          before! 🛒🎉
        </Balancer>
      </p>

      <StoreApiInput>Active_Store_API: {api}</StoreApiInput>

      <DummyStoreAPIList />
    </div>
  );
}
