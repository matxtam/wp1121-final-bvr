import { db } from "@/db";
import { eq, asc } from "drizzle-orm";
import { gamesTable, gamePerformancesTable, periodsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { revalidatePath } from "next/cache";

import React from "react";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils/shadcn";
import { Separator } from "@/components/ui/separator";

import HistoryTable from "./_components/HistoryTable";
import YtLink from "./_components/YtLink";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import UploadPhoto from "./_components/UploadPhoto";
import UploadPhotoButton from "./_components/UploadPhotoButton";

export default async function DZDZ({ params }:{ params: { gameId:string } }){
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session?.user) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
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
    <aside className="flex flex-col items-center w-1/5 p-6 bg-secondary gap-4">
      {/* <figure>
      </figure> */}
        {/* <UploadPhoto gameId={games.displayId} photo={games.photo}/> */}
      <div className="relative w-48 h-48">
        <Avatar className="w-48 h-48">
            <AvatarImage src={games.photo} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <UploadPhotoButton gameId={games.displayId} photo={games.photo}/>
      </div>
      
      <YtLink link={games.video ?? ""} handleSave={handleSave}/>
      
      <div className="items-center border-ring border-2 rounded-xl overflow-hidden">
      <p className="col-span-3 bg-ring text-secondary text-center h-min">Results</p>
        <div className="grid grid-cols-3 p-4 gap-x-4">
          <p className="col-start-2">We</p> <p>OP</p>
          <Separator className="col-span-3 bg-ring"/>
          {periods.map(period => (<React.Fragment key={period.displayId}>
            <p>{(period.number === "OT") ? "OT":`P${period.number}`}</p>
            <p>{period.totalScore}</p>
            <p>{period.totalOpScore}</p>
          </React.Fragment>))}
          <Separator className="col-span-3 bg-ring"/>
          <p className="font-bold">total</p>
          <p className="font-bold">{games.totalScore}</p>
          <p className="font-bold">{games.totalOpScore}</p>
          <Crown className={cn("col-start-3", (games.totalScore >= games.totalOpScore) && "col-start-2")}></Crown>
        </div>
      </div>
    </aside>

    <section className="flex flex-col items-center w-4/5 gap-6 overflow-y-scroll">
      <section className="flex justify-between items-center w-min px-24 pt-6 gap-12">
        <h2 className="text-2xl font-bold truncate overflow-ellipsis">{games.title}</h2>
        <div className="flex flex-row items-center justify-between w-min gap-2">
          <p className="truncate">{games.date?.toString()}</p>
          <p className="px-4 rounded-full bg-muted">{games.hashtag}</p>
        </div>
      </section>
      <HistoryTable playersOfTheGame={playersOfTheGame}></HistoryTable>
    </section>
  </>)
}