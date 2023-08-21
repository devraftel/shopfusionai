import "./globals.css";
import type { Metadata } from "next";

import Chat from "@/components/Chat";

import { Urbanist } from "next/font/google";

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
      <body className={urbanist.className}>
        <Chat />
        <div className="h-full w-full bg-gradient-to-r from-zinc-50 to-zinc-100">
          {children}
        </div>
      </body>
    </html>
  );
}
