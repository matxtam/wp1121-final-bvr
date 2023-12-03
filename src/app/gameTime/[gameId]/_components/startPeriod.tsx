'use client';
import { Button } from "@/components/ui/button";
import { is } from "drizzle-orm";
import { useState } from "react";
type Props = {
    gameId: string;
    handlePeriod: (gameId:string, number:string) => void;
    periodNumber: number;
}

export default function StartPeriod({ gameId, handlePeriod, periodNumber }: Props) {
    // const [isStartPeriod, setIsStartPeriod] = useState(!(periodNumber === 0));
    let disabled = false;
    let passInData = (periodNumber+1).toString();
    if(periodNumber === 4) {
        passInData = "OT"
    }
    let nowPeriod = `Start Period ${(periodNumber+1).toString()}`;
    if(periodNumber === 4) {
        nowPeriod = "Start Period OT"
    }
    if(periodNumber === 5) {
        disabled=true
        nowPeriod = "End"
    }

    console.log("nowPeriod", nowPeriod);
    return (
        <Button
        onClick={() => {
            handlePeriod(gameId, passInData);
        }}
        disabled={disabled}
        >
                {nowPeriod}
        </Button>
        
    )
}