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

import { Player } from "@/lib/types/db";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// export type PlayerDialogProps = {
//     open: boolean;
//     // player: Player;
// };

import { Label } from "@/components/ui/label"
import { updatePlayer } from "../actions";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { set } from "zod";
import ImageUploader from "./ImageUploaderTemplate";

type EditPlayerButtonProps = {
  playerId: string;
  name: Player["name"];
  photo: Player["photo"];
  position: Player["position"];
  number: Player["number"];
};

export default function EditPlayerButton({ playerId, name, photo, position, number }: EditPlayerButtonProps) {
  const [editPlayername, setEditPlayername] = useState<Player["name"]>(name);
  const [editPlayerphoto, setEditPlayerphoto] = useState<Player["photo"]>(photo);
  const [editPlayerposition, setEditPlayerposition] = useState<Player["position"]>(position);
  const [editPlayernumber, setEditPlayernumber] = useState<Player["number"]>(number);      
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // 'result' contains the data URL representing the file's data
        const imageDataURL = reader.result;
        setEditPlayerphoto(imageDataURL as string);
        setPreviewImage(imageDataURL);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditClick = async () => {
    console.log("edit");
    try {
      await updatePlayer( playerId, editPlayername, editPlayerphoto, editPlayernumber, editPlayerposition);
      console.log(editPlayername);
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
    setPreviewImage(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editing {name}</DialogTitle>
          <DialogDescription>
            click confirm button to save changes
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
                <Input value={editPlayername} onChange={(e) => setEditPlayername(e.target.value)}  placeholder="name"/>
              </div>
              <div/>
              <div className="col-span-2">Number:</div>
              <div className="col-span-6">
                <Input value={editPlayernumber} onChange={(e) => setEditPlayernumber(e.target.value)} placeholder="number"/>
              </div>
              <div/>
              <div className="col-span-2">Position:</div>
              <div className="col-span-6">
                <Input value={editPlayerposition} onChange={(e) => setEditPlayerposition(e.target.value)} placeholder="position"/>
              </div>
              <div/>
              <div className="col-span-2">Photo:</div>
                <div className="col-span-6">
                  <Input
                    type="file"
                    accept="image/*"
                    className="file:bg-black-50 file:text-black-700 hover:file:bg-black-100 file:border file:border-solid file:border-black-700 file:rounded-md border-black-600"
                    // onChange={(e) => setEditPlayerphoto(e.target.value)}
                    onChange={handleFileChange}
                  />
                </div>
              <div/>
              <div className="col-span-2">Preview:</div>
                <div className="col-span-6">
                  {previewImage && (
                      <Avatar>
                          <AvatarImage src={previewImage as string} alt="Preview" />
                          <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                  )}
                </div>
              </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleEditClick}>
              confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
