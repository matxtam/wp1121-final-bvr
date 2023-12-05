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
    handleAddShooting: (selectedItem: string, performanceId: string, newStatus: number) => void;
}
type ButtonType = 'twoPt' | 'threePt' | 'ft';

export default function AddShooting({ performanceId, twoPt, threePt, ft, inTwoPt, inThreePt, inFt, handleAddShooting }: Props) {
    const [selectedButton, setSelectedButton] = useState("twoPt");
    const [inSelectedButton, setInSelectedButton] = useState("inTwoPt");
    // const handleButtonClick = (buttonType:string) => {
    //     // Toggle the selected button
    //     setSelectedButton(buttonType);
    //     if(buttonType==="twoPt"){
    //         setCount(twoPt)
    //         setInCount(inTwoPt)
    //         setInSelectedButton("inTwoPt")
    //     }
    //     if(buttonType==="threePt"){
    //         setCount(threePt)
    //         setInCount(inThreePt)
    //         setInSelectedButton("inThreePt")
    //     }
    //     if(buttonType==="ft"){
    //         setCount(ft)
    //         setInCount(inFt)
    //         setInSelectedButton("inFt")
    //     }
    //   };
    const buttonTypeMappings: Record<ButtonType, { count: number; inCount: number; inSelectedButton: string }> = {
        twoPt: { count: twoPt, inCount: inTwoPt, inSelectedButton: "inTwoPt" },
        threePt: { count: threePt, inCount: inThreePt, inSelectedButton: "inThreePt" },
        ft: { count: ft, inCount: inFt, inSelectedButton: "inFt" },
      };
      
      const handleButtonClick = (buttonType: ButtonType) => {
        if (buttonTypeMappings.hasOwnProperty(buttonType)) {
          const { count, inCount, inSelectedButton } = buttonTypeMappings[buttonType];
          console.log("buttonType", buttonType);
          setSelectedButton(buttonType);
          setCount(count);
          setInCount(inCount);
          setInSelectedButton(inSelectedButton);
        }
      };

    
    
    const [count, setCount] = useState<number>(twoPt);//set with twoPt
    const [inCount, setInCount] = useState<number>(inTwoPt);//set with inTwoPt
    const handleIncrement = () => {
        setCount((prevNumber) => prevNumber + 1);
        handleAddShooting(selectedButton, performanceId, count+1);
    };    
    const handleDecrement = () => {
        setCount((prevNumber) => prevNumber - 1);
        handleAddShooting(selectedButton, performanceId, count-1);
    };
    const handleInIncrement = () => {
        setInCount((prevNumber) => prevNumber + 1);
        handleAddShooting(inSelectedButton, performanceId, inCount+1);
    }
    const handleInDecrement = () => {
        setInCount((prevNumber) => prevNumber - 1);
        handleAddShooting(inSelectedButton, performanceId, inCount-1);
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