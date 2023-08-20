import Link from "next/link";
import React from "react";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"] });

const Navbar = () => {
  return (
    <div className="flex  items-center justify-center py-2 px-4  shadow-md shadow-gray-200 fixed w-full h-16 bg-gray-700 bg-opacity-5">
      <Link href="/">
        <h1
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl leading-5 tracking-wide font-bold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-800 to-gray-800 ",
            montserrat.className
          )}
        >
          AI Shopping Expert
        </h1>
      </Link>
    </div>
  );
};

export default Navbar;
