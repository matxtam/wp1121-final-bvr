import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Users2 } from 'lucide-react';
import SignOutButton from "./homePage/_components/SignOutButton";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 flex flex-col h-screen overflow-hidden">
          <SessionProvider>
          <header className="flex flex-row justify-between items-center px-8 py-4 w-full bg-indigo-300">
            <h1 className="text-2xl font-bold">
              <Link href="/homePage">
                We Need a Brand Name
              </Link>
            </h1>
            <SignOutButton />
            <Link href="/settings">
              <Button variant="outline" className="rounded-full w-12 h-12 p-0 border-4">
                <Users2 size={20} strokeWidth={2} color="#ffffff"></Users2>
              </Button>
            </Link>
          </header>

          {children}

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
