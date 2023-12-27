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
        <div className="flex">
          
          <table>
            {/* <thead>
              <tr>
                <th>Number</th>
                <th>Total Score</th>
                <th>Total Opponent Score</th>
                <th>Total Foul</th>
                <th>Total Opponent Foul</th>
              </tr>
            </thead> */}
            <tbody className="w-full">
              <tr>
                <td className="px-3">{number}</td>
                <td className="px-9">{totalScoreNow}</td>
                <td className="px-7">{totalOpScoreNow}</td>
                <td className="px-7">{totalFoulNow}</td>
                <td className="px-7">{totalOpFoulNow}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
   
}