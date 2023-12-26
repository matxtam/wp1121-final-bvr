"use client";
import { Button } from "@/components/ui/button";
import { Flame } from 'lucide-react';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/shadcn";
type Props = {
    performanceId: string;
    nowPlay: boolean;
    handlePlayNow: (performanceId: string, nowPlay: boolean) => void;
}

export default function PlayNowButton({ performanceId, nowPlay, handlePlayNow }: Props) {
    // const [ newNowPlay, setNowPlay] = useState(nowPlay);
    // console.log("usestate run!");
    // console.log("performanceId", performanceId);
    // const router = useRouter();
    return (
        <div>
            <button
            className={cn(
                "rounded text-black-50 shadow-sm flex w-15 items-center p-1 m-1",
                nowPlay ? 'bg-rose-400' : 'bg-rose-100',
            )}
            onClick={() => {
                // setNowPlay(!newNowPlay);
                handlePlayNow(performanceId, !nowPlay);
                // router.refresh();
            }}
            >
                <div className= "flex items-center gap-1 py-1.5 px-2 transition-colors">
                    <Flame size={18}/>
                </div>
            </button>
        </div>
    )
}