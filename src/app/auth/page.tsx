import { redirect } from "next/navigation";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import {User} from "@/lib/types/db";
import AuthForm from "./_components/AuthForm";

export default async function AuthPage() {
  // If signed in, redirect to /
  const session = await auth();
  const tempAllUsers = await db.select().from(usersTable).execute();
  const allUsers: User[]  = tempAllUsers.map((user) => ({
    id: user.id.toString(),
    name: user.name,
    displayId: user.displayId,
    email: user.email,
    photo: user.photo,
    fbLink: user.fbLink,
    igLink: user.igLink,
    ytLink: user.ytLink,
    cloudLink: user.cloudLink,
    provider: user.provider,    
  }));

  if (session?.user?.id) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthForm 
        allUsers={allUsers}
      />
    </main>
  );
}
