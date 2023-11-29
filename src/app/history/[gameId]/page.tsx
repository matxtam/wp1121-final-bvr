import { db } from "@/db";
import { eq } from "drizzle-orm";
import { gamesTable, gamePerformancesTable } from "@/db/schema";

import Image from "next/image";

export default async function ({ params }:{ params: { gameId:string } }){
  const playersOfTheGame = await db.query.gamePerformancesTable.findMany({
    with: {
      players: true,
    },
    where: eq(gamePerformancesTable.gameId, params.gameId),
  })

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
        <p>date</p>
        <span>hashtag</span>
      </div>
      <a>youtube</a>
    </aside>
    <section className="flex flex-col items-center w-4/5">
      <h2>title</h2>
      <div className="grid">
      </div>
    </section>
  </>)
}