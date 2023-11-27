// import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { playersTable } from "@/db/schema";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>This is a huge README of this App.</h2>
      <p className="text-gray-400">Not yet editted though</p>
      <Link href="/homePage">homePage link for test</Link>
      <Link href="/gameTime/07367510-3aa6-4bfd-bd57-74b7639d620c">gameTime link for test</Link>
      <form
        action = {
          async (e) => {
            "use server";
            // const res = await fetch("/api/player", {
            // //似乎需要輸入絕對url?總之在這裡不可用
            //   method: "POST",
            //   body: JSON.stringify({
            //     number: e.get("number"),
            //     name: e.get("name"),
            //     position: e.get("position"),
            //     photo: "",
            //   })
            // })
            // if (!res.ok) {
            //   const body = await res.json();
            //   throw new Error(body.error);
            // }
            try{
            await db.insert(playersTable)
              .values({
                number: e.get("number")?.toString() ?? "",
                name: e.get("name")?.toString() ?? "",
                position: e.get("position")?.toString() ?? "",
                photo: "",
              })
              .execute();
            } catch (error) {
              console.log(error);
            }
          }
        }
      >
        <Input name="number" placeholder="number"></Input>
        <Input name="name" placeholder="name"></Input>
        <Input name="position" placeholder="position"></Input>
        <Button type="submit">Create</Button>
      </form>
    </main>
  );
}
