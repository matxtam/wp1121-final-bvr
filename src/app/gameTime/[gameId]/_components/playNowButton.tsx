"use client";
import { Flame } from 'lucide-react';
// import { useState } from "react";
import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils/shadcn";
type Props = {
    performanceId: string;
    nowPlay: boolean;
    handlePlayNow: (performanceId: string, nowPlay: boolean) => void;
}

export default function PlayNowButton({ performanceId, nowPlay, handlePlayNow }: Props) {
    // const [ newNowPlay, setNowPlay] = useState(nowPlay);
    // console.log("usestate run!");
    // console.log("performanceId", performanceId);
    const router = useRouter();
    return (
        <button
        // className={cn(
        //     "h-[1.75rem] w-10 z-30 translate-y-1 rounded-t text-black-50 shadow-sm flex items-center justify-center",
        //     nowPlay ? 'bg-rose-400' : 'bg-background border-2',
        // )}
        aria-pressed={nowPlay}
        className="w-12 z-30 rounded-t text-black-50 shadow-sm flex items-center justify-center transition-all origin-bottom h-8 bg-transparent border-2 border-b-0 aria-pressed:scale-y-75 aria-pressed:bg-destructive aria-pressed:border-none"
 
        onClick={() => {
            // setNowPlay(!newNowPlay);
            handlePlayNow(performanceId, !nowPlay);
            router.refresh();
        }}
        >
            <Flame size={18}/>
        </button>

    )
}