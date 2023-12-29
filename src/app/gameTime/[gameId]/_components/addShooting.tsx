"use client"
import { Button } from "@/components/ui/button";
import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
    undo: boolean;
    handleAddShooting: (selectedItem: string, performanceId: string, newStatus: number, action:number) => void;
    handleCancelUndo: (performanceId: string) => void;
}
type ButtonType = 'twoPt' | 'threePt' | 'ft' | 'inTwoPt' | 'inThreePt' | 'inFt';

export default function AddShooting({ performanceId, twoPt, threePt, ft, inTwoPt, inThreePt, inFt, handleAddShooting, openCalculator, undo, handleCancelUndo }: Props) {
    const [selectedButton, setSelectedButton] = useState("");
    const [inSelectedButton, setInSelectedButton] = useState("");
    const [countTwoPt, setCountTwoPt] = useState<number>(twoPt);//set with twoPt
    const [inCountTwoPt, setInCountTwoPt] = useState<number>(inTwoPt);//set with inTwoPt
    const [countThreePt, setCountThreePt] = useState<number>(threePt);//set with threePt
    const [inCountThreePt, setInCountThreePt] = useState<number>(inThreePt);//set with inThreePt
    const [countFt, setCountFt] = useState<number>(ft);//set with ft
    const [inCountFt, setInCountFt] = useState<number>(inFt);//set with inFt
    const [ifUndo, setIfUndo] = useState<boolean>(undo);
    const router = useRouter();
    if(undo && (countFt!==ft || countThreePt!==threePt || countTwoPt!==twoPt || inCountFt!==inFt || inCountThreePt!==inThreePt || inCountTwoPt!==inTwoPt)){
        setCountTwoPt(twoPt);
        setCountThreePt(threePt);
        setCountFt(ft);
        setInCountTwoPt(inTwoPt);
        setInCountThreePt(inThreePt);
        setInCountFt(inFt);
        setIfUndo(!undo);    
        handleCancelUndo(performanceId);
        router.refresh();
    }
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
                    <p  className={`p-1 ${
                    selectedButton === 'twoPt' ? 'text-yellow-400' : ''
                    }`}><b>{countTwoPt}</b></p>
                </Button>
                <Button
                    onClick={() => handleButtonClick('threePt')}
                    className={`bg-gray-300 m-2 px-4 py-2 ${
                    selectedButton === 'threePt' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    3
                    <p  className={`p-1 ${
                    selectedButton === 'threePt' ? 'text-yellow-400' : ''
                    }`}><b>{countThreePt}</b></p>
                </Button>
                <Button
                    onClick={() => handleButtonClick('ft')}
                    className={`bg-gray-300 px-4 m-2 py-2 ${
                    selectedButton === 'ft' ? 'bg-blue-400 text-white' : ''
                    }`}
                >
                    FT
                    <p  className={`p-1 ${
                    selectedButton === 'ft' ? 'text-yellow-400' : ''
                    }`}><b>{countFt}</b></p>
                </Button>
            </div>

            {openCalculator && <div className="flex items-center">
                <p className="p-1">
                    <b>投球數</b>
                </p>
                <button onClick={handleDecrement} className="p-2 m-2 bg-gray-300">
                    -
                </button>
                {selectedButton==="twoPt" && (<div className="p-4 bg-blue-100 m-2">{countTwoPt}</div>)}
                {selectedButton==="threePt" && (<div className="p-4 bg-blue-100 m-2">{countThreePt}</div>)}
                {selectedButton==="ft" && (<div className="p-4 bg-blue-100 m-2">{countFt}</div>)}
                <button onClick={handleIncrement} className="p-2 m-2 bg-gray-300">
                    +
                </button>
            </div>}
            

            <Button
                onClick={() => handleInButtonClick('inTwoPt')}
                className={`bg-gray-300 px-4 m-2 py-2 ${
                inSelectedButton === 'inTwoPt' ? 'bg-blue-400 text-white' : ''
                }`}
            >
                2In
                <p  className={`p-1 ${
                selectedButton === 'inTwoPt' ? 'text-yellow-400' : ''
                }`}><b>{inCountTwoPt}</b></p>
            </Button>
            <Button
                onClick={() => handleInButtonClick('inThreePt')}
                className={`bg-gray-300 m-2 px-4 py-2 ${
                inSelectedButton === 'inThreePt' ? 'bg-blue-400 text-white' : ''
                }`}
            >
                3In
                <p  className={`p-1 ${
                inSelectedButton === 'inThreePt' ? 'text-yellow-400' : ''
                }`}><b>{inCountThreePt}</b></p>
            </Button>
            <Button
                onClick={() => handleInButtonClick('inFt')}
                className={`bg-gray-300 px-4 m-2 py-2 ${
                inSelectedButton === 'inFt' ? 'bg-blue-400 text-white' : ''
                }`}
            >
                FTIn
                <p  className={`p-1 ${
                selectedButton === 'inFt' ? 'text-yellow-400' : ''
                }`}><b>{inCountFt}</b></p>
            </Button>

            {openCalculator &&<div className="flex items-center">
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
            </div>}
        </div>
    )
}