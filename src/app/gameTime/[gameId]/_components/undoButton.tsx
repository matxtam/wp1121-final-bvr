"use client";
import { Undo2 } from 'lucide-react';
// import { useRouter } from "next/navigation";
type Props = {
    handleUndo: () => void;
}

export default function UndoButton({ handleUndo }: Props) {
//    const router = useRouter();  
    return (
        <button
            className="flex items-center justify-center w-full h-10 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
            onClick={() => {
                console.log("Undo button clicked");
                handleUndo();
              }}
        >
            <Undo2 size={18} className=""/>
        </button>
    )
}