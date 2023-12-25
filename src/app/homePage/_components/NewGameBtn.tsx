
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
type NewGameBtnProps = {
  className?: string;
}

export default function NewGameBtn({className}:NewGameBtnProps) {


  return (
    <Dialog>
      <DialogTrigger className={className && ""} asChild>
        <Button>
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