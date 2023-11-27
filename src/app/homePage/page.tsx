import { Button } from "@/components/ui/button"
import NewGameBtn from "./_components/NewGameBtn"
import { Player, Game } from "@/lib/types/db";
import Image from "next/image";
import Link from "next/link";
import ShowPlayer from "./_components/ShowPlayers";



export default function HomePage() {
  const players:Player[] = [{
    id: "1",
    name: "Betty Cheng",
    photo: "",
    number: 13,
    position: "",
    useable: true,
    personal2pt: 0,
    personal3pt: 0,
    personalAssist: 0,
    personalDefReb: 0,
    personalIn2pt: 0,
    personalIn3pt: 0,
    personalOffReb: 0,
    personalSteal: 0,
    personalValue: 0,
  }];
  const games:Game[] = [];
  return (
  <>
    <h3>Players</h3>
    <section className="flex flex-row">
      <ShowPlayer players={players}/>
    </section>

    <h3>Game History</h3>
    <section className="flex flex-row">
      <NewGameBtn/>
      {games.map((game) => (
      <Link key={game.id} href={`../history/${game.id}`}>

        <h4>{game.title}</h4>
        <div>
          <p>{game.date.toString()}</p>
          <p>{game.hashtag}</p>
        </div>
      </Link>
      ))}
    </section>
  </>)
}