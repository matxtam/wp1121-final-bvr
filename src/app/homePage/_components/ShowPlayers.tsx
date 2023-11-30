"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
// import { Player } from "@/lib/types/db";
export type Player = {
  id: number;
  displayId: string;
  name: string;
  photo: string;
  number: string; //背號 
  position: string; //位置
  useable: boolean; //是否可用
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

type playerBtnType = {
  players: Player[],
};

export default function ShowPlayer ({players}: playerBtnType) {
  const [open, setOpen] = useState(false);
  const [showPlayer, setShowPlayer] = useState(-1);
  return (
  <>
  {players.map((player, index) => ( 
  <Button 
    key={player.id} 
    className="flex flex-col h-full"
    onClick={() => {setOpen(true); setShowPlayer(index)}}
  >
    <Image
          src="/banana.jpg"
          alt="banana"
          width={100}
          height={100}
          priority
        />
    <div className="flex flex-row">
      <p>{player.number}</p>
      <p>{player.name}</p>
    </div>
  </Button>))}
  {
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
  }
  </>);
}