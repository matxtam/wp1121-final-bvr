import Link from "next/link";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import fbLink1 from "public/fbLink1.png";
import igLink1 from "public/igLink1.png";
import ytLink1 from "public/ytLink1.png";
import cloudLink1 from "public/cloudLink1.png";
import fbLink2 from "public/fbLink2.png";
import igLink2 from "public/igLink2.png";
import ytLink2 from "public/ytLink2.png";
import cloudLink2 from "public/cloudLink2.png";
import Image from "next/image";

import EditUserButton from "./_components/EditLinkButton";
// import SignOutButton from "./SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usersTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export default async function Navbar() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session?.user) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const users = await db
  .select()
  .from(usersTable)
  .where(eq(usersTable.displayId, userId))
  .execute();
  const user = users[0];
// const projects = await getProjects(userId);
  return (
    // <nav className="flex min-w-fit flex-col justify-between gap-2 overflow-hidden bg-gray-100">
    <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-blue-400 p-2 text-slate-50">
      <div className="flex h-10 w-full flex-row items-center gap-12 px-6 py-8 pt-8">
        <h2 className="text-2xl font-bold" data-testid="title">
          TeamProfiles
        </h2>
      </div>
      <Separator />
      <div className="flex w-full items-center justify-between gap-8 px-4 py-2">
        <div className="flex items-center gap-2">
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200"></div> */}
          <Avatar>
            <AvatarImage src={user.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-md font-semibold">
            {session?.user?.name}
          </span>
        </div>
      </div>

      <div className="grid w-full lg:max-w-sm items-center gap-1.5">
        <div className="grid grid-cols-7">
        {/* fb */}
        <div className="col-span-1"></div>
        <Link href={user.fbLink}>
          <Image src={fbLink1} alt="Facebook Link" className="col-span-2" />
        </Link>
        {/* ig */}
        <Link href={user.igLink}>
          <Image src={igLink1} alt="Instagram Link" className="col-span-2" />
        </Link>
        {/* youtube */}
        <Link href={user.ytLink}>
          <Image src={ytLink1} alt="Youtube Link" className="col-span-2" />
        </Link>
        <Link href={user.cloudLink}>
          <Image src={cloudLink1} alt="GoogleDrive Link" className="col-span-2" />
        </Link>
        <EditUserButton photo={user.photo} name={user.name} fbLink={user.fbLink} ytLink={user.ytLink} igLink={user.igLink} cloudLink={user.cloudLink} />
        </div>
    </div>

    </nav>
  );
}
