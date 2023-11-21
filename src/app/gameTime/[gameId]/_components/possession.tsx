"use client";
import { Button } from "@/components/ui/button";
import { Shuffle } from 'lucide-react';
import { useState } from "react";
type Props = {
    gamePossession: string;
    handlePossession: (gamePossession: string) => void;
}

export default function Possession({ gamePossession, handlePossession }: Props) {
    const [possession, setPossession] = useState(gamePossession);
    return (
        <div>
            <button
            className="rounded bg-sky-500 text-slate-50 shadow-sm hover:bg-sky-200/80 flex w-25 items-center hover:text-black"
            onClick={() => {
                setPossession(possession === "WE" ? "OP" : "WE");
                console.log("click Possession");
                handlePossession(gamePossession);
            }}
            >
                <div className= "flex items-center gap-1 py-1.5 px-2 transition-colors duration-300 hover:bg-brand/10">
                    <Shuffle size={18}/>
                    Possession: {possession}
                </div>
            </button>
        </div>
    )
}