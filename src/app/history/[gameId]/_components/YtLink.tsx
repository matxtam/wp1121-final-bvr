"use client";

import { useState } from "react";
import { type KeyboardEvent } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { PenSquare } from "lucide-react"


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
    <Input onKeyDown={e => handleEnter(e)}></Input>
    : 
    <div className="flex flex-row">
     <a href={link} target="_blank">{link}</a>
      <Button onClick={() => setEdit(true)}>
        <PenSquare></PenSquare>
      </Button>
    </div>
  )
}