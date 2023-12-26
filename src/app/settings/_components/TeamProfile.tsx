import Link from "next/link";
import { redirect } from "next/navigation";

// import { getProjects } from "../actions";

import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
// import SignOutButton from "./SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Navbar() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId || !session?.user) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
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
      {/* <Link
        className="mx-2 rounded-xl bg-gray-50 px-4 py-2 text-lg drop-shadow-md transition-all hover:bg-gray-200"
        href="/projects/create"
      >
        + Create Project
      </Link>
      <section className="flex grow flex-col gap-2 overflow-scroll">
        {projects.length === 0 ? (
          <div className="flex h-10 w-full flex-col items-center justify-between p-2">
            <h3>No Projects</h3>
          </div>
        ) : (
          projects.map((project) => {
            return (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="flex w-full cursor-pointer flex-row items-center justify-between p-2 pl-6 transition-all hover:bg-gray-200"
              >
                <h3 className="text-xl">{project.name}</h3>
              </Link>
            );
          })
        )}
      </section> */}
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
        {/* <SignOutButton /> */}
      </div>

      <div className="grid w-full lg:max-w-sm items-center gap-1.5">
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
