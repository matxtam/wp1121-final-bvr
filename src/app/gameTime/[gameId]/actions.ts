"use server"
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { playersTable, gamePerformancesTable } from "@/db/schema";

export const createPerformance = async (playerName: string, gameId: string, periodId: string) => {
    console.log("[createPerformance]");
    const AddPlayerId = await db
    .select({displayId: playersTable.displayId})
    .from(playersTable)
    .where(and(eq(playersTable.name, playerName), eq(playersTable.useable, true)))
    .execute();

    if (!AddPlayerId || AddPlayerId[0].displayId.length === 0) {
        throw new Error("Player not found or not useable");
        return;
    }
    if (!gameId || !periodId ||gameId === "" || periodId === "") {
        throw new Error("gameId or periodId is empty");
        return;
    }
    const [{newPerformanceId}] = await db
    .insert(gamePerformancesTable)
    .values({
        playerId: AddPlayerId[0].displayId,
        gameId,
        periodId,
        nowPlay: false,
    })
    .returning({
        newPerformanceId: gamePerformancesTable.displayId,
    })
    .execute();

    return newPerformanceId;
}


export const getGamePerformances = async (gameId: string, periodId: string) => {
    console.log("[getGamePerformances]");

    const gamePerformances = await db
    .select({
        displayId: gamePerformancesTable.displayId,
        playerId: gamePerformancesTable.playerId,
        gameId: gamePerformancesTable.gameId,
        periodId: gamePerformancesTable.periodId,
        nowPlay: gamePerformancesTable.nowPlay,
        twoPt: gamePerformancesTable.twoPt,
        inTwoPt: gamePerformancesTable.inTwoPt,
        threePt: gamePerformancesTable.threePt,
        inThreePt: gamePerformancesTable.inThreePt,
        ft: gamePerformancesTable.ft,
        inFt: gamePerformancesTable.inFt,
        foul: gamePerformancesTable.foul,
        steal: gamePerformancesTable.steal,
    })
    .from(gamePerformancesTable)
    .where(and(eq(gamePerformancesTable.gameId, gameId), eq(gamePerformancesTable.periodId, periodId)))
    .execute();

    return gamePerformances;
}