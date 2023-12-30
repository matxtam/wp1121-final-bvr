"use client";
import { Calculator } from 'lucide-react';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils/shadcn";
type Props = {
    performanceId: string;
    openOrNot: boolean;
    handleOpenCalculator: (performanceId: string, openOrNot: boolean) => void;
}

export default function openCalculator({ performanceId, openOrNot, handleOpenCalculator}: Props) {
    return (

            <button
            aria-pressed={openOrNot}
            className="w-12 z-30 rounded-t text-black-50 shadow-sm flex items-center justify-center transition-all origin-bottom h-8 bg-transparent border-2 border-b-0 aria-pressed:scale-y-75 aria-pressed:bg-blue-600 aria-pressed:border-none"
            // className={cn(
            //     "w-10 z-30 translate-y-1 rounded-t text-black-50 shadow-sm flex items-center justify-center transition-all",
            //     openOrNot ? 'h-6 bg-blue-600' : 'h-8 bg-transparent border-2',
            // )}
            onClick={() => {
                handleOpenCalculator(performanceId, !openOrNot);
                console.log("openOrNot", openOrNot);
            }}
            >
                {/* <div className= "flex items-center gap-1 py-1.5 px-2 transition-colors"> */}
                    <Calculator size={12}/>

            </button>

    )
}