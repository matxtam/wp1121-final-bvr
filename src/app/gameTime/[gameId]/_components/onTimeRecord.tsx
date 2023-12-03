"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
    performanceId: string;
    onP1: boolean;
    onP2: boolean;
    onP3: boolean;
    onP4: boolean;
    onOt: boolean;
    handleChangeOnTime: (performanceId: string, item: string, newStatus: boolean) => void;
}

export default function OnTimeRecord({ performanceId, onP1, onP2, onP3, onP4, onOt, handleChangeOnTime }: Props) {
    const [onP1Now, setOnP1Now] = useState(onP1);
    const [onP2Now, setOnP2Now] = useState(onP2);
    const [onP3Now, setOnP3Now] = useState(onP3);
    const [onP4Now, setOnP4Now] = useState(onP4);
    const [onOtNow, setOnOtNow] = useState(onOt);
    
    
    return (
        <div>
            
            <div className="flex items-center">
            <h1>OnTime: </h1>
                <button
                className={`rounded ${onP1Now ? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnP1Now(!onP1Now);
                    handleChangeOnTime(performanceId, "onP1", !onP1Now);
                }}>P1</button>
                <button
                className={`rounded ${onP2Now ? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnP2Now(!onP2Now);
                    handleChangeOnTime(performanceId, "onP2", !onP2Now);
                }}>P2</button>
                <button
                className={`rounded ${onP3Now ? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnP3Now(!onP3Now);
                    handleChangeOnTime(performanceId, "onP3", !onP3Now);
                }}>P3</button>
                <button
                className={`rounded ${onP4Now ? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnP4Now(!onP4Now);
                    handleChangeOnTime(performanceId, "onP4", !onP4Now);
                }}>P4</button>
                <button
                className={`rounded ${onOtNow ? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnOtNow(!onOtNow);
                    handleChangeOnTime(performanceId, "onOt", !onOtNow);
                }}>OT</button>
            </div>

        </div>
    )
}