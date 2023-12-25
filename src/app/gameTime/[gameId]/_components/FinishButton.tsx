"use client";
import { Button } from "@/components/ui/button";

type Props = {
    handleFinish: () => void;
}

export default function FinishGame({ handleFinish}: Props) {    
    return (
        <div> 
            <Button onClick={() => {
                handleFinish();
            }}>
                Finish Game
            </Button>
        </div>
    )
}