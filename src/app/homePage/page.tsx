import { db } from "@/db";
import { playersTable, gamesTable } from "@/db/schema";
import UploadPhoto from "./_components/UploadPhoto";
import { Button } from "@/components/ui/button"
import NewGameBtn from "./_components/NewGameBtn"
import { Player, Game } from "@/lib/types/db";
import Image from "next/image";
import Link from "next/link";
import ShowPlayer from "./_components/ShowPlayers";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown } from "lucide-react";
// const photo = document.querySelector("#photo")

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
        <DialogContent className = "gap-3">
        
        <form
        action = {
          async (e) => {
            "use server";
            // const newNumber = e.get("number")?.toString() ?? "";
            // const newName = e.get("name")?.toString() ?? "";
            // const newPosition = e.get("position")?.toString() ?? "";
            // const photo = 
            // console.log('photo', photo)
            // const photoInput = document.querySelector("#photo");
            // console.log('photoInput', photoInput);
            // const photo = photoInput ? (photoInput.files[0] ?? "") : "";
            // const photo = document.querySelector("#photo").files[0]?? "";
            // let reader = new FileReader();
            // reader.onload = async function (e) {
            //   const photo = e.target?.result;
            //   try {
            //     console.log('start add player');
            //     await db.insert(playersTable)
            //       .values({
            //         number: newNumber,
            //         name: newName,
            //         position: newPosition,
            //         photo: "",
            //       })
            //       .execute();
            //     } catch (error) {
            //       console.log(error);
            //     }
            // }    
            // reader.readAsDataURL(photo);
            try {
            console.log('start add player');
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
            // const res = await fetch("/api/player", {
            //   method: "POST",
            //   body: JSON.stringify({
            //     number: e.get("number")?.toString() ?? "",
            //     name: e.get("name")?.toString() ?? "",
            //     position: e.get("position")?.toString() ?? "",
            //     photo: "",
            //   }),
            // });
            // if (!res.ok) {
            //   return;
            // }
            // await res.json();
        }
      }
      >

        <Input name="number" placeholder="number"></Input>
        <Input name="name" placeholder="name"></Input>
        <Input name="position" placeholder="position"></Input>
        <UploadPhoto />
        <DialogClose type="submit">
          Create
        </DialogClose>
        </form>
      </DialogContent>
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