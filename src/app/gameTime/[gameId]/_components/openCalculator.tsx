"use client";
import { Calculator } from 'lucide-react';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/shadcn";
type Props = {
    performanceId: string;
    openOrNot: boolean;
    handleOpenCalculator: (performanceId: string, openOrNot: boolean) => void;
}

export default function openCalculator({ performanceId, openOrNot, handleOpenCalculator}: Props) {
    // const router = useRouter();
    return (
        <div>
            <button
            className={cn(
                "rounded-full text-black-50 shadow-sm flex w-15 items-center p-1 m-1",
                openOrNot ? 'bg-blue-600' : 'bg-transparent border-2',
            )}
            onClick={() => {
                handleOpenCalculator(performanceId, !openOrNot);
                console.log("openOrNot", openOrNot);
                // router.refresh();
            }}
            >
                <div className= "flex items-center gap-1 py-1.5 px-2 transition-colors">
                    <Calculator size={12}/>
                </div>
            </button>
        </div>
    )
}