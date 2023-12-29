"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type DeletePlayerButtonProps = {
  displayId: string;
  };

export default function ShowAllButton() {
    const [showAll, setShowAll] = useState<boolean>(false);
    const handleShowAll = async () => {
        // try {
        //     await ShowAll(playerid);
        // } catch (error) {
        //     error instanceof Error;
        // }
        setShowAll(!showAll);
    }

  return (
    <Button onClick={handleShowAll}>
      {showAll? "show usable players": "show all players"}
    </Button>
  );
}