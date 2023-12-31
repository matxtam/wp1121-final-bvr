"use client"
import { Button } from "@/components/ui/button";
import React, {useState, useEffect } from "react";
type Props = {
    performanceId: string;
    foul: number;
    block: number;
    turnover: number;
    steal: number;
    assist: number;
    defReb: number;
    offReb: number;
    openCalculator: boolean;
    handleAddOther: (selectedItem: string, performanceId: string, newStatus: number, action: number) => void;
}
type ButtonType = 'foul' | 'block' | 'turnover' | 'steal' | 'assist' | 'defReb' | 'offReb';

export default function AddOther({ performanceId, foul, block, turnover, steal, assist, defReb, offReb, handleAddOther, openCalculator }: Props) {
    const [selectedButton, setSelectedButton] = useState("");
    const [countFoul, setCountFoul] = useState<number>(foul);//set with foul
    const [countBlock, setCountBlock] = useState<number>(block);//set with block
    const [countTurnover, setCountTurnover] = useState<number>(turnover);//set with turnover
    const [countSteal, setCountSteal] = useState<number>(steal);//set with steal
    const [countAssist, setCountAssist] = useState<number>(assist);//set with assist
    const [countDefReb, setCountDefReb] = useState<number>(defReb);//set with defReb
    const [countOffReb, setCountOffReb] = useState<number>(offReb);//set with offReb
    
    const handleButtonClick = (buttonType:ButtonType) => {
        setSelectedButton(buttonType);
            if(buttonType==="foul"){
              setCountFoul(countFoul);
              setCountFoul((prevNumber) => prevNumber + 1);
              handleAddOther("foul", performanceId, countFoul+1, 1);
            }
            if(buttonType==="block"){
                setCountBlock(countBlock);
                setCountBlock((prevNumber) => prevNumber + 1);
                handleAddOther("block", performanceId, countBlock+1, 1);
            }
            if(buttonType==="turnover"){
                setCountTurnover(countTurnover);
                setCountTurnover((prevNumber) => prevNumber + 1);
                handleAddOther("turnover", performanceId, countTurnover+1, 1);
            }
            if(buttonType==="steal"){
                setCountSteal(countSteal);
                setCountSteal((prevNumber) => prevNumber + 1);
                handleAddOther("steal", performanceId, countSteal+1, 1);
            }
            if(buttonType==="assist"){
                setCountAssist(countAssist);
                setCountAssist((prevNumber) => prevNumber + 1);
                handleAddOther("assist", performanceId, countAssist+1, 1);
            }
            if(buttonType==="defReb"){
                setCountDefReb(countDefReb);
                setCountDefReb((prevNumber) => prevNumber + 1);
                handleAddOther("defReb", performanceId, countDefReb+1, 1);
            }
            if(buttonType==="offReb"){
                setCountOffReb(countOffReb);
                setCountOffReb((prevNumber) => prevNumber + 1);
                handleAddOther("offReb", performanceId, countOffReb+1, 1);
            }
      };
    useEffect(() => {
        setCountFoul(foul);
      },[foul]);
    useEffect(() => {
        setCountBlock(block);
      },[block]);
    useEffect(() => {
        setCountTurnover(turnover);
      },[turnover]);
    useEffect(() => {
        setCountSteal(steal);
      },[steal]);
    useEffect(() => {
        setCountAssist(assist);
      },[assist]);
    useEffect(() => {
        setCountDefReb(defReb);
      },[defReb]);
    useEffect(() => {
        setCountOffReb(offReb);
      },[offReb]);
    
    // if(countBlock!==block && selectedButton==="block"){
    //     router.refresh();
    // }
    // if(countTurnover!==turnover && selectedButton==="turnover"){
    //     router.refresh();
    // }
    // if(countSteal!==steal && selectedButton==="steal"){
    //     router.refresh();
    // }
    // if(countAssist!==assist && selectedButton==="assist"){
    //     router.refresh();
    // }
    // if(countDefReb!==defReb && selectedButton==="defReb"){
    //     router.refresh();
    // }
    // if(countOffReb!==offReb && selectedButton==="offReb"){
    //     router.refresh();
    // }
    
    
    const handleIncrement = () => {
        if(selectedButton==="foul"){
            setCountFoul((prevNumber) => prevNumber + 1);
            handleAddOther(selectedButton, performanceId, countFoul+1, 1);
        }
        if(selectedButton==="block"){
            setCountBlock((prevNumber) => prevNumber + 1);
            handleAddOther(selectedButton, performanceId, countBlock+1, 1);
        }
        if(selectedButton==="turnover"){
            setCountTurnover((prevNumber) => prevNumber + 1);
            handleAddOther(selectedButton, performanceId, countTurnover+1, 1);
        }
        if(selectedButton==="steal"){
            setCountSteal((prevNumber) => prevNumber + 1);
            handleAddOther(selectedButton, performanceId, countSteal+1, 1);
        }
        if(selectedButton==="assist"){
            setCountAssist((prevNumber) => prevNumber + 1);
            handleAddOther(selectedButton, performanceId, countAssist+1, 1);
        }
        if(selectedButton==="defReb"){
            setCountDefReb((prevNumber) => prevNumber + 1);
            handleAddOther(selectedButton, performanceId, countDefReb+1, 1);
        }
        if(selectedButton==="offReb"){
            setCountOffReb((prevNumber) => prevNumber + 1);
            handleAddOther(selectedButton, performanceId, countOffReb+1, 1);
        }
        // router.refresh();
    };
    const handleDecrement = () => {
        if(selectedButton==="foul"){
            setCountFoul((prevNumber) => prevNumber - 1);
            handleAddOther(selectedButton, performanceId, countFoul-1, -1);
        }
        if(selectedButton==="block"){
            setCountBlock((prevNumber) => prevNumber - 1);
            handleAddOther(selectedButton, performanceId, countBlock-1, -1);
        }
        if(selectedButton==="turnover"){
            setCountTurnover((prevNumber) => prevNumber - 1);
            handleAddOther(selectedButton, performanceId, countTurnover-1, -1);
        }
        if(selectedButton==="steal"){
            setCountSteal((prevNumber) => prevNumber - 1);
            handleAddOther(selectedButton, performanceId, countSteal-1, -1);
        }
        if(selectedButton==="assist"){
            setCountAssist((prevNumber) => prevNumber - 1);
            handleAddOther(selectedButton, performanceId, countAssist-1, -1);
        }
        if(selectedButton==="defReb"){
            setCountDefReb((prevNumber) => prevNumber - 1);
            handleAddOther(selectedButton, performanceId, countDefReb-1, -1);
        }
        if(selectedButton==="offReb"){
            setCountOffReb((prevNumber) => prevNumber - 1);
            handleAddOther(selectedButton, performanceId, countOffReb-1, -1);
        }
        // router.refresh();
    }


    return (
        <div className="flex flex-wrap flex-col items-center">
            <div className="grid grid-rows-3 grid-flow-col place-items-center">
                <Button
                    onClick={() => handleButtonClick('foul')}
                    className={`bg-transparent px-4 m-2 py-2 w-20 ${
                    selectedButton === 'foul' ? 'bg-batra-400 text-white' : ''
                    }`}
                >
                    FOUL
                    <p  className={`p-1 ${
                    selectedButton === 'foul' ? 'text-yellow-400' : ''
                    }`}><b>{countFoul}</b></p>
                </Button>
                <Button
                    onClick={() => handleButtonClick('turnover')}
                    className={`bg-transparent px-4 m-2 py-2 w-20 ${
                    selectedButton === 'turnover' ? 'bg-batra-400 text-white' : ''
                    }`}
                >
                    TO
                    <p  className={`p-1 ${
                    selectedButton === 'turnover' ? 'text-yellow-400' : ''
                    }`}><b>{countTurnover}</b></p>
                </Button>
                
                <Button
                    onClick={() => handleButtonClick('block')}
                    className={`bg-transparent px-4 m-2 py-2 w-20 row-start-1 ${
                    selectedButton === 'block' ? 'bg-batra-400 text-white' : ''
                    }`}
                >
                    BLOCK
                    <p  className={`p-1 ${
                    selectedButton === 'block' ? 'text-yellow-400' : ''
                    }`}><b>{countBlock}</b></p>
                </Button>
                <Button
                    onClick={() => handleButtonClick('assist')}
                    className={`bg-transparent px-4 m-2 py-2 w-20 ${
                    selectedButton === 'assist' ? 'bg-batra-400 text-white' : ''
                    }`}
                >
                    AST
                    <p  className={`p-1 ${
                    selectedButton === 'assist' ? 'text-yellow-400' : ''
                    }`}><b>{countAssist}</b></p>
                </Button>
                <Button
                    onClick={() => handleButtonClick('steal')}
                    className={`bg-transparent px-4 m-2 py-2 w-20 ${
                    selectedButton === 'steal' ? 'bg-batra-400 text-white' : ''
                    }`}
                >
                    STL
                    <p  className={`p-1 ${
                    selectedButton === 'steal' ? 'text-yellow-400' : ''
                    }`}><b>{countSteal}</b></p>
                </Button>
                
                <Button
                    onClick={() => handleButtonClick('offReb')}
                    className={`bg-transparent px-4 m-2 py-2 w-20 ${
                    selectedButton === 'offReb' ? 'bg-batra-400 text-white' : ''
                    }`}
                >
                    OFFREB
                    <p  className={`p-1 ${
                    selectedButton === 'offReb' ? 'text-yellow-400' : ''
                    }`}><b>{countOffReb}</b></p>
                </Button>
                <Button
                    onClick={() => handleButtonClick('defReb')}
                    className={`bg-transparent px-4 m-2 py-2 w-20 ${
                    selectedButton === 'defReb' ? 'bg-batra-400 text-white' : ''
                    }`}
                >
                    DEFREB
                    <p  className={`p-1 ${
                    selectedButton === 'defReb' ? 'text-yellow-400' : ''
                    }`}><b>{countDefReb}</b></p>
                </Button>
                {openCalculator && <div className="flex items-center justify-between w-20">
                {/* <p className="p-1">
                    <b>投球數</b>
                </p> */}
                <button onClick={handleDecrement} className="bg-muted rounded-full w-8 h-8">
                    -
                </button>
                {/* {selectedButton === "foul" && (
                    <div className="p-4 bg-muted m-2 ">{countFoul}</div>
                )}
                {selectedButton === "block" && (
                    <div className="p-4 bg-muted m-2 ">{countBlock}</div>
                )}
                {selectedButton === "turnover" && (
                    <div className="p-4 bg-muted m-2 ">{countTurnover}</div>
                )}
                {selectedButton === "steal" && (
                    <div className="p-4 bg-muted m-2 ">{countSteal}</div>
                )}
                {selectedButton === "assist" && (
                    <div className="p-4 bg-muted m-2 ">{countAssist}</div>
                )}
                {selectedButton === "defReb" && (
                    <div className="p-4 bg-muted m-2 ">{countDefReb}</div>
                )}
                {selectedButton === "offReb" && (
                    <div className="p-4 bg-muted m-2 ">{countOffReb}</div>
                )} */}
                <button onClick={handleIncrement} className="bg-muted rounded-full w-8 h-8">
                    +
                </button>
            </div>}
            </div>

            
        </div>
    )
}