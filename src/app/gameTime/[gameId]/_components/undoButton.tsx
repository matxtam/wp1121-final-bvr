"use client";
import { Button } from "@/components/ui/button";
import { Undo2 } from 'lucide-react';
import { useState } from "react";
type Props = {
    handleUndo: () => void;
}

export default function UndoButton({ handleUndo }: Props) {
   
    return (
        <button
            className="flex items-center justify-center w-full h-10 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
            onClick={handleUndo}
        >
            <Undo2 size={18} className=""/>
        </button>
    )
}