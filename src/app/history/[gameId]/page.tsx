import { db } from "@/db";
import { eq } from "drizzle-orm";
import { gamesTable, gamePerformancesTable } from "@/db/schema";
import HistoryTable from "./_components/HistoryTable";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";


import Image from "next/image";

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
  }

  return (<>
    <aside className="flex flex-col items-center h-screen w-1/5 bg-indigo-100">
      <figure>
        <Image 
          src="/gift.jpg"
          alt="group image"
          width={200}
          height={200}
          priority>
        </Image>
      </figure>
      <div className="flex flex-row">
        <p>{games.date?.toString()}</p>
        <span>{games.hashtag}</span>
      </div>
      <a>youtube link</a>
    </aside>
    <section className="flex flex-col items-center w-4/5">
      <h2 className="px-12 pt-6">{games.title}</h2>
      <HistoryTable playersOfTheGame={playersOfTheGame}></HistoryTable>
    </section>
  </>)
}