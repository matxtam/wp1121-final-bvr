"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import Image from "next/image";
// import { Player } from "@/lib/types/db";
export type Player = {
  id: number;
  displayId: string;
  name: string;
  photo: string;
  number: string; //背號 
  position: string; //位置
  usable: boolean; //是否可用
  personalValue: number; //個人價值(不知需不需要)
  personal2pt: number; //個人兩分球數
  personalIn2pt: number; //個人兩分球進球數
  personal3pt: number; //個人三分球數
  personalIn3pt: number; //個人三分球進球數
  personalFt: number;
  personalInFt: number;
  personalDefReb: number; //個人防守籃板數
  personalOffReb: number; //個人進攻籃板數
  personalSteal: number; //個人抄截數
  personalAssist: number; //個人助攻數
};

import { cn } from "@/lib/utils/shadcn";

type playerBtnType = {
  players: Player[],
};

export default function ShowPlayer ({players}: playerBtnType) {
  const [open, setOpen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(-1);

  return (
  <div className="flex flex-row gap-4 justify-center">

  {players.map((player, index) => {
    const shooting = player.personal2pt + player.personal3pt + player.personalFt;
    const ins = player.personalIn2pt + player.personalIn3pt + player.personalInFt;
    const rate = shooting === 0 ? Math.floor(ins*100/shooting) : "Nan";
  return (
  <Card
    key={player.id} 
    className="transition duration-100 relative flex flex-row h-full shadow-md shadow-batra-300 p-3 bg-secondary hover:scale-105 hover:-translate-y-3"
    onClick={() => {setShowPlayer(index); if((!open)||(showPlayer===index))setOpen(!open); }}
  >
    <div className="flex flex-col">
      <Image
          src="/banana.jpg"
          alt="banana"
          width={100}
          height={100}
          priority
          // style={{  borderTopRightRadius: 10, borderTopLeftRadius: 10, }}
          className="rounded-t-xl"
        />
      <p className="w-full px-1 text-secondary rounded-bl bg-gradient-to-r from-secondary-foreground to-transparent">{player.name}</p>
      <p className="absolute bottom-0 right-0 text-5xl text-secondary-foreground/50 font-extrabold p-2">{player.number}</p>
    </div>
    
    <div aria-hidden={(!open) || (index!==showPlayer)} className="grid grid-cols-2 p-3 transition-all w-72 h-52 aria-hidden:w-0 aria-hidden:h-36 aria-hidden:p-0 aria-hidden:scale-0">
      <p>Shooting</p> <p>{`${ins} / ${shooting} = ${rate}%`}</p>
      <p>DefReb</p> <p>{player.personalDefReb}</p>
      <p>OffReb</p> <p>{player.personalOffReb}</p>
      <p>Steal</p> <p>{player.personalSteal}</p>
      <p>Assist</p> <p>{player.personalAssist}</p>
    </div>


  </Card>)})}

  </div>);
}