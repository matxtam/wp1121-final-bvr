"use client"
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
type Props = {
    performanceId: string;
    twoPt: number;
    threePt: number;
    ft: number;
    inTwoPt: number;
    inThreePt: number;
    inFt: number;
    handleAddShooting: (selectedItem: string, performanceId: string, change: number) => void;
}

export default function AddOther({ performanceId, twoPt, threePt, ft, inTwoPt, inThreePt, inFt, handleAddShooting }: Props) {
    const [selectedButton, setSelectedButton] = useState("twoPt");
    const handleButtonClick = (buttonType:string) => {
        // Toggle the selected button
        setSelectedButton(buttonType);
      };
    
    const [count, setCount] = useState<number>(0);//set with twoPt
    const [inCount, setInCount] = useState<number>(0);//set with inTwoPt
    const handleIncrement = () => {
        setCount((prevNumber) => prevNumber + 1);
        handleAddShooting(selectedButton, performanceId, 1);
    };
    
    const handleDecrement = () => {
        setCount((prevNumber) => prevNumber - 1);
        handleAddShooting(selectedButton, performanceId, -1);
    };
    const handleInIncrement = () => {
        setInCount((prevNumber) => prevNumber + 1);
        handleAddShooting(selectedButton, performanceId, 1);
    }
    const handleInDecrement = () => {
        setInCount((prevNumber) => prevNumber - 1);
        handleAddShooting(selectedButton, performanceId, -1);
    }


    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row">
                <Button
                    onClick={() => handleButtonClick('twoPt')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'twoPt' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    2
                </Button>
                <Button
                    onClick={() => handleButtonClick('threePt')}
                    className={`bg-gray-300 m-2 px-4 py-2 ${
                    selectedButton === 'threePt' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    3
                </Button>
                <Button
                    onClick={() => handleButtonClick('ft')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'ft' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    FT
                </Button>
            </div>

            <div className="flex items-center">
                <p className="p-1">
                    <b>投球數</b>
                </p>
                <button onClick={handleDecrement} className="p-2 m-2 bg-gray-300">
                    -
                </button>
                <div className="p-4 bg-blue-100 m-2">{count}</div>
                <button onClick={handleIncrement} className="p-2 m-2 bg-gray-300">
                    +
                </button>
            </div>
            <div className="flex items-center">
                <p className="p-1">
                    <b>進球數</b>
                </p>
                <button onClick={handleInDecrement} className="p-2 m-2 bg-gray-300">
                    -
                </button>
                <div className="p-4 bg-blue-100 m-2">{inCount}</div>
                <button onClick={handleInIncrement} className="p-2 m-2 bg-gray-300">
                    +
                </button>
            </div>
        </div>
    )
}