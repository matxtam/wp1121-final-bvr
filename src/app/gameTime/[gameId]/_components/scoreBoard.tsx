"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";


type Props = {
    gameId: string;
    periodId: string;
    number: string;
    totalScore: number; 
    totalOpScore: number;
    totalFoul: number;
    totalOpFoul: number;
    // handleChangeOnTime: (performanceId: string, item: string, newStatus: boolean) => void;
}

export default function ScoreBoard({gameId, periodId, number, totalScore, totalOpScore, totalFoul, totalOpFoul }: Props) {
    const [totalScoreNow, setTotalScoreNow] = useState(totalScore);
    const [totalOpScoreNow, setTotalOpScoreNow] = useState(totalOpScore);
    const [totalFoulNow, setTotalFoulNow] = useState(totalFoul);
    const [totalOpFoulNow, setTotalOpFoulNow] = useState(totalOpFoul);
    useEffect(() => {
        setTotalScoreNow(totalScore);
      },[totalScore]);
    useEffect(() => {
        setTotalOpScoreNow(totalOpScore);
      },[totalOpScore]);
    useEffect(() => {
        setTotalFoulNow(totalFoul);
      },[totalFoul]);
    useEffect(() => {
        setTotalOpFoulNow(totalOpFoul);
      },[totalOpFoul]);


    
    return (

            <tbody className="w-full items-center justify-center">
              <tr>
                <td className="text-center">{number}</td>
                <td className="text-center">{totalScoreNow}</td>
                <td className="text-center">{totalOpScoreNow}</td>
                <td className="text-center">{totalFoulNow}</td>
                <td className="text-center">{totalOpFoulNow}</td>
              </tr>
            </tbody>

      );
   
}