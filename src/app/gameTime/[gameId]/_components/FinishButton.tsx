"use client";
import { Button } from "@/components/ui/button";

type Props = {
    gameId: string;
    handleFinish: (nowGameId:string) => void;
}

export default function FinishGame({ gameId, handleFinish}: Props) {    
    return (
        <div> 
            <Button onClick={() => {
                handleFinish(gameId);
            }}>
                Finish Game
            </Button>
        </div>
    )
}