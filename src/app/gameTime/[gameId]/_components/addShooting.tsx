"use client"
import { Button } from "@/components/ui/button";
import React, { use, useState, useEffect } from "react";
type Props = {
    performanceId: string;
    twoPt: number;
    threePt: number;
    ft: number;
    inTwoPt: number;
    inThreePt: number;
    inFt: number;
    handleAddShooting: (selectedItem: string, performanceId: string, newStatus: number, action:number) => void;
}
type ButtonType = 'twoPt' | 'threePt' | 'ft';

export default function AddShooting({ performanceId, twoPt, threePt, ft, inTwoPt, inThreePt, inFt, handleAddShooting }: Props) {
    const [selectedButton, setSelectedButton] = useState("twoPt");
    const [inSelectedButton, setInSelectedButton] = useState("inTwoPt");
    const [countTwoPt, setCountTwoPt] = useState<number>(twoPt);//set with twoPt
    const [inCountTwoPt, setInCountTwoPt] = useState<number>(inTwoPt);//set with inTwoPt
    const [countThreePt, setCountThreePt] = useState<number>(threePt);//set with threePt
    const [inCountThreePt, setInCountThreePt] = useState<number>(inThreePt);//set with inThreePt
    const [countFt, setCountFt] = useState<number>(ft);//set with ft
    const [inCountFt, setInCountFt] = useState<number>(inFt);//set with inFt

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
    // const buttonTypeMappings: Record<ButtonType, { count: number; inCount: number; inSelectedButton: string }> = {
    //     twoPt: { count: twoPt, inCount: inTwoPt, inSelectedButton: "inTwoPt" },
    //     threePt: { count: threePt, inCount: inThreePt, inSelectedButton: "inThreePt" },
    //     ft: { count: ft, inCount: inFt, inSelectedButton: "inFt" },
    //   };
      
      const handleButtonClick = (buttonType: ButtonType) => {
        // if (buttonTypeMappings.hasOwnProperty(buttonType)) {
        //   const { count, inCount, inSelectedButton } = buttonTypeMappings[buttonType];
        //   console.log("buttonType", buttonType);
        //   setSelectedButton(buttonType);
        //   setCount(count);
        //   setInCount(inCount);
        //   setInSelectedButton(inSelectedButton);
        // }
        setSelectedButton(buttonType);
        if(buttonType==="twoPt"){
            setCountTwoPt(countTwoPt)
            setInCountTwoPt(inCountTwoPt)
            setInSelectedButton("inTwoPt")
        }
        if(buttonType==="threePt"){
            setCountThreePt(countThreePt)
            setInCountThreePt(inCountThreePt)
            setInSelectedButton("inThreePt")
        }   
        if(buttonType==="ft"){
            setCountFt(countFt)
            setInCountFt(inCountFt)
            setInSelectedButton("inFt")
        }
      };

    useEffect(() => {
        setCountTwoPt(twoPt);  
    },[twoPt]);
    useEffect(() => {
        setCountThreePt(threePt);
    },[threePt]);
    useEffect(() => {
        setCountFt(ft);
    },[ft]);
    useEffect(() => {
        setInCountTwoPt(inTwoPt);
    },[inTwoPt]);
    useEffect(() => {
        setInCountThreePt(inThreePt);
    },[inThreePt]);
    useEffect(() => {
        setInCountFt(inFt);
    },[inFt]);
    
    
    const handleIncrement = () => {
        if(selectedButton==="twoPt"){
            setCountTwoPt((prevNumber) => prevNumber + 1);
            handleAddShooting(selectedButton, performanceId, countTwoPt+1, 2);
        }
        if(selectedButton==="threePt"){
            setCountThreePt((prevNumber) => prevNumber + 1);
            handleAddShooting(selectedButton, performanceId, countThreePt+1, 3);
        }
        if(selectedButton==="ft"){
            setCountFt((prevNumber) => prevNumber + 1);
            handleAddShooting(selectedButton, performanceId, countFt+1, 1);
        }
    };    
    const handleDecrement = () => {
        if(selectedButton==="twoPt"){
            setCountTwoPt((prevNumber) => prevNumber - 1);
            handleAddShooting(selectedButton, performanceId, countTwoPt-1, -2);
        }
        if(selectedButton==="threePt"){
            setCountThreePt((prevNumber) => prevNumber - 1);
            handleAddShooting(selectedButton, performanceId, countThreePt-1, -3);
        }
        if(selectedButton==="ft"){
            setCountFt((prevNumber) => prevNumber - 1);
            handleAddShooting(selectedButton, performanceId, countFt-1, -1);
        }
    };
    const handleInIncrement = () => {
        if(inSelectedButton==="inTwoPt"){
            setInCountTwoPt((prevNumber) => prevNumber + 1);
            handleAddShooting(inSelectedButton, performanceId, inCountTwoPt+1, 2);
        }
        if(inSelectedButton==="inThreePt"){
            setInCountThreePt((prevNumber) => prevNumber + 1);
            handleAddShooting(inSelectedButton, performanceId, inCountThreePt+1, 3);
        }
        if(inSelectedButton==="inFt"){
            setInCountFt((prevNumber) => prevNumber + 1);
            handleAddShooting(inSelectedButton, performanceId, inCountFt+1, 1);
        }
    }
    const handleInDecrement = () => {
        if(inSelectedButton==="inTwoPt"){
            setInCountTwoPt((prevNumber) => prevNumber - 1);
            handleAddShooting(inSelectedButton, performanceId, inCountTwoPt-1, -2);
        }
        if(inSelectedButton==="inThreePt"){
            setInCountThreePt((prevNumber) => prevNumber - 1);
            handleAddShooting(inSelectedButton, performanceId, inCountThreePt-1, -3);
        }
        if(inSelectedButton==="inFt"){
            setInCountFt((prevNumber) => prevNumber - 1);
            handleAddShooting(inSelectedButton, performanceId, inCountFt-1, -1);
        }
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
                {selectedButton==="twoPt" && <div className="p-4 bg-blue-100 m-2">{countTwoPt}</div>}
                {selectedButton==="threePt" && <div className="p-4 bg-blue-100 m-2">{countThreePt}</div>}
                {selectedButton==="ft" && <div className="p-4 bg-blue-100 m-2">{countFt}</div>}
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

                {inSelectedButton==="inTwoPt" &&(<div className="p-4 bg-blue-100 m-2">{inCountTwoPt}</div>)}
                {inSelectedButton==="inThreePt" && (<div className="p-4 bg-blue-100 m-2">{inCountThreePt}</div>)}
                {inSelectedButton==="inFt" && (<div className="p-4 bg-blue-100 m-2">{inCountFt}</div>)}
                <button onClick={handleInIncrement} className="p-2 m-2 bg-gray-300">
                    +
                </button>
            </div>
        </div>
    )
}