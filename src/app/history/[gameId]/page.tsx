import { db } from "@/db";
import { eq, asc } from "drizzle-orm";
import { gamesTable, gamePerformancesTable, periodsTable } from "@/db/schema";

import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { revalidatePath } from "next/cache";

import React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";

import HistoryTable from "./_components/HistoryTable";
import YtLink from "./_components/YtLink";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import UploadPhoto from "./_components/UploadPhoto";

export default async function ({ params }:{ params: { gameId:string } }){
  const playersOfTheGame = await db.query.gamePerformancesTable.findMany({
    with: {
      player: true,
    },
    where: eq(gamePerformancesTable.gameId, params.gameId),
  })
  const games = await db.query.gamesTable.findFirst({
    where: eq(gamesTable.displayId, params.gameId)
  })
  if (!games){
    alert("The game does not exist (but why?)");
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/homePage`);
    return;
  }
  const periods = await db.query.periodsTable.findMany({
    where: eq(periodsTable.gameId, games.displayId),
    orderBy: asc(periodsTable.number),
  });


  const handleSave = async (link:string) => {
    "use server";
    await db
      .update(gamesTable)
      .set({ video: link })
      .where(eq(gamesTable.displayId, games.displayId));
    revalidatePath(`/history/${params.gameId}`);
  }

  return (<>
    <aside className="flex flex-col items-center h-screen w-1/5 bg-secondary">
      <figure>
      </figure>
        <UploadPhoto gameId={games.displayId} photo={games.photo}/>
      <div className="flex flex-row">
        <p>{games.date?.toString()}</p>
        <span>{games.hashtag}</span>
      </div>
      <YtLink link={games.video ?? ""} handleSave={handleSave}/>
      <p>Results</p>
      <div className="grid grid-cols-3">
        <p className="col-start-2">We</p>
        <p>opponent</p>
        {periods.map(period => (<React.Fragment key={period.displayId}>
          <p>{(period.number === "OT") ? "OT":`P${period.number}`}</p>
          <p>{period.totalScore}</p>
          <p>{period.totalOpScore}</p>
        </React.Fragment>))}
        <p className="font-bold">total</p>
        <p className="font-bold">{games.totalScore}</p>
        <p className="font-bold">{games.totalOpScore}</p>
        <Crown className={cn("col-start-3", (games.totalScore >= games.totalOpScore) && "col-start-2")}></Crown>
      </div>
    </aside>
    <section className="flex flex-col items-center w-4/5">
      <h2 className="px-12 pt-6">{games.title}</h2>
      <HistoryTable playersOfTheGame={playersOfTheGame}></HistoryTable>
    </section>
  </>)
}