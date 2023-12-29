"use client";

import type { Game } from "@/lib/types/db";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from "@/components/ui/use-toast";
import { updateGamePhoto } from "../action";

type EditGameButtonProps = {
    gameId: string,
    photo: Game["photo"];
};

export default function EditGameButton({ gameId, photo }: EditGameButtonProps) {
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
    <>
        <Avatar className="w-52 h-52">
            <AvatarImage src={photo} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex items-center space-x-2">
            <div className="grid grid-cols-11 gap-2">
                <div className="col-span-6 grid-rows-2">
                    <div>Upload Photo</div>
                    <div>
                    <Input
                        type="file"
                        accept="image/*"
                        className="file:bg-black-50 file:text-black-700 hover:file:bg-black-100 file:border file:border-solid file:border-black-700 file:rounded-md border-black-600"
                        onChange={handleFileChange}
                    />
                    </div>
                </div>
                <div className="col-span-2 grid-rows-2">
                <div>Preview</div>
                <div>
                    {previewImage && (
                    <Avatar>
                        <AvatarImage src={previewImage as string} alt="Preview" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    )}
                </div>
                </div>
                <div className="col-span-3 grid-rows-2">
                <div>Upload</div>
                <div>
                    <Button onClick={handleEditClick}>Upload</Button>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

