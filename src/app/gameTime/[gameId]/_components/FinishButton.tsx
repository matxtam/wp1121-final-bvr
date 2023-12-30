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
            className="flex flex-col items-center justify-center w-full h-16 gap-1 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
            >
                <Square size={20}/>
                <p>finish</p>
            </button>
        </div>
    )
}