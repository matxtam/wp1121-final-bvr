"use client"
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
type Props = {
    performanceId: string;
    foul: number;
    block: number;
    turnover: number;
    steal: number;
    assist: number;
    defReb: number;
    offReb: number;
    handleAddShooting: (selectedItem: string, performanceId: string, change: number) => void;
}

export default function AddOther({ performanceId, foul, block, turnover, steal, assist, defReb, offReb, handleAddShooting }: Props) {
    const [selectedButton, setSelectedButton] = useState("foul");
    const handleButtonClick = (buttonType:string) => {
        // Toggle the selected button
        setSelectedButton(buttonType);
      };
    
    const [count, setCount] = useState<number>(0);//set with foul
    const handleIncrement = () => {
        setCount((prevNumber) => prevNumber + 1);
        handleAddShooting(selectedButton, performanceId, 1);
    };
    
    const handleDecrement = () => {
        setCount((prevNumber) => prevNumber - 1);
        handleAddShooting(selectedButton, performanceId, -1);
    };

    return (
        <div className="flex flex-wrap flex-col items-center">
            <div className="flex flex-wrap flex-row">
                <Button
                    onClick={() => handleButtonClick('foul')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'foul' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    foul
                </Button>
                <Button
                    onClick={() => handleButtonClick('block')}
                    className={`bg-gray-300 m-2 px-4 py-2 ${
                    selectedButton === 'block' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    block
                </Button>
                <Button
                    onClick={() => handleButtonClick('assist')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'assist' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    assist
                </Button>
                <Button
                    onClick={() => handleButtonClick('steal')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'steal' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    steal
                </Button>
                <Button
                    onClick={() => handleButtonClick('turnover')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'turnover' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    turnover
                </Button>
                <Button
                    onClick={() => handleButtonClick('offReb')}
                    className={`bg-gray-300 m-2 px-4 py-2 ${
                    selectedButton === 'offReb' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    offReb
                </Button>
                <Button
                    onClick={() => handleButtonClick('defReb')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'defReb' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    defReb
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
            
        </div>
    )
}