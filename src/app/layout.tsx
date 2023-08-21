import "./globals.css";
import type { Metadata } from "next";

import Chat from "@/components/Chat";

import { Urbanist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopFusionAI",
  description: "Autonomous Shopping AI Expert Chat Bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-gradient-to-r from-zinc-50 to-zinc-100",
          urbanist.className
        )}
      >
        <Toaster />
        <Chat />
        {children}
      </body>
    </html>
  );
}
