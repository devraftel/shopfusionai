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
    // // <div className="flex flex-col h-full items-center  justify-center py-6 md:py-8 px-4 md:px-6  container max-w-7xl mx-auto">
    // <div className="flex flex-col min-h-screen items-center justify-center py-4 px-2 container max-w-7xl mx-auto sm:py-6 sm:px-4 md:py-8 md:px-6">
    //   <Link href="/">
    //     <h1
    //       className={cn(
    //         // "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-gray-800 ",
    //         "scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-gray-800",
    //         montserrat.className
    //       )}
    //     >
    //       ShopFusionAI
    //     </h1>
    //   </Link>
    //   {/* <p className="leading-7 [&:not(:first-child)]:mt-6 text-lg text-center "> */}
    //   <p className="leading-7 mt-2 text-sm sm:text-base lg:text-lg text-center ">
    //     <Balancer>
    //       Meet ShopFusionAI, your new shopping buddy with a flair for fun! Gone
    //       are the days of endless browsing and tedious checkouts. With
    //       ShopFusionAI, you&apos;ll enjoy personalized suggestions, image-based
    //       searches, and a seamless checkout experience that&apos;s almost as
    //       exciting as unboxing your delivery. Get ready to shop like never
    //       before! 🛒🎉
    //     </Balancer>
    //   </p>

    //   <StoreApiInput>Active_Store_API: {api}</StoreApiInput>

    //   <DummyStoreAPIList />
    // </div>

    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 container">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-gray-800">
            Shop Fusion AI.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {/* <Balancer> */}
            Meet ShopFusionAI, your new shopping buddy with a flair for fun!
            Gone are the days of endless browsing and tedious checkouts. With
            ShopFusionAI, you&apos;ll enjoy personalized suggestions,
            image-based searches, and a seamless checkout experience that&apos;s
            almost as exciting as unboxing your delivery. Get ready to shop like
            never before! 🛒🎉
            {/* </Balancer> */}
          </p>
        </div>
        <StoreApiInput>Active_Store_API: {api}</StoreApiInput>
        <DummyStoreAPIList />
      </section>
    </>
  );
}
