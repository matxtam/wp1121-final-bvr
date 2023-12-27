"use server"
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { playersTable, gamePerformancesTable, GamePerformanceRelations, gamesTable } from "@/db/schema";
import { GamePerformance } from '@/lib/types/db';
import { revalidatePath } from "next/cache";

export const createPerformance = async (playerName: string, gameId: string) => {
    console.log("[createPerformance]");
    const AddPlayerId = await db
    .select({displayId: playersTable.displayId})
    .from(playersTable)
    .where(and(eq(playersTable.name, playerName), eq(playersTable.useable, true)))
    .execute();
    console.log("AddPlayerId",AddPlayerId);

    if (!AddPlayerId || AddPlayerId.length === 0) {
        // alert("Player not found or not useable");
        // throw new Error("Player not found or not useable");
        const newPerformanceId = "0"
        return newPerformanceId;
    }
    const allPlayerInGame = await db
    .select({playerId: gamePerformancesTable.playerId})
    .from(gamePerformancesTable)
    .where(eq(gamePerformancesTable.gameId, gameId))
    .execute();

    if (allPlayerInGame.length > 0) {
        for (let i = 0; i < allPlayerInGame.length; i++) {
            if (allPlayerInGame[i].playerId === AddPlayerId[0].displayId) {
                const newPerformanceId = "1"
                return newPerformanceId;
            }
        }
    }


    if (!gameId ||gameId === "" ) {
        throw new Error("gameId is empty");
        return;
    }

    const [{newPerformanceId}] = await db
    .insert(gamePerformancesTable)
    .values({
        playerId: AddPlayerId[0].displayId,
        gameId: gameId,
    })
    .returning({
        newPerformanceId: gamePerformancesTable.displayId,
    })
    .execute();
    revalidatePath(`http://localhost:3000//gametimes/${gameId}`);
    return newPerformanceId;
}


export const getGamePerformances = async (gameId: string) => {
    console.log("[getGamePerformances]");
    const gamePerformances= await db.query.gamePerformancesTable.findMany({
        where: (eq(gamePerformancesTable.gameId, gameId)),
        with:{
            player:{
                columns:{
                    name: true,
                    number: true,
                }
            }
        }
    });
    return gamePerformances;
    // const gamePerformances = await db
    // .select(
    //     {
    //     id: gamePerformancesTable.id,
    //     displayId: gamePerformancesTable.displayId,
    //     playerId: gamePerformancesTable.playerId,
    //     gameId: gamePerformancesTable.gameId,
    //     periodId: gamePerformancesTable.periodId,
    //     nowPlay: gamePerformancesTable.nowPlay,
    //     twoPt: gamePerformancesTable.twoPt,
    //     inTwoPt: gamePerformancesTable.inTwoPt,
    //     threePt: gamePerformancesTable.threePt,
    //     inThreePt: gamePerformancesTable.inThreePt,
    //     ft: gamePerformancesTable.ft,
    //     inFt: gamePerformancesTable.inFt,
    //     foul: gamePerformancesTable.foul,
    //     steal: gamePerformancesTable.steal,
    //     block: gamePerformancesTable.block,
    //     assist: gamePerformancesTable.assist,
    //     defReb: gamePerformancesTable.defReb,
    //     offReb: gamePerformancesTable.offReb,
    //     turnover: gamePerformancesTable.turnover,
    //     point: gamePerformancesTable.point,
    // })
    // .from(gamePerformancesTable)
    // .where(and(eq(gamePerformancesTable.gameId, gameId), eq(gamePerformancesTable.periodId, periodId)))
    // .execute();
    // return gamePerformances;
}

export const updateGamePerformance = async (selectedItem:string , performanceId:string , change:number, periodId:string) => {
    console.log("[updateGamePerformance]");
    console.log("selectedItem",selectedItem);
    if (selectedItem === "twoPt" && change === 1) {
        // Fetch the current value from the database
        const currentTwoPtResult = await db
          .select({ twoPt: gamePerformancesTable.twoPt })
          .from(gamePerformancesTable)
          .where(eq(gamePerformancesTable.displayId, performanceId))
          .execute();
        const currentTwoPt = currentTwoPtResult[0]?.twoPt ?? 0;
        // Increment the value by 1
        const newNum = currentTwoPt + 1;
        console.log('newNum',newNum)
        // Update the game performance
        await db
          .update(gamePerformancesTable)
          .set({
            twoPt: newNum,
          })
          .where(eq(gamePerformancesTable.displayId, performanceId))
          .execute();
      }
      
    return updateGamePerformance;
}

export const finishGame = async (gameId: string, totalScore:number) => {
    await db
        .update(gamesTable)
        .set({
            totalScore: totalScore,
        })
        .where(
            eq(gamesTable.displayId, gameId)
        )
        .execute();
    return finishGame;
}

// const oldNum = await db.select({
    //     : gamePerformancesTable.`${selectedItem}` 
    // })
    // const oldNumResult = await db.execute(sql` select ${selectedItem} from game_performances where display_id = ${performanceId} `);
    // console.log("oldNumResult",oldNumResult);
    // .select({ `${selectedItem}`: gamePerformancesTable.`${selectedItem}` })
    // .from(gamePerformancesTable)
    // .where(eq(gamePerformancesTable.displayId, performanceId))
    // .execute();  


     // if(selectedItem==="twoPT" && change===1){
    //     let newNum = gamePerformancesTable.twoPt + 1
    //     db.update(gamePerformancesTable)
    //     .set({
    //         twoPt: newNum,
    //     })
    //     .where(eq(gamePerformancesTable.displayId, performanceId))
    //     .execute();
    // }