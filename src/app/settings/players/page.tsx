import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import CreatePlayerButton from "./_components/CreatePlayerButton";
import EditPlayerButton from "./_components/EditPlayerButton";
import { getPlayers } from "./actions";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { publicEnv } from "@/lib/env/public";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DeletePlayerButton from "./_components/DeletePlayerButton";
import UsableButton from "./_components/UsableButton";

export default async function PlayerPage() {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId || !session?.user) {
      redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
    }
    const players = await getPlayers(userId);
  
  return (
    <div>
      <div className="flex h-10 w-full flex-row items-center justify-end gap-12 px-6 py-8 pt-8">
        <CreatePlayerButton />
      </div>
        <Table>
            <TableHeader className="border-primary bg-white bg-opacity-20">
                <TableRow>
                    <TableCell align="center">NUMBER</TableCell>
                    <TableCell align="center">PHOTO</TableCell>
                    <TableCell align="center">PLAYER</TableCell>
                    <TableCell align="center">POSITION</TableCell>
                    <TableCell align="center">EDIT</TableCell>
                    <TableCell align="center">DELETE</TableCell>
                    <TableCell align="center">USABLE</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white bg-opacity-10">
            {players.map((player) => {
              if (player.usable)
                return (
                  <TableRow key={player.displayId}>
                    <TableCell align="center">{player.number}</TableCell>
                    <TableCell align="center">
                      <Avatar>
                          <AvatarImage src={player.photo} />
                          <AvatarFallback className="round" >CN</AvatarFallback>
                      </Avatar>
                     </TableCell>
                    <TableCell align="center">{player.name}</TableCell>
                    <TableCell align="center">{player.position}</TableCell>
                    <TableCell align="center">
                        <EditPlayerButton playerId={player.displayId} name={player.name} photo={player.photo} position={player.position} number={player.number} />
                    </TableCell>
                    <TableCell align="center">
                      <DeletePlayerButton displayId={player.displayId} />
                    </TableCell>
                    <TableCell align="center">
                      <UsableButton displayId={player.displayId} usable={player.usable} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableBody>
            {players.map((player) => {
              if (!player.usable)
                return (
                  <TableRow key={player.displayId}>
                    <TableCell align="center">{player.number}</TableCell>
                    <TableCell align="center">
                      <Avatar>
                          <AvatarImage src={player.photo} />
                          <AvatarFallback className="round" >CN</AvatarFallback>
                      </Avatar>
                     </TableCell>
                    <TableCell align="center">{player.name}</TableCell>
                    <TableCell align="center">{player.position}</TableCell>
                    <TableCell align="center">
                        <EditPlayerButton playerId={player.displayId} name={player.name} photo={player.photo} position={player.position} number={player.number} />
                    </TableCell>
                    <TableCell align="center">
                      <DeletePlayerButton displayId={player.displayId} />
                    </TableCell>
                    <TableCell align="center">
                      <UsableButton displayId={player.displayId} usable={player.usable} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
        </Table>
    </div>
  );
}
