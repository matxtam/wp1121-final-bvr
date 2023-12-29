"use client";
import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TogglePlayerUsable } from "../actions";

type UsableButtonProps = {
    displayId: string;
    usable: boolean;
    };

export default function UsableButton({displayId, usable}: UsableButtonProps) {
  const [playerUsable, setPlayerUsable] = useState<boolean>(usable);
  const handleToggleUsable = async (playerid:string) => {
    try {
        await TogglePlayerUsable(playerid, !playerUsable);
    } catch (error) {
        error instanceof Error;
    }
    setPlayerUsable(!playerUsable)
  }

  return (
    <Checkbox checked={usable} onClick={() => handleToggleUsable(displayId)}/>

    // <Button onClick={() => handleToggleUsable(displayId)}>{playerUsable ? "Unusable" : "Usable"}</Button>
    );
}