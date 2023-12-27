"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { eq, and } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import type { User } from "@/lib/types/db";

const updateUserSchema = z.object({
    name: z.string().min(1).max(100),
    photo: z.string().min(1),
    fbLink: z.string().min(1),
    igLink: z.string().min(1),
    ytLink: z.string().min(1),
    cloudLink: z.string().min(1),
  });

export async function updateUser(
    name: User["name"],
    photo: User["photo"],
    fbLink: User["fbLink"],
    igLink: User["igLink"],
    ytLink: User["ytLink"],
    cloudLink: User["cloudLink"],
  ) {
    // Check if user is logged in
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
    }
    //TODO: Validate input        
    const updatedUser: Omit<User, "id"> = await db.transaction(async (trx) => {
      const [updatedUser] = await trx
        .update(usersTable)
        .set({
          name: name,
          photo: photo,
          fbLink: fbLink,
          igLink: igLink,
          ytLink: ytLink,
          cloudLink: cloudLink,
          })
        .where(eq(usersTable.displayId, userId))
        .returning();
  
      return {
        // id: updatedUser.id,
        displayId: updatedUser.displayId,
        name: updatedUser.name,
        photo: updatedUser.photo,
        fbLink: updatedUser.fbLink,
        igLink: updatedUser.igLink,
        ytLink: updatedUser.ytLink,
        cloudLink: updatedUser.cloudLink,
        email: updatedUser.email,
        provider: updatedUser.provider,
      };
    });
    revalidatePath(`/settings`);
    return updatedUser;
  }
  