"use client";

import { useState } from "react";
import { type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { PenSquare, ExternalLink } from "lucide-react"

type Props = {
  link:string,
  handleSave:(link:string)=>void,
}

export default function YtLink ({ link, handleSave }:Props){
  const [edit, setEdit] = useState(false);
  const handleEnter = (e:KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      console.log(e.currentTarget.value);
      handleSave(e.currentTarget.value ?? "");
      setEdit(false);
    }
  }
  return (
    edit ? 
    <Input 
      onKeyDown={e => handleEnter(e)}
      className="w-full p-2 bg-background" 
      placeholder="Enter link..." 
      defaultValue={link}
    ></Input>
    : 
    <div className="flex flex-row items-center gap-2">
      {link ? 
      <a href={link} target="_blank" rel="noreferrer" className="flex items-center w-max text-muted-foreground border-muted-foreground hover:border-b-2"><p>youtube video</p><ExternalLink size={16}/></a> : 
      <p>no youtube link</p>}
      <Button onClick={() => setEdit(true)} className="border-none">
        <PenSquare size={16} className="text-muted-foreground hover:text-muted-foreground/50"/>
      </Button>
    </div>
  )
}