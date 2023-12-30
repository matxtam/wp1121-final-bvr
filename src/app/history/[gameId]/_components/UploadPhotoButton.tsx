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

import type { Game } from "@/lib/types/db";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PenSquare } from "lucide-react";
import { updateGamePhoto } from "../action";

import { toast } from "@/components/ui/use-toast";

type EditGameButtonProps = {
  gameId: string,
  photo: Game["photo"];
};

export default function UploadPhotoButton({ gameId, photo }: EditGameButtonProps) {
  const [editGamephoto, setEditGamephoto] = useState<Game["photo"]>(photo);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // 'result' contains the data URL representing the file's data
        const imageDataURL = reader.result;
        setEditGamephoto(imageDataURL as string);
        setPreviewImage(imageDataURL);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditClick = async () => {
    try {
      await updateGamePhoto( gameId, editGamephoto );
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
        <Button variant="outline" className="h-12 w-12 overflow-visible absolute bottom-0 right-0 border-none bg-gray-500/50 hover:bg-gray-500/80 rounded-full">
          <PenSquare size={24}/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose an image from your device.</DialogTitle>
          <DialogDescription>
            click confirm button to save changes
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-20">
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
        <div>
            {previewImage && (
                <Avatar>
                    <AvatarImage src={previewImage as string} alt="Preview" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )}
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
