"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Flame } from 'lucide-react';
import { cn } from "@/lib/utils/shadcn";

type Props = {
    performanceId: string;
    onP1: boolean;
    onP2: boolean;
    onP3: boolean;
    onP4: boolean;
    onOt: boolean;
    handleChangeOnTime: (performanceId: string, item: string, newStatus: boolean) => void;

    nowPlay: boolean;
    handlePlayNow: (performanceId: string, nowPlay: boolean) => void;
}

export default function OnTimeRecord({ performanceId, onP1, onP2, onP3, onP4, onOt, handleChangeOnTime, nowPlay, handlePlayNow }: Props) {
    const [onP1Now, setOnP1Now] = useState(onP1);
    const [onP2Now, setOnP2Now] = useState(onP2);
    const [onP3Now, setOnP3Now] = useState(onP3);
    const [onP4Now, setOnP4Now] = useState(onP4);
    const [onOtNow, setOnOtNow] = useState(onOt);
    const router = useRouter();
    // let change = false;
    // if(!change  && onP1Now!==onP1){
    //     console.log("onP1Now", onP1Now);
    //     console.log("change", change);
    //     setOnP1Now(onP1);
    // }
    // if(!change &&onP2Now!==onP2){
    //     console.log("onP2Now", onP2Now);
    //     console.log("change", change);
    //     setOnP2Now(onP2);
    // }
    // if(!change &&onP3Now!==onP3){
    //     console.log("onP3Now", onP3Now);
    //     console.log("change", change);
    //     setOnP3Now(onP3);
    // }
    // if(!change &&onP4Now!==onP4){
    //     console.log("onP4Now", onP4Now);
    //     console.log("change", change);
    //     setOnP4Now(onP4);
    // }
    // if(!change && onOtNow!==onOt){
    //     console.log("onOtNow", onOtNow);
    //     console.log("change", change);
    //     setOnOtNow(onOt);
    // }

    useEffect(() => {
        setOnP1Now(onP1);
      },[onP1]);
    useEffect(() => {
        setOnP2Now(onP2);
      },[onP2]);
    useEffect(() => {
        setOnP3Now(onP3);
      },[onP3]);
    useEffect(() => {
        setOnP4Now(onP4);
      },[onP4]);
    useEffect(() => {
        setOnOtNow(onOt);
      },[onOt]);
    // useEffect(() => {
        
    
    return (
        <div className="flex">
            
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
                    // router.refresh();
                }}>P2</button>
                <button
                className={`rounded ${onP3Now ? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnP3Now(!onP3Now);
                    handleChangeOnTime(performanceId, "onP3", !onP3Now);
                    // router.refresh();
                }}>P3</button>
                <button
                className={`rounded ${onP4Now? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnP4Now(!onP4Now);
                    handleChangeOnTime(performanceId, "onP4", !onP4Now);
                    // router.refresh();
                }}>P4</button>
                <button
                className={`rounded ${onOtNow ? 'bg-amber-300' : 'bg-slate-50'}  text-black-50 shadow-sm flex w-25 items-center p-1 m-1`}
                onClick={()=>{
                    setOnOtNow(!onOtNow);
                    handleChangeOnTime(performanceId, "onOt", !onOtNow);
                    // router.refresh();
                }}>OT</button>
            </div>
            <div>
                <button
                className={cn(
                    "rounded text-black-50 shadow-sm flex w-15 items-center p-1 m-1",
                    nowPlay ? 'bg-rose-400' : 'bg-rose-100',
                )}
                onClick={() => {
                    // setNowPlay(!newNowPlay);
                    handlePlayNow(performanceId, !nowPlay);
                    router.refresh();
                    console.log("nowPlayRefresh", nowPlay);
                }}
                >
                    <div className= "flex items-center gap-1 py-1.5 px-2 transition-colors">
                        <Flame size={18}/>
                    </div>
                </button>
            </div>
        </div>
    )
}