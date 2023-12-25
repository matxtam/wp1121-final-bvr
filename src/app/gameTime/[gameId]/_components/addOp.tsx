"use client";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';
import { useState } from "react";
type Props = {
    periodId: string;
    handleAddOpScore: (periodId: string, action: number) => void;
    handleAddOpFoul: (periodId: string, action: number) => void;
}

export default function AddOp({ periodId, handleAddOpScore, handleAddOpFoul }: Props) {

    return (
        <div className="flex">
            <div className="flex px-3">
                <b>OP Score: </b>
                <button
                className="mx-2 rounded-full bg-orange-300 text-black-50 shadow-sm flex w-25 items-center "
                onClick={() => {
                    handleAddOpScore(periodId, 1);
                }}
                >
                    <Plus size={24}/>
                </button>
                <b>/</b>
                <button
                className="mx-2 rounded-full bg-orange-300 text-black-50 shadow-sm flex w-25 items-center "
                onClick={() => {
                    handleAddOpScore(periodId, -1);
                }}
                >
                    <Minus size={24}/>
                </button>
            </div>
            <div className="flex px-3">
                <b>OP Foul: </b>
                <button
                className="mx-2 rounded-full bg-pink-300 text-black-50 shadow-sm flex w-25 items-center "
                onClick={() => {
                    handleAddOpFoul(periodId, 1);
                }}
                >
                    <Plus size={24}/>
                </button>
                <b>/</b>
                <button
                className="mx-2 rounded-full bg-pink-300 text-black-50 shadow-sm flex w-25 items-center "
                onClick={() => {
                    handleAddOpFoul(periodId, -1);
                }}
                >
                    <Minus size={24}/>
                </button>
            </div>
        </div>
    )
}