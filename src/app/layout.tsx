import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import { Button } from "@/components/ui/button";
import { Users2 } from "lucide-react";

export const metadata: Metadata = {
  title: "BVR",
  description: "App for recording basketball games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <header className={"fixed h-20 flex flex-row justify-between items-center px-12 w-full bg-indigo-300"}>
          <h1>
            We Need a Brand Name
          </h1>
          <Button variant="outline" className="rounded-full w-12 h-12 border-2 border-black">
            <Users2 size={20} strokeWidth={2}></Users2>
          </Button>
        </header>
        <main className="fixed top-20 w-full">
        {children}
        </main>
      </body>
    </html>
  );
}
