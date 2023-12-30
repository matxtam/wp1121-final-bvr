"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"

import type { Player } from "@/lib/types/db";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input"

// export type PlayerDialogProps = {
//     open: boolean;
//     // player: Player;
// };

import { Label } from "@/components/ui/label"
import { createPlayer } from "../actions";
import { toast } from "@/components/ui/use-toast";

export default function CreatePlayerDialog() {
  const [addPlayername, setAddPlayername] = useState<Player["name"]>("");
  // const [addPlayerphoto, setAddPlayerphoto] = useState<Player["photo"]>("");
  const [addPlayerposition, setAddPlayerposition] = useState<Player["position"]>("");
  const [addPlayernumber, setAddPlayernumber] = useState<Player["number"]>("");

  const handleAddClick = async () => {
    console.log("add");
    try {
      await createPlayer(addPlayername, addPlayernumber, addPlayerposition);
    } catch (error) {
      console.log("error is", error);
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    }
    setAddPlayername("");
    // setAddPlayerphoto("");
    setAddPlayerposition("");
    setAddPlayernumber("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Player</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a new player</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              PlayerInfo
            </Label>
            <div className="grid grid-cols-9 gap-4 flex items-center">
              <div className="col-span-2">Name:</div>
              <div className="col-span-6">
                <Input value={addPlayername} onChange={(e) => setAddPlayername(e.target.value)}  placeholder="name"/>
              </div>
              <div/>
              <div className="col-span-2">Number:</div>
              <div className="col-span-6">
                <Input value={addPlayernumber} onChange={(e) => setAddPlayernumber(e.target.value)} placeholder="number"/>
              </div>
              <div/>
              <div className="col-span-2">Position:</div>
              <div className="col-span-6">
                <Input value={addPlayerposition} onChange={(e) => setAddPlayerposition(e.target.value)} placeholder="position"/>
              </div>
              <div/>
              <div/>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleAddClick}>
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
