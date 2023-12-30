import Link from "next/link";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import fbLink1 from "public/fbLink1.png";
import igLink1 from "public/igLink1.png";
import ytLink1 from "public/ytLink1.png";
import cloudLink1 from "public/cloudLink1.png";
import Image from "next/image";

import CreatePlayerButton from "../players/_components/CreatePlayerButton";
import EditUserButton from "./_components/EditLinkButton";
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
  return (
    <div className="flex flex-col">
      <div className="flex h-10 w-full flex-row bg-white bg-opacity-10 items-center justify-between gap-12 px-8 py-8 pt-8">
        <h2 className="text-2xl font-bold" data-testid="title">
          TeamProfiles
        </h2>
      </div>
      <Separator className="bg-primary "/>
      <div className="flex items-center gap-2 bg-white bg-opacity-10 px-8 py-8 pt-4 justify-between">
        <div className="flex h-10 w-full items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user.photo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-md font-semibold">
              {session?.user?.name}
            </span>
          </div>
        </div>
        {/* <div className="flex h-10 w-full items-center justify-end"> */}
          <div className="grid grid-cols-8 h-10 items-center justify-center w-full">
            {/* fb */}
            <div className="col-span-1 grid-column-start:1">
              {user.fbLink === "None" ? (
                  <Image src={fbLink1} alt="Facebook Link" className="col-span-2 h-10 w-10" />
                ) : (
                  <Link href={user.fbLink} target="_blank">
                    <Image src={fbLink1} alt="Facebook Link" className="col-span-2 h-10 w-10" />
                  </Link>
              )}
            </div>
            {/* ig */}
            <div className="col-span-1 grid-column-start:2">
              {user.igLink === "None" ? (
                  <Image src={igLink1} alt="Instagram Link" className="col-span-2 h-10 w-10" />
                    ) : (
                  <Link href={user.igLink} target="_blank">
                    <Image src={igLink1} alt="Instagram Link" className="col-span-2 h-10 w-10" />
                  </Link>
                )}
            </div>
            {/* youtube */}
            <div className="col-span-1 grid-column-start:3">
              {user.ytLink === "None" ? (
                  <Image src={ytLink1} alt="Youtube Link" className="col-span-2 h-10 w-10" />
                    ) : (
                  <Link href={user.ytLink} target="_blank">
                    <Image src={ytLink1} alt="Youtube Link" className="col-span-2 h-10 w-10" />
                  </Link>
                )}
            </div>
            <div className="col-span-1 grid-column-start:4">
              {user.cloudLink === "None" ? (
                  <Image src={cloudLink1} alt="GoogleDrive Link" className="col-span-2 h-10 w-10" />
                    ) : (
                  <Link href={user.cloudLink} target="_blank">
                    <Image src={cloudLink1} alt="GoogleDrive Link" className="col-span-2 h-10 w-10" />
                  </Link>
                )}
            </div>
            <div className="col-span-1 grid-column-start:5" style={{ placeSelf: 'center' }}>
              <EditUserButton photo={user.photo} name={user.name} fbLink={user.fbLink} ytLink={user.ytLink} igLink={user.igLink} cloudLink={user.cloudLink} />
            </div>
            <div className="flex col-span-3 truncate h-10 w-full flex-row items-center justify-end gap-12 px-6 py-8 pt-8">
              <CreatePlayerButton />
            </div>
            
          </div>
       
      </div>
    </div>
  );
}
