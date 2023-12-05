import Link from "next/link";
import { redirect } from "next/navigation";

// import { getProjects } from "../actions";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";

import SignOutButton from "./SignOutButton";

export default async function Navbar() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session?.user) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  // const projects = await getProjects(userId);
  return (
    <nav className="flex min-w-fit flex-col justify-between gap-2 overflow-hidden bg-gray-100">
      <div className="flex w-full items-center justify-between gap-8 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200"></div>
          <span className="text-md font-semibold">
            {
              session?.user?.name
            }
          </span>
        </div>
        <SignOutButton />
        <Link href="/settings">settings link for test</Link>
        <Link href="/gameTime/294d90c3-6da1-4e25-a4ff-9163fed52b61">gameTime link for test</Link>      
      </div>
    </nav>
  );
}
