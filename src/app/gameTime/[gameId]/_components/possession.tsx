"use client";
import { Shuffle } from 'lucide-react';
import { useState } from "react";
type Props = {
    gamePossession: string;
    handlePossession: (possession: string) => void;
}

export default function Possession({ gamePossession, handlePossession }: Props) {
    const [possession, setPossession] = useState(gamePossession);
    return (
        <div className='relative'>
            <p className='absolute bottom-16 text-ring h-10 truncate'>Possession: {possession}</p>
            <button
            className="flex flex-col items-center justify-center w-full h-16 gap-1 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
            onClick={() => {
                setPossession(possession === "WE" ? "OP" : "WE");
                const newPossession = possession === "WE" ? "OP" : "WE";
                console.log("click Possession", newPossession);
                handlePossession(newPossession);
                console.log('finish Possession')
            }}
            > 
                    <Shuffle size={20}/>
                    <p>pos</p>
                    

            </button>
            </div>
    )
}