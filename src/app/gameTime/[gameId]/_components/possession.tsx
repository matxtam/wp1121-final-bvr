"use client";
import { Button } from "@/components/ui/button";
import { Shuffle } from 'lucide-react';
import { useState } from "react";
type Props = {
    gamePossession: string;
    handlePossession: (possession: string) => void;
}

export default function Possession({ gamePossession, handlePossession }: Props) {
    const [possession, setPossession] = useState(gamePossession);
    return (

            <button
            className="flex items-center justify-center w-full h-10 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
            onClick={() => {
                setPossession(possession === "WE" ? "OP" : "WE");
                let newPossession = possession === "WE" ? "OP" : "WE";
                console.log("click Possession", newPossession);
                handlePossession(newPossession);
                console.log('finish Possession')
            }}
            > 
                    <Shuffle size={18}/>
                    {/* Possession: {possession} */}

            </button>
    )
}