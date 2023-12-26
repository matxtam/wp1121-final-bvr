"use client"
import { Button } from "@/components/ui/button";
import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
type Props = {
    performanceId: string;
    foul: number;
    block: number;
    turnover: number;
    steal: number;
    assist: number;
    defReb: number;
    offReb: number;
    handleAddOther: (selectedItem: string, performanceId: string, newStatus: number, action: number) => void;
}
type ButtonType = 'foul' | 'block' | 'turnover' | 'steal' | 'assist' | 'defReb' | 'offReb';

export default function AddOther({ performanceId, foul, block, turnover, steal, assist, defReb, offReb, handleAddOther }: Props) {
    const [selectedButton, setSelectedButton] = useState("foul");
    const [countFoul, setCountFoul] = useState<number>(foul);//set with foul
    const [countBlock, setCountBlock] = useState<number>(block);//set with block
    const [countTurnover, setCountTurnover] = useState<number>(turnover);//set with turnover
    const [countSteal, setCountSteal] = useState<number>(steal);//set with steal
    const [countAssist, setCountAssist] = useState<number>(assist);//set with assist
    const [countDefReb, setCountDefReb] = useState<number>(defReb);//set with defReb
    const [countOffReb, setCountOffReb] = useState<number>(offReb);//set with offReb
    // const buttonTypeMappings: Record<ButtonType, { count: number }> = {
    //     foul: { count: foul },
    //     block: { count: block },
    //     turnover: { count: turnover },
    //     steal: { count: steal },
    //     assist: { count: assist },
    //     defReb: { count: defReb },
    //     offReb: { count: offReb },
    //   };    
    const handleButtonClick = (buttonType:ButtonType) => {
        setSelectedButton(buttonType);
            if(buttonType==="foul"){
              setCountFoul(countFoul);
            }
            if(buttonType==="block"){
                setCountBlock(countBlock);
            }
            if(buttonType==="turnover"){
                setCountTurnover(countTurnover);
            }
            if(buttonType==="steal"){
                setCountSteal(countSteal);
            }
            if(buttonType==="assist"){
                setCountAssist(countAssist);
            }
            if(buttonType==="defReb"){
                setCountDefReb(countDefReb);
            }
            if(buttonType==="offReb"){
                setCountOffReb(countOffReb);
            }

        // if (buttonTypeMappings.hasOwnProperty(buttonType)) {
        // //   const { count } = buttonTypeMappings[buttonType];
        //   setSelectedButton(buttonType);
        //     if(buttonType==="foul"){
        //       setCountFoul(count);
        //     }
        //     if(buttonType==="block"){
        //         setCountBlock(count);
        //     }
        //     if(buttonType==="turnover"){
        //         setCountTurnover(count);
        //     }
        //     if(buttonType==="steal"){
        //         setCountSteal(count);
        //     }
        //     if(buttonType==="assist"){
        //         setCountAssist(count);
        //     }
        //     if(buttonType==="defReb"){
        //         setCountDefReb(count);
        //     }
        //     if(buttonType==="offReb"){
        //         setCountOffReb(count);
        //     }
        // }
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

    // const handleIncrement = () => {
    //     setCount((prevNumber) => prevNumber + 1);
    //     handleAddOther(selectedButton, performanceId, count+1);
    //     router.refresh();
    // };
    
    // const handleDecrement = () => {
    //     setCount((prevNumber) => prevNumber - 1);
    //     handleAddOther(selectedButton, performanceId, count-1);
    //     router.refresh();
    // };

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
                    AST
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
                {selectedButton === "foul" && (
                    <div className="p-4 bg-indigo-100 m-2">{countFoul}</div>
                )}
                {selectedButton === "block" && (
                    <div className="p-4 bg-indigo-100 m-2">{countBlock}</div>
                )}
                {selectedButton === "turnover" && (
                    <div className="p-4 bg-indigo-100 m-2">{countTurnover}</div>
                )}
                {selectedButton === "steal" && (
                    <div className="p-4 bg-indigo-100 m-2">{countSteal}</div>
                )}
                {selectedButton === "assist" && (
                    <div className="p-4 bg-indigo-100 m-2">{countAssist}</div>
                )}
                {selectedButton === "defReb" && (
                    <div className="p-4 bg-indigo-100 m-2">{countDefReb}</div>
                )}
                {selectedButton === "offReb" && (
                    <div className="p-4 bg-indigo-100 m-2">{countOffReb}</div>
                )}
                <button onClick={handleIncrement} className="p-2 m-2 bg-gray-300">
                    +
                </button>
            </div>
            
        </div>
    )
}