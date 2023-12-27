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
    photo: z.string().min(1).max(300),
    fbLink: z.string().min(1).max(300),
    igLink: z.string().min(1).max(300).default(" "),
    ytLink: z.string().min(1).max(300),
    cloudLink: z.string().min(1).max(300),
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
    console.log("username", name);
    // Validate input
    // try {
    //   updateUserSchema.parse({
    //     name: name,
    //   });
    // } catch (error) {
    //   throw new Error(
    //     "User name is required and must be less than 100 chars.",
    //   );
    // }
    try {
        updateUserSchema.parse({
          photo: photo,
        });
      } catch (error) {
        throw new Error(
          "User photo URL is required and must be less than 300 chars.",
        );
      }
      try {
        updateUserSchema.parse({
          fbLink: fbLink,
        });
      } catch (error) {
        throw new Error(
          "User fbLink is required and must be less than 300 chars.",
        );
      }
      try {
        updateUserSchema.parse({
          igLink: igLink,
        });
      } catch (error) {
        throw new Error(
          "User igLink is required and must be less than 300 chars.",
        );
      }
      try {
        updateUserSchema.parse({
          ytLink: ytLink,
        });
      } catch (error) {
        throw new Error(
          "User ytLink is required and must be less than 300 chars.",
        );
      }
      try {
        updateUserSchema.parse({
          cloudLink: cloudLink,
        });
      } catch (error) {
        throw new Error(
          "User cloudLink is required and must be less than 300 chars.",
        );
      }
        
  
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
  