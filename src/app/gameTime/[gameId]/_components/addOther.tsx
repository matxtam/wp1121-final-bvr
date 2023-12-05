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
    handleAddOther: (selectedItem: string, performanceId: string, newStatus: number) => void;
}
type ButtonType = 'foul' | 'block' | 'turnover' | 'steal' | 'assist' | 'defReb' | 'offReb';

export default function AddOther({ performanceId, foul, block, turnover, steal, assist, defReb, offReb, handleAddOther }: Props) {
    const [selectedButton, setSelectedButton] = useState("foul");
    const buttonTypeMappings: Record<ButtonType, { count: number }> = {
        foul: { count: foul },
        block: { count: block },
        turnover: { count: turnover },
        steal: { count: steal },
        assist: { count: assist },
        defReb: { count: defReb },
        offReb: { count: offReb },
      };    
    const handleButtonClick = (buttonType:ButtonType) => {
        if (buttonTypeMappings.hasOwnProperty(buttonType)) {
          const { count } = buttonTypeMappings[buttonType];
          setSelectedButton(buttonType);
          setCount(count);
        }
      };
    
    const [count, setCount] = useState<number>(foul);//set with foul
    const handleIncrement = () => {
        setCount((prevNumber) => prevNumber + 1);
        handleAddOther(selectedButton, performanceId, count+1);
    };
    
    const handleDecrement = () => {
        setCount((prevNumber) => prevNumber - 1);
        handleAddOther(selectedButton, performanceId, count-1);
    };

    return (
        <div className="flex flex-wrap flex-col items-center">
            <div className="flex flex-wrap flex-row">
                <Button
                    onClick={() => handleButtonClick('foul')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'foul' ? 'bg-indigo-400 text-white' : ''
                    }`}
                >
                    FOUL
                </Button>
                <Button
                    onClick={() => handleButtonClick('block')}
                    className={`bg-gray-300 m-2 px-4 py-2 ${
                    selectedButton === 'block' ? 'bg-indigo-400 text-white' : ''
                    }`}
                >
                    BLOCK
                </Button>
                <Button
                    onClick={() => handleButtonClick('assist')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'assist' ? 'bg-indigo-400 text-white' : ''
                    }`}
                >
                    ASS
                </Button>
                <Button
                    onClick={() => handleButtonClick('steal')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'steal' ? 'bg-indigo-400 text-white' : ''
                    }`}
                >
                    STL
                </Button>
                <Button
                    onClick={() => handleButtonClick('turnover')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'turnover' ? 'bg-indigo-400 text-white' : ''
                    }`}
                >
                    TO
                </Button>
                <Button
                    onClick={() => handleButtonClick('offReb')}
                    className={`bg-gray-300 m-2 px-4 py-2 ${
                    selectedButton === 'offReb' ? 'bg-indigo-400 text-white' : ''
                    }`}
                >
                    OFFREB
                </Button>
                <Button
                    onClick={() => handleButtonClick('defReb')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'defReb' ? 'bg-indigo-400 text-white' : ''
                    }`}
                >
                    DEFREB
                </Button>
            </div>

            <div className="flex items-center">
                <p className="p-1">
                    <b>投球數</b>
                </p>
                <button onClick={handleDecrement} className="p-2 m-2 bg-gray-300">
                    -
                </button>
                <div className="p-4 bg-indigo-100 m-2">{count}</div>
                <button onClick={handleIncrement} className="p-2 m-2 bg-gray-300">
                    +
                </button>
            </div>
            
        </div>
    )
}