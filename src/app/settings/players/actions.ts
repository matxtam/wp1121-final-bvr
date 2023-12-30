"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { playersTable, usersToPlayersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import type { Player, User } from "@/lib/types/db";

const createPlayerSchema = z.object({
  name: z.string().min(1).max(100),
  number: z.string().min(1).max(100),
  position: z.string().min(1).max(100),
});

export async function createPlayer(
  name: Player["name"],
  // photo: Player["photo"],
  number: Player["number"],
  position: Player["position"],
) {
  "use server";
  // Check if user is logged in
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  try {
    createPlayerSchema.parse({
      name: name,
      number: number,
      position: position,
    });
  } catch (error) {
    throw new Error(
      "Player name is required and must be less than 100 chars.",
    );
  }

  const newPlayer: Player = await db.transaction(async (trx) => {
    const [createdPlayer] = await trx
      .insert(playersTable)
      .values({
        name: name,
        // photo: photo,
        number: number,
        position: position,
      })
      .returning();
    const playerId = createdPlayer.displayId;

    await trx.insert(usersToPlayersTable).values({
      userId: userId,
      playerId: playerId,
    });

    return {
      id: createdPlayer.id,
      displayId: playerId,
      name: createdPlayer.name,
      photo: createdPlayer.photo,
      number: createdPlayer.number,
      position: createdPlayer.position,
      usable: createdPlayer.usable,
      personalValue: createdPlayer.personalValue,
      personal2pt: createdPlayer.personal2pt,
      personalIn2pt: createdPlayer.personalIn2pt,
      personal3pt: createdPlayer.personal3pt,
      personalIn3pt: createdPlayer.personalIn3pt,
      personalFt: createdPlayer.personalFt,
      personalInFt: createdPlayer.personalInFt,
      personalDefReb: createdPlayer.personalDefReb,
      personalOffReb: createdPlayer.personalOffReb,
      personalSteal: createdPlayer.personalSteal,
      personalAssist: createdPlayer.personalAssist,
    };
  });

  revalidatePath(`/settings`);
  return newPlayer;
}

// delete player
const deletePlayerSchema = z.object({
  playerId: z.string(),
});

export async function deletePlayer(playerId: string) {
  deletePlayerSchema.parse({
    playerId,
  });

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  await db
    .delete(usersToPlayersTable)
    .where(
      and(
        eq(usersToPlayersTable.playerId, playerId),
        eq(usersToPlayersTable.userId, userId),
      ),
    )
    .returning();

  revalidatePath(`/settings`);
}


// update player
const updatePlayerSchema = z.object({
  playerId: z.string(),
  name: z.string().min(1).max(100),
  photo: z.string().min(1),
  number: z.string().min(1).max(100),
  position: z.string().min(1).max(100),
});

export async function updatePlayer(
  playerId: string,
  name: Player["name"],
  photo: Player["photo"],
  number: Player["number"],
  position: Player["position"],
) {
  // Check if user is logged in
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }  

  // Validate input
  try {
    updatePlayerSchema.parse({
      playerId: playerId,
      name: name,
      photo: photo,
      number: number,
      position: position,
    });
  } catch (error) {
    throw new Error(
      "Player name is required and must be less than 100 chars.",
    );
  }

  const updatedPlayer: Player = await db.transaction(async (trx) => {
    const [updatedPlayer] = await trx
      .update(playersTable)
      .set({
        name: name,
        photo: photo,
        number: number,
        position: position,
      })
      .where(eq(playersTable.displayId, playerId))
      .returning();

    return {
      id: updatedPlayer.id,
      displayId: updatedPlayer.displayId,
      name: updatedPlayer.name,
      photo: updatedPlayer.photo,
      number: updatedPlayer.number,
      position: updatedPlayer.position,
      usable: updatedPlayer.usable,
      personalValue: updatedPlayer.personalValue,
      personal2pt: updatedPlayer.personal2pt,
      personalIn2pt: updatedPlayer.personalIn2pt,
      personal3pt: updatedPlayer.personal3pt,
      personalIn3pt: updatedPlayer.personalIn3pt,
      personalFt: updatedPlayer.personalFt,
      personalInFt: updatedPlayer.personalInFt,
      personalDefReb: updatedPlayer.personalDefReb,
      personalOffReb: updatedPlayer.personalOffReb,
      personalSteal: updatedPlayer.personalSteal,
      personalAssist: updatedPlayer.personalAssist,
    };
  });
  revalidatePath(`/settings`);
  return updatedPlayer;
}

export async function getPlayers(userId: User["id"]) {
  const temp = await db.query.usersToPlayersTable.findMany({
    where: eq(usersToPlayersTable.userId, userId),
    with: {
      player: {
        columns: {
          id: true,
          displayId: true,
          name: true,
          position: true,
          number: true,
          photo: true,
          usable: true,
          personalValue: true,
          personal2pt: true,
          personalIn2pt: true,
          personal3pt: true,
          personalIn3pt: true,
          personalFt: true,
          personalInFt: true,
          personalDefReb: true,
          personalOffReb: true,
          personalSteal: true,
          personalAssist: true,
        },
      },
    },
  });
  

  const players: Omit<Player, "id">[] = temp.map((item) => ({
    displayId: item.player.displayId,
    name: item.player.name,
    photo: item.player.photo,
    number: item.player.number,
    position: item.player.position,
    usable: item.player.usable,
    personalValue: item.player.personalValue,
    personal2pt: item.player.personal2pt,
    personalIn2pt: item.player.personalIn2pt,
    personal3pt: item.player.personal3pt,
    personalIn3pt: item.player.personalIn3pt,
    personalFt: item.player.personalFt,
    personalInFt: item.player.personalInFt,
    personalDefReb: item.player.personalDefReb,
    personalOffReb: item.player.personalOffReb,
    personalSteal: item.player.personalSteal,
    personalAssist: item.player.personalAssist,
  }))
  return players;
}
export async function getPlayersTwo(userId: User["id"]): Promise<Player[]> {
  const temp = await db.query.usersToPlayersTable.findMany({
    where: eq(usersToPlayersTable.userId, userId),
    with: {
      player: {
        columns: {
          id: true,
          displayId: true,
          name: true,
          position: true,
          number: true,
          photo: true,
          usable: true,
          personalValue: true,
          personal2pt: true,
          personalIn2pt: true,
          personal3pt: true,
          personalIn3pt: true,
          personalFt: true,
          personalInFt: true,
          personalDefReb: true,
          personalOffReb: true,
          personalSteal: true,
          personalAssist: true,
        },
      },
    },
  });
  
  // Extract the player objects from the result
  const allPlayer: Player[] = temp.map(item => item.player);

  return allPlayer;
}


// toggle player usable
export async function TogglePlayerUsable(
  playerId: string,
  usable: boolean,
  ) {
  // Check if user is logged in
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  } 
  // console.log("usable", usable);

  await db.transaction(async (trx) => {
    await trx
      .update(playersTable)
      .set({
        usable: usable,
      })
      .where(eq(playersTable.displayId, playerId))
      .returning();
  });
  revalidatePath(`/settings`);
}
