"use client";
import { Button } from "@/components/ui/button";
import { Undo2 } from 'lucide-react';
import { useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
    handleUndo: () => void;
}

export default function UndoButton({ handleUndo }: Props) {
   const router = useRouter();  
    return (
        <div>
            <button
            className="rounded bg-sky-500 text-slate-50 shadow-sm hover:bg-sky-200/80 flex w-25 items-center hover:text-black"
            onClick={() => {
                handleUndo();
            }}
            >
                <div className= "flex items-center gap-1 py-1.5 px-2 transition-colors duration-300 hover:bg-brand/10">
                    <Undo2 size={18}/>
                </div>
            </button>
        </div>
    )
}