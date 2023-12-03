import { db } from "@/db";
import { playersTable, gamesTable } from "@/db/schema";

import { Button } from "@/components/ui/button"
import NewGameBtn from "./_components/NewGameBtn"
import { Player, Game } from "@/lib/types/db";
import Image from "next/image";
import Link from "next/link";
import ShowPlayer from "./_components/ShowPlayers";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default async function HomePage() {
  const players = await db
    .select()
    .from(playersTable)
    .execute();
  const games = await db
    .select()
    .from(gamesTable)
    .execute();
  return (
  <>
    <h3>Players</h3>
    <section className="flex flex-row gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            create player(test)
          </Button>
        </DialogTrigger>
        <form
        action = {
          async (e) => {
            "use server";
            try{
            console.log(e);
            await db.insert(playersTable)
              .values({
                number: e.get("number")?.toString() ?? "",
                name: e.get("name")?.toString() ?? "",
                position: e.get("position")?.toString() ?? "",
                photo: "",
              })
              .execute();
            } catch (error) {
              console.log(error);
            }
          }
        }
      >
        <DialogContent className = "gap-3">
        
        <Input name="number" placeholder="number"></Input>
        <Input name="name" placeholder="name"></Input>
        <Input name="position" placeholder="position"></Input>
        <DialogClose>
          <Button type="submit">Create</Button>
        </DialogClose>
      </DialogContent>
      </form>
      </Dialog>
      <ShowPlayer players={players}/>
    </section>

    <h3>Game History</h3>
    <section className="flex flex-row">
      <NewGameBtn/>
      {games.map((game) => (
      <Link key={game.id} href={`../history/${game.displayId}`}>
        <h4>{game.title}</h4>
        <div>
          <p>{game.date?.toString()}</p>
          <p>{game.hashtag}</p>
        </div>
      </Link>
      ))}
    </section>
  </>)
}