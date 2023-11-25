// import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>This is a huge README of this App.</h2>
      <p className="text-gray-400">Not yet editted though</p>
      <Link href="/homePage">homePage link for test</Link>
      <Link href="/gameTime/07367510-3aa6-4bfd-bd57-74b7639d620c">gameTime link for test</Link>
    </main>
  );
}
