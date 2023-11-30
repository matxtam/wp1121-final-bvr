"use client";
import { useState } from "react";
import { GamePerformance } from "@/lib/types/db";

interface performanceWithPlayer extends GamePerformance{
  players: {name: string; number:string; }
}

type Props = {
  playersOfTheGame: performanceWithPlayer[]
}

export default function ({playersOfTheGame}:Props) {
  const [on, setOn] = useState(false);
  const [twoPt, setTwoPt] = useState(false);
  const [threePt, setThreePt] = useState(false);
  const [ft, setFt] = useState(false);
  const [foul, setFoul] = useState(false);
  const [steal, setSteal] = useState(false);
  const [block, setBlock] = useState(false);
  const [assist, setAssist] = useState(false);
  const [defReb, setDefReb] = useState(false);
  const [offRev, setOffRev] = useState(false);
  const [turnover, setTurnOver] = useState(false);
  const [point, setPoint] = useState(false);


  return (<div className="grid grid-cols-14">
  {playersOfTheGame.map((player) => (
  <>
  <p>{player.players.number}</p>
  <p>{player.players.name}</p>
  </>))}
  </div>)

}