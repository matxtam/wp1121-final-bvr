"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
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
  personalDefReb: number; //個人防守籃板數
  personalOffReb: number; //個人進攻籃板數
  personalSteal: number; //個人抄截數
  personalAssist: number; //個人助攻數
};
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils/shadcn";

type playerBtnType = {
  players: Player[],
};

export default function ShowPlayer ({players}: playerBtnType) {
  const [open, setOpen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(-1);
  return (
  <div className="flex flex-row gap-3 justify-center">

  {players.map((player, index) => ( 
  <Card
    key={player.id} 
    className="transition duration-100 relative flex flex-row h-full border-none rouneded-sm shadow-md shadow-batra-300 p-3 bg-batra-700 hover:scale-105 hover:-translate-y-3 open:bg-transparent"
    onClick={() => {setOpen(!open); setShowPlayer(index)}}
  >
    <div className="flex flex-col">
    <Image
          src="/banana.jpg"
          alt="banana"
          width={100}
          height={100}
          priority
          className="transition-transform duration-100 rounded-t-md sepia"
        />
      <p className="w-full px-1 rounded-bl bg-gradient-to-r from-batra-300 to-transparent">{player.name}</p>
      <p className="absolute bottom-0 right-0 text-5xl text-opacity-80 text-batra-900 font-extrabold p-2">{player.number}</p>
    </div>
    <div aria-hidden={(!open) || (index!==showPlayer)} className="transition-all w-48 aria-hidden:scale-0 aria-hidden:w-0">
      <p>{players[showPlayer]?.personal2pt}</p>
      <p>{index}</p>
    </div>


  </Card>))}
  {/* {
  <Dialog open={open && (showPlayer >= 0)} onOpenChange={() => setOpen(false)}>
    <DialogContent onInteractOutside={() => setOpen(false)}>
      <DialogHeader>
        <h1>{players[showPlayer]?.number}</h1>
        <h2>{players[showPlayer]?.name}</h2>
      </DialogHeader>
      <div>
        <p>{players[showPlayer]?.personal2pt}</p>
      </div>
    </DialogContent>
  </Dialog>
  } */}
  </div>);
}