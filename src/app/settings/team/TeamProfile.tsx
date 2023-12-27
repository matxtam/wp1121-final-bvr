import Link from "next/link";
import { redirect } from "next/navigation";

// import { getProjects } from "../actions";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="text-md font-semibold">
            {
              session?.user?.name
            }
          </span>
        </div>
      </div>

      <div className="grid w-full lg:max-w-sm items-center gap-1.5">
        <div className="grid grid-cols-11">
        {/* fb */}
        <div className="col-span-1"></div>
        <Link href="https://www.facebook.com/ntueegbkt?locale=zh_TW">
          <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Facebook_icon_%28black%29.svg/2048px-Facebook_icon_%28black%29.svg.png">
            </AvatarImage>
          </Avatar>
        </Link>
        {/* ig */}
        <Link href="/settings">
          <Avatar>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy8ecQ8MtNrNICUox6fMLke5i7tatCXUvJ8g&usqp=CAU">
            </AvatarImage>
          </Avatar>
        </Link>
        {/* youtube */}
        <Link href="/settings">
          <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/YouTube_social_dark_circle_%282017%29.svg/1024px-YouTube_social_dark_circle_%282017%29.svg.png">
            </AvatarImage>
          </Avatar>
        </Link>
        <Link href="/settings">
          <Avatar>
            <AvatarImage src="data:image/png;base64,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">
            </AvatarImage>
          </Avatar>
        </Link>
        <EditUserButton photo={user.photo} name={user.name} fbLink={user.fbLink} ytLink={user.ytLink} igLink={user.igLink} cloudLink={user.cloudLink} />
        </div>
      <Label htmlFor="picture">Picture</Label>
      <Input
        id="picture"
        type="file"
        className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border file:border-solid file:border-blue-700 file:rounded-md border-blue-600"
      />
    </div>

    </nav>
  );
}
