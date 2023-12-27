import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import CreatePlayerButton from "./_components/CreatePlayerButton";
import EditPlayerButton from "./_components/EditPlayerButton";
import { getPlayers } from "./actions";

import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { playersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DeletePlayerButton from "./_components/DeletePlayerButton";

export default async function PlayerPage() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId || !session?.user) {
      redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
    }
    const players = await getPlayers(userId);
    // console.log(players);
    // not user-only
    // const players = await db
    //   .select()
    //   .from(playersTable)
    //   .execute();
  
  return (
    <div>
        <CreatePlayerButton />
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell align="center">Number</TableCell>
                    <TableCell align="center">Photo</TableCell>
                    <TableCell align="center">Player</TableCell>
                    <TableCell align="center">Position</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                    <TableCell align="center">Info</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
            {players.map((player) => {
                return (
                  <TableRow key={player.displayId}>
                    <TableCell align="center">{player.number}</TableCell>
                    <TableCell align="center">
                      <Avatar>
                          <AvatarImage src={player.photo} />
                          <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                     </TableCell>
                    <TableCell align="center">
                      <Link href={`/settings/players/${player.displayId}`}>
                          {player.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{player.position}</TableCell>
                    <TableCell align="center">
                        <EditPlayerButton playerId={player.displayId} name={player.name} photo={player.photo} position={player.position} number={player.number} />
                    </TableCell>
                    <TableCell align="center">
                      <DeletePlayerButton displayId={player.displayId} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
        </Table>
    </div>
  );
}
