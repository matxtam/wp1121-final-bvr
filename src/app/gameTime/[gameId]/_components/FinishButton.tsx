"use client";
import { Square } from "lucide-react";

type Props = {
    gameId: string;
    handleFinish: (nowGameId:string) => void;
}

export default function FinishGame({ gameId, handleFinish}: Props) {    
    return (
        <div> 
            <button onClick={() => {
                handleFinish(gameId);
            }}
            className="flex items-center justify-center w-full h-10 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
            >
                <Square size={18}/>
            </button>
        </div>
    )
}