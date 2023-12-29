"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { gamesTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

const DeleteGameSchema = z.object({
    gameId: z.string(),
  });
  
  export async function DeleteGame(gameId: string) {
    DeleteGameSchema.parse({
      gameId,
    });
  
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
    }
  
    await db
      .delete(gamesTable)
      .where(
        and(
          eq(gamesTable.displayId, gameId),
          eq(gamesTable.userId, userId),
        ),
      )
      .returning();
  
    revalidatePath(`/homePage`);
  }
  