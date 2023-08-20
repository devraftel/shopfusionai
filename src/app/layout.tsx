import "./globals.css";
import type { Metadata } from "next";

import Chat from "@/components/Chat";
import Navbar from "@/components/Navbar";

import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Shopping Expert",
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
        <Navbar />
        <div className="pt-16 h-full w-full">{children}</div>
      </body>
    </html>
  );
}
