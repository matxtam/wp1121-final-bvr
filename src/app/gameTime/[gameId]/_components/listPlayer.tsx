"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

type Props = {
    displayId: string;
};

export default function UsableButton({displayId}: Props) {
    const [on, setOn] = useState(false);
    const handleToggle = async (playerId:string) => {
    // try {
    //     await TogglePlayerUsable(playerid, !playerUsable);
    // } catch (error) {
    //     error instanceof Error;
    // }
    setOn(!on)
    }

  return (
    <Checkbox checked={on} onClick={() => handleToggle(displayId)}/>
    );
}
