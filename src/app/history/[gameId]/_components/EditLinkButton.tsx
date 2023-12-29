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

import { User } from "@/lib/types/db";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from "@/components/ui/label"
// import { updateUser } from "../actions";

import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

type EditUserButtonProps = {
  photo: User["photo"];
  name: User["name"];
  fbLink: User["fbLink"];
  igLink: User["igLink"];
  ytLink: User["ytLink"];
  cloudLink: User["cloudLink"];
};

export default function EditUserButton({ photo, name, fbLink, igLink, ytLink, cloudLink }: EditUserButtonProps) {
  const [editUsername, setEditUsername] = useState<User["name"]>(name);
  const [editUserphoto, setEditUserphoto] = useState<User["photo"]>(photo);
  const [editUserfbLink, setEditUserfbLink] = useState<User["fbLink"]>(fbLink);
  const [editUserigLink, setEditUserigLink] = useState<User["igLink"]>(igLink);
  const [editUserytLink, setEditUserytLink] = useState<User["ytLink"]>(ytLink);
  const [editUsercloudLink, setEditUsercloudLink] = useState<User["cloudLink"]>(cloudLink);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        // 'result' contains the data URL representing the file's data
        const imageDataURL = reader.result;
        setEditUserphoto(imageDataURL as string);
        setPreviewImage(imageDataURL);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEditClick = async () => {
    try {
      // await updateUser( UserId, editUsername, editUserphoto, editUsernumber, editUserposition);
      console.log("editusername", editUsername);
      // await updateUser( editUsername, editUserphoto, editUserfbLink, editUserigLink, editUserytLink, editUsercloudLink);

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
              UserInfo
            </Label>
            <div className="grid grid-cols-9 gap-4 flex items-center">
              <div className="col-span-2">Name:</div>
              <div className="col-span-6">
                <Input value={editUsername} onChange={(e) => setEditUsername(e.target.value)}  placeholder="editUsername"/>
              </div>
              <div/>
              <div className="col-span-2">fbLink:</div>
              <div className="col-span-6">
                <Input value={editUserfbLink} onChange={(e) => setEditUserfbLink(e.target.value)} placeholder="fbLink"/>
              </div>
              <div/>
              <div className="col-span-2">igLink:</div>
              <div className="col-span-6">
                <Input value={editUserigLink} onChange={(e) => setEditUserigLink(e.target.value)} placeholder="igLink"/>
              </div>
              <div className="col-span-2">ytLink:</div>
              <div className="col-span-6">
                <Input value={editUserytLink} onChange={(e) => setEditUserytLink(e.target.value)} placeholder="ytLink"/>
              </div>
              <div className="col-span-2">cloudLink:</div>
              <div className="col-span-6">
                <Input value={editUsercloudLink} onChange={(e) => setEditUsercloudLink(e.target.value)} placeholder="cloudLink"/>
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
