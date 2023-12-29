"use client";
import { Button } from "@/components/ui/button";
import { deletePlayer } from "../actions";
import { Trash2 } from 'lucide-react';

type DeletePlayerButtonProps = {
    displayId: string;
    };

export default function DeletePlayerButton({displayId}: DeletePlayerButtonProps) {
    const handleDelete = async (playerid:string) => {
        console.log("delete");
        try {
            await deletePlayer(playerid);
        } catch (error) {
            error instanceof Error;
        }
    }

  return (
    <Button variant="destructive" onClick={() => handleDelete(displayId)}>
      <Trash2/>
    </Button>
  );
}