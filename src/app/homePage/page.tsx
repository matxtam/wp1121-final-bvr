import { db } from "@/db";
import { playersTable, gamesTable } from "@/db/schema";
import UploadPhoto from "./_components/UploadPhoto";
import { Button } from "@/components/ui/button"
import NewGameBtn from "./_components/NewGameBtn"
import { Player, Game } from "@/lib/types/db";
import Image from "next/image";
import Link from "next/link";
import ShowPlayer from "./_components/ShowPlayers";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown } from "lucide-react";
import { auth } from "@/lib/auth";
import { eq, like, and } from "drizzle-orm";
import SearchBar from "./_components/SearchBar";
import { revalidatePath } from "next/cache";
import { publicEnv } from "@/lib/env/public";
import { get } from "http";
import { getPlayers } from "../settings/players/actions";
// const photo = document.querySelector("#photo")

export default async function HomePage() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  const user = session.user;
  const userId = user.id;
  // const players = await db
  //   .select()
  //   .from(playersTable)
  //   .execute();
  const players = await getPlayers(userId);
  // let displayGame = null;

  // const games = await db.query.userToGameTable.findMany({
  //   where: eq(userToGameTable.userId, userId),
  //   with: {
  //     game:{
  //       columns:{
  //         id: true,
  //         title: true,
  //         date: true,
  //         photo: true,
  //         hashtag: true,
  //         displayId: true,
  //         totalScore: true,
  //         periodsNumber: true,
  //         possession: true,
  //       },
  //       }
  //     }
  //   },
  // );
  // displayGame = games;
  // const games = await db.query.userToGameTable.findMany({
  //   where:(eq(userToGameTable.userId, userId)) ,
  //   with: {
  //     game: {
  //       where: (like(game.title, `%${inputTitle ?? ""}%`)) ,
        
  //     },
  //     }
  //   },
  // );

  const handleSearch = async (inputTitle: string) => {
    "use server"
    await db
      .update(gamesTable)
      .set({
        display: false,
      })
      .where(eq(gamesTable.userId, userId))
      .execute();
    await db
      .update(gamesTable)
        .set({
          display: true,
      })
      .where (and(eq(gamesTable.userId, userId), like(gamesTable.title, `%${inputTitle ?? ""}%`))) 
      .execute();
    revalidatePath(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  } 

  const handleClear = async () => {
    "use server"
    await db
      .update(gamesTable)
      .set({
        display: true,
      })
      .where(eq(gamesTable.userId, userId))
      .execute();
    revalidatePath(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  const displayGame = await db
    .select()
    .from(gamesTable)
    .where(and(eq(gamesTable.display, true), eq(gamesTable.userId, userId)))
    .execute();



  // const games = await db
  //   .select()
  //   .from(gamesTable)
  //   .execute();
  
  return (
  <>
    <div className="flex flex-row pt-12 justify-around items-center">
      <Separator className="w-1/3 "/>
      <h2>Players</h2>
      <Separator className="w-1/3"/>
    </div>
    
    <ShowPlayer players={players}/>


    
    <section className="flex flex-col gap-12">
      <div className="sticky top-0 z-50 p-6 bg-background flex flex-col justify-around items-center">
        <div className="flex flex-row w-full justify-around items-center">
          <Separator className="w-1/3 "/>
          <h2>Game History</h2>
          <Separator className="w-1/3 "/>
        </div>
        <SearchBar handleSearch={handleSearch} handleClear={handleClear} className=" pt-6 pr-24 self-end"/>
      </div>
      
      <div className="flex flex-row flex-wrap w-full px-20 justify-start items-center gap-4">
      <NewGameBtn className="flex h-52 w-64 rounded bg-transparent shadow-md shadow-batra-300 hover:bg-muted hover:animate-pulse"/>
      {displayGame.map((game) => (
        <Link key={game.id} href={`../history/${game.displayId}`} className="flex flex-col items-center w-64 h-52 p-3 gap-3 rounded border-2 border-blue-100 transition duration-100  shadow-md shadow-batra-300 bg-transparent hover:scale-105 hover:-translate-y-3 hover:z-0" >
          <div className="flex flex-row w-full justify-between">
            <p>{game.date?.toString()}</p>
            <p className="rounded-full bg-accent w-20 overflow-hidden text-center">{game.hashtag}</p>
          </div>
          <Image
            src="/history_df.jpg"
            alt="banana"
            width={200}
            height={100}
            priority
            style={{  borderRadius: 10 }}
          />
        <h4 className="text-xl">{game.title}</h4>
          
        </Link>
      ))}
      </div>
    </section>
  </>)
}


    // {/* <section className="flex flex-row gap-3"> */}
    //   {/* <Dialog>
    //     <DialogTrigger asChild>
    //       <Button>
    //         create player(test)
    //       </Button>
    //     </DialogTrigger>
    //     <DialogContent className = "gap-3">
        
    //     <form
    //     action = {
    //       async (e) => {
    //         "use server";
    //         // const newNumber = e.get("number")?.toString() ?? "";
    //         // const newName = e.get("name")?.toString() ?? "";
    //         // const newPosition = e.get("position")?.toString() ?? "";
    //         // const photo = 
    //         // console.log('photo', photo)
    //         // const photoInput = document.querySelector("#photo");
    //         // console.log('photoInput', photoInput);
    //         // const photo = photoInput ? (photoInput.files[0] ?? "") : "";
    //         // const photo = document.querySelector("#photo").files[0]?? "";
    //         // let reader = new FileReader();
    //         // reader.onload = async function (e) {
    //         //   const photo = e.target?.result;
    //         //   try {
    //         //     console.log('start add player');
    //         //     await db.insert(playersTable)
    //         //       .values({
    //         //         number: newNumber,
    //         //         name: newName,
    //         //         position: newPosition,
    //         //         photo: "",
    //         //       })
    //         //       .execute();
    //         //     } catch (error) {
    //         //       console.log(error);
    //         //     }
    //         // }    
    //         // reader.readAsDataURL(photo);
    //         try {
    //         console.log('start add player');
    //         await db.insert(playersTable)
    //           .values({
    //             number: e.get("number")?.toString() ?? "",
    //             name: e.get("name")?.toString() ?? "",
    //             position: e.get("position")?.toString() ?? "",
    //             photo: "",
    //           })
    //           .execute();
    //         } catch (error) {
    //           console.log(error);
    //         }
    //     }
    //   }
    //   >

    //     <Input name="number" placeholder="number"></Input>
    //     <Input name="name" placeholder="name"></Input>
    //     <Input name="position" placeholder="position"></Input>
    //     <UploadPhoto />
    //     <DialogClose type="submit">
    //       Create
    //     </DialogClose>
    //     </form>
    //   </DialogContent>
    //   </Dialog> */}
    //   {/* {players.map((player) => (
    //     <ShowPlayer key={player.displayId} players={player} />
    //   ))} */}
      
    // {/* </section> */}