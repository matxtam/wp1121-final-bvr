"use client"
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils/shadcn";
import { set } from "zod";
type Props = {
    performanceId: string;
    twoPt: number;
    threePt: number;
    ft: number;
    inTwoPt: number;
    inThreePt: number;
    inFt: number;
    openCalculator: boolean;
    handleAddShooting: (selectedItem: string, performanceId: string, newStatus: number, action:number) => void;
}
type ButtonType = 'twoPt' | 'threePt' | 'ft' | 'inTwoPt' | 'inThreePt' | 'inFt';

export default function AddShooting({ performanceId, twoPt, threePt, ft, inTwoPt, inThreePt, inFt, handleAddShooting, openCalculator }: Props) {
    const [selectedButton, setSelectedButton] = useState("");
    const [inSelectedButton, setInSelectedButton] = useState("");
    const [countTwoPt, setCountTwoPt] = useState<number>(twoPt);//set with twoPt
    const [inCountTwoPt, setInCountTwoPt] = useState<number>(inTwoPt);//set with inTwoPt
    const [countThreePt, setCountThreePt] = useState<number>(threePt);//set with threePt
    const [inCountThreePt, setInCountThreePt] = useState<number>(inThreePt);//set with inThreePt
    const [countFt, setCountFt] = useState<number>(ft);//set with ft
    const [inCountFt, setInCountFt] = useState<number>(inFt);//set with inFt

    const [inClicked, setInClicked] = useState(true);
      
      const handleButtonClick = (buttonType: ButtonType) => {
        setSelectedButton(buttonType);
        if(buttonType==="twoPt"){
            // setSelectedButton("twoPt");
            setCountTwoPt(countTwoPt)
            setCountTwoPt((prevNumber) => prevNumber + 1);
            // setInCountTwoPt(inCountTwoPt)
            // setInSelectedButton("inTwoPt")
            handleAddShooting("twoPt", performanceId, countTwoPt+1, 2);
        }
        if(buttonType==="threePt"){
            // setSelectedButton("threePt")
            setCountThreePt(countThreePt)
            setCountThreePt((prevNumber) => prevNumber + 1);
            // setInCountThreePt(inCountThreePt)
            // setInSelectedButton("inThreePt")
            handleAddShooting("threePt", performanceId, countThreePt+1, 3);
        }   
        if(buttonType==="ft"){
            setCountFt(countFt)
            // setSelectedButton("ft")
            setCountFt((prevNumber) => prevNumber + 1);
            // setInCountFt(inCountFt)
            // setInSelectedButton("inFt")
            handleAddShooting("ft", performanceId, countFt+1, 1);
        }
      }
      const handleInButtonClick = (buttonType: ButtonType) => {
        setInSelectedButton(buttonType);
        if(buttonType==="inTwoPt"){
            setInCountTwoPt(inCountTwoPt)
            setInCountTwoPt((prevNumber) => prevNumber + 1);
            // setInSelectedButton("inTwoPt")
            handleAddShooting("inTwoPt", performanceId, inCountTwoPt+1, 2);
        }
        if(buttonType==="inThreePt"){
            setInCountThreePt(inCountThreePt)
            setInCountThreePt((prevNumber) => prevNumber + 1);
            // setInSelectedButton("inThreePt")
            handleAddShooting("inThreePt", performanceId, inCountThreePt+1, 3);
        }
        if(buttonType==="inFt"){
            setInCountFt(inCountFt)
            setInCountFt((prevNumber) => prevNumber + 1);
            // setInSelectedButton("inFt")
            handleAddShooting("inFt", performanceId, inCountFt+1, 1);
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
        console.log("hello?")
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
    <div className="grid grid-cols-3 items-center justify-center content-center justify-items-center mb-8">
        
        <div className="col-start-1 flex flex-col relative items-center">
            <Button
                onClick={() => {handleButtonClick('twoPt'); setInClicked(false);}}
                className={`bg-transparent w-20  m-2 ${
                selectedButton === 'twoPt' ? 'bg-blue-600 text-white' : ''
                }`}
            >
                2pt
                <p  className={`p-1 ${
                selectedButton === 'twoPt' ? 'text-yellow-400' : ''
                }`}><b>{`${inCountTwoPt}/${countTwoPt}`}</b></p>
            </Button>
            {(selectedButton === 'twoPt') && (!inClicked) &&
            <Button
                onClick={() => {handleInButtonClick('inTwoPt'); setInClicked(true); }}
                className={`absolute top-12 left-8 right-0 z-50 bg-ring/30 w-8 h-8  rounded-full border-none ${""
                // inSelectedButton === 'inTwoPt' ? 'bg-blue-600 text-white' : ''
                }`}
            >In?
            </Button>}
            {/* <p className={`p-1 text-center font-bold ${selectedButton === 'inTwoPt' ? 'text-yellow-400' : ''}`}>
                {`2In:${inCountTwoPt}`}
            </p> */}
        </div>

        <div className="flex flex-col relative">
            <Button
                onClick={() => {handleButtonClick('threePt'); setInClicked(false);}}
                className={`bg-transparent w-20  m-2 ${
                selectedButton === 'threePt' ? 'bg-blue-600 text-white' : ''
                }`}
            >
                3pt
                <p  className={`p-1 ${
                selectedButton === 'threePt' ? 'text-yellow-400' : ''
                }`}><b>{`${inCountThreePt}/${countThreePt}`}</b></p>
            </Button>
            {(selectedButton === 'threePt') && (!inClicked) &&
            <Button
                onClick={() => {handleInButtonClick('inThreePt'); setInClicked(true);}}
                className={`absolute top-12 left-8 right-0 z-50 bg-ring/30 w-8 h-8  rounded-full border-none ${""
                // inSelectedButton === 'inThreePt' ? 'bg-blue-600 text-white' : ''
                }`}
            >In?
            </Button>}
            {/* <p className={`p-1 text-center font-bold ${selectedButton === 'inThreePt' ? 'text-yellow-400' : ''}`}>
                {`3In:${inCountThreePt}`}
            </p> */}
        </div>
        
        <div className="flex flex-col relative">
            <Button
                onClick={() => {handleButtonClick('ft'); setInClicked(false)}}
                className={`bg-transparent w-20  m-2 ${
                selectedButton === 'ft' ? 'bg-blue-600 text-white' : ''
                }`}
            >
                FT
                <p  className={`p-1 ${
                selectedButton === 'ft' ? 'text-yellow-400' : ''
                }`}><b>{`${inCountFt}/${countFt}`}</b></p>
            </Button>
            {(selectedButton === 'ft') && (!inClicked) &&
            <Button
                onClick={() => {handleInButtonClick('inFt'); setInClicked(true)}}
                className={`absolute top-12 left-8 right-0 z-50 bg-ring/30 w-8 h-8  rounded-full border-none ${""
                // inSelectedButton === 'inFt' ? 'bg-blue-600 text-white' : ''
                }`}
            >In?
            </Button>}
            {/* <p className={`p-1 text-center font-bold ${selectedButton === 'inFt' ? 'text-yellow-400' : ''}`}>
                {`3In:${inCountFt}`}
            </p> */}
        </div>

        
        {openCalculator &&
        <div className={cn("flex bg-transparent relative h-0 w-full",
            (inSelectedButton==="inTwoPt") && "col-start-1",
            (inSelectedButton==="inThreePt") && "col-start-2",
            (inSelectedButton==="inFt") && "col-start-3",
        )}>
            {/* <p className="p-1">
                <b>進球數</b>
            </p> */}
            <button onClick={handleInDecrement} className="absolute -bottom-6 left-0 px-2 bg-muted rounded-full">
                -
            </button>
            {/* {inSelectedButton==="inTwoPt" &&(<div className="p-4 bg-blue-100 m-2">{inCountTwoPt}</div>)}
            {inSelectedButton==="inThreePt" && (<div className="p-4 bg-blue-100 m-2">{inCountThreePt}</div>)}
            {inSelectedButton==="inFt" && (<div className="p-4 bg-blue-100 m-2">{inCountFt}</div>)} */}
            <button onClick={handleInIncrement} className="absolute bottom-12 left-0 px-2 bg-muted rounded-full">
                +
            </button>
        </div>}
        {openCalculator && 
        <div className={cn("flex bg-transparent relative h-0 w-full",
            (selectedButton==="twoPt") && "col-start-1",
            (selectedButton==="threePt") && "col-start-2",
            (selectedButton==="ft") && "col-start-3",
        )}>
            {/* <p className="p-1">
                <b>投球數</b>
            </p> */}
            <button onClick={handleDecrement} className="absolute -bottom-6 z-50 right-0 px-2 bg-muted rounded-full">
                -
            </button>
            {/* {selectedButton==="twoPt" && (<div className="p-4 bg-blue-100 m-2">{countTwoPt}</div>)}
            {selectedButton==="threePt" && (<div className="p-4 bg-blue-100 m-2">{countThreePt}</div>)}
            {selectedButton==="ft" && (<div className="p-4 bg-blue-100 m-2">{countFt}</div>)} */}
            <button onClick={handleIncrement} className="absolute bottom-12 right-0 px-2 bg-muted rounded-full">
                +
            </button>
        </div>}
    </div>
    )
}