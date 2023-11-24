'use client';
import { Button } from "@/components/ui/button";
import { is } from "drizzle-orm";
import { useState } from "react";
type Props = {
    gameId: string;
    handlePeriod: (isStartPeriod: boolean, gameId:string) => void;
}

export default function StartPeriod({ gameId, handlePeriod }: Props) {
    const [isStartPeriod, setIsStartPeriod] = useState(false);
    return (
        <Button
        onClick={() => {
            setIsStartPeriod(isStartPeriod === true ? false : true);
            handlePeriod(isStartPeriod, gameId);
        }}
        >
                {!isStartPeriod ? "Start Period" : "End Period"}
        </Button>
        
    )
}