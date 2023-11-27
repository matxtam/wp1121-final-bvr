"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Player } from "@/lib/types/db";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

type playerBtnType = {
  players: Player[],
};

export default async function ShowPlayer ({players}: playerBtnType) {
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
  {open && (showPlayer > 0) &&
  <Dialog>
    <DialogContent>
      <DialogHeader>
        <h1>{players[showPlayer]?.number}</h1>
        <h2>{players[showPlayer]?.name}</h2>
      </DialogHeader>
      <div>
        <p>{players[showPlayer]?.personal2pt}</p>
      </div>
    </DialogContent>
  </Dialog>}
  </>);
}