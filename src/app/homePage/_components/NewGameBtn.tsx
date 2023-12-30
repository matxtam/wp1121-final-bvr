
import * as React from "react";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";

import { db } from "@/db";
import { gamesTable, periodsTable } from "@/db/schema";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

type NewGameBtnProps = {
  className?: string;
}

export default async function NewGameBtn({className}:NewGameBtnProps) {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  const user = session.user;
  const userId = user.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>
          <Plus/>
        </Button>
      </DialogTrigger>
      
      <DialogContent >
        <DialogTitle>Create a new game</DialogTitle>
        <form
          action={
            async (e) => {
              "use server";
              const title = e.get("title");
              const hashtag = e.get("hashtag");
              const [newGame] = await db
                .insert(gamesTable)
                .values({
                  title: title?.toString() ?? "",
                  photo: "",
                  hashtag: hashtag?.toString() ?? "",
                  totalScore: 0,
                  possession:"WE",
                  userId: userId,
                })
                .returning();
              
              const [{newPeriodId}]= await db
              .insert(periodsTable)
              .values({
                  gameId: newGame.displayId,
                  number: "1",
              })
              .returning({
                  newPeriodId: periodsTable.displayId,
                })
              .execute();
              await db
              .update(gamesTable)
              .set({
                  periodsNumber: 1,
              })
              .where(
                  eq(gamesTable.displayId, newGame.displayId)
              )
              // await db.insert(userToGameTable).values({
              //   userId: userId,
              //   gameId: newGame.displayId,
              // }).execute();

              const params = new URLSearchParams();
              params.set("URLperiodId", newPeriodId);
              redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/gameTime/${newGame.displayId}/?${params.toString()}`);
              // redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/gameTime/${newGame.displayId}`)
            }
          }
          className="flex flex-col gap-3"
        >
          <Input
            name="title"
            placeholder="Title..."
          ></Input>
          <Input
            name="hashtag"
            placeholder="hashtag..."
          ></Input>
          <Button type="submit">
            Go!
          </Button>
        </form>
      </DialogContent>
    </Dialog>)
}