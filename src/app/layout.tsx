import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Nova_Square } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Users2 } from 'lucide-react';
import SignOutButton from "./homePage/_components/SignOutButton";
import "./globals.css";
import Link from "next/link";
import { auth } from "@/lib/auth";

const novaSquare = Nova_Square({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className={novaSquare.className}>
      <body className="flex flex-col h-screen w-screen overflow-hidden text-batra-100 bg-background select-none">
          <SessionProvider>
          <header className="flex flex-row justify-between items-center px-8 py-4 w-full bg-primary">
            <h1 className="text-4xl font-bold">
              {session?.user?.id && <Link href="/homePage">
                Batra
              </Link>}
              {!session?.user?.id && <Link href="/auth">
                Batra
              </Link>}
            </h1>
            <div className="flex flex-row items-center gap-3">
              <SignOutButton/>
              <Link href="/settings" className="flex items-center justify-center rounded-full w-12 h-12 p-0 border-4 hover:bg-accent hover:text-accent-foreground">
                <Users2 size={20} strokeWidth={2} color="#ffffff" className="transparent-50"></Users2>
              </Link>
            </div>
          </header>

          {children}

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
