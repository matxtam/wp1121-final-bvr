"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import type { Game } from "@/lib/types/db";

const updateGamePhotoSchema = z.object({
    photo: z.string().min(1),
  });

export async function updateGamePhoto(
    gameId: string,
    photo: Game["photo"],
  ) {
    // Check if user is logged in
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
    }
    //TODO: Validate input        
    const updatedGame: Omit<Game, "id"|"date"|"displayId"|"title"|"video"|"hashtag"|"totalScore"|"totalOpScore"|"possession"|"periodsNumber"|"display"> = await db.transaction(async (trx) => {
      const [updatedGame] = await trx
        .update(gamesTable)
        .set({
          photo: photo,
          })
        .where(eq(gamesTable.displayId, gameId))
        .returning();
  
      return {
        photo: updatedGame.photo,
      };
    });
    revalidatePath(`/history`);
    return updatedGame;
  }
  