import { Button } from "@/components/ui/button";
import Possession from "./_components/possession";
import AddOp from "./_components/addOp";
import InputPlayerBar from "./_components/inputPlayerBar";
import StartPeriod from "./_components/startPeriod";
import {createPerformance, getGamePerformances, updateGamePerformance, finishGame} from "./actions";
import { get } from "http";
import AddShooting from "./_components/addShooting";
import AddOther from "./_components/addOther";
import PlayNowButton from "./_components/playNowButton";
import { redirect } from "next/navigation";
import OnTimeRecord from "./_components/onTimeRecord";
import { db } from "@/db";
import { gamesTable, periodsTable, gamePerformancesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { title } from "process";
import { revalidatePath } from "next/cache";
import  ScoreBoard  from "./_components/scoreBoard";
import FinishGame from "./_components/FinishButton";
import { publicEnv } from "@/lib/env/public";
// import DashBoard from "./dashBoard";
type Props = {
   params: {
         gameId: string;
    };
    searchParams: {
        URLperiodId?: string;
    };
}

async function GameTimeIdPage({ params:{gameId}, searchParams:{URLperiodId} }: Props) {
    // let periodId = "131a8aee-8b33-11ee-b9d1-0242ac120002";
    // let nowPeriod = null;
    if(URLperiodId === null || URLperiodId === undefined){
        console.log("URLperiodId is null");
        return;
    }

    const gameData = await db
        .select({
            title: gamesTable.title,
            date: gamesTable.date,
            hashtag: gamesTable.hashtag,
            totalScore: gamesTable.totalScore,
            possession: gamesTable.possession,
            periodsNumber: gamesTable.periodsNumber,
        })
        .from(gamesTable)
        .where(
            eq(gamesTable.displayId, gameId)
        )
        .execute();
 
    const handlePossession = async(possession: string) => {
        "use server"
        console.log('new',possession);
        await db
            .update(gamesTable)
            .set({
                possession: possession,
            })
            .where(
                eq(gamesTable.displayId, gameId)
            )
            .execute();
    }

    const handlePeriod = async(gameId: string, number:string) => {
        "use server";
        await db
        .update(gamesTable)
        .set({
            periodsNumber: gameData[0].periodsNumber+1,
        })
        .where(
            eq(gamesTable.displayId, gameId)
        )
        const [{newPeriodId}]= await db
            .insert(periodsTable)
            .values({
                gameId: gameId,
                number: number,
            })
            .returning({
                newPeriodId: periodsTable.displayId,
              })
            .execute();
        const params = new URLSearchParams();
        params.set("URLperiodId", newPeriodId);
        redirect(`/gameTime/${gameId}/?${params.toString()}`);
        
    } 
    
    const getPeriod = async(gameId: string) => {
        "use server";
        const period = await db
            .select({
                displayId: periodsTable.displayId,
                number: periodsTable.number,
                totalScore: periodsTable.totalScore,
                totalOpScore: periodsTable.totalOpScore,
                totalFoul: periodsTable.totalFoul,
                totalOpFoul: periodsTable.totalOpFoul,
            })
            .from(periodsTable)
            .where(
                eq(periodsTable.gameId, gameId)
            )
            .execute();
        return period;
    }
    
    const allPeriod = await getPeriod(gameId);
    const nowPeriod = allPeriod.filter((period) => period.displayId === URLperiodId);
    

    const handleAddPlayer = async(inputName: string) => {
        "use server";
        console.log("Add Player",inputName); //add a new performance with playerId and gameId and periodId
        const newPerformanceId = await createPerformance(inputName, gameId);
        console.log("newPerformanceId", newPerformanceId);
        return newPerformanceId?.toString()||"0";
    }
    
    const allGamePerformances = await getGamePerformances(gameId);
    
    const handleChangeOnTime = async(performanceId: string, item: string, newStatus: boolean) => {
        "use server";
        console.log("Change OnTime");
        await db
            .update(gamePerformancesTable)
            .set({
                [item]: newStatus,
            })
            .where(
                eq(gamePerformancesTable.displayId, performanceId)
            )
            .execute();
        // redirect(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
    }

    const handleNowPlay = async(performanceId: string, newStatus: boolean) => {
        "use server";
        console.log("Change PlayNow");
        await db
            .update(gamePerformancesTable)
            .set({
                nowPlay: newStatus,
            })
            .where(
                eq(gamePerformancesTable.displayId, performanceId)
            )
            .execute();
        revalidatePath(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
        //BUG!!
    }

    const handleAddShooting = async(selectedItem: string, performanceId: string, newStatus: number, action: number) => {
        "use server";
        console.log("Add Shooting", selectedItem);
        // updateGamePerformance(selectedItem, performanceId, change, URLperiodId);
        //TODO: add a shooting to the performance with performanceId
        //TODO: change the total score of the period
        await db
            .update(gamePerformancesTable)
            .set({
                [selectedItem]: newStatus,
            })
            .where(
                eq(gamePerformancesTable.displayId, performanceId)
            )
            .execute();
        if(selectedItem === "inTwoPt" || selectedItem === "inThreePt" || selectedItem === "inFt"){
            await db
                .update(periodsTable)
                .set({
                    totalScore: nowPeriod[0].totalScore + action
                })
                .where(
                    eq(periodsTable.displayId, URLperiodId)
                )
                .execute();
        }        
        
        redirect(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
    }
    const handleAddOther = async(selectedItem: string, performanceId: string, newStatus: number, action: number) => {
        "use server";
        console.log("Add Other", selectedItem);
        if(URLperiodId === null || URLperiodId === undefined){
            console.log("URLperiodId is null");
            return;
        }
        await db
            .update(gamePerformancesTable)
            .set({
                [selectedItem]: newStatus,
            })
            .where(
                eq(gamePerformancesTable.displayId, performanceId)
            )
            .execute();
        if(selectedItem === "foul"){
            await db
                .update(periodsTable)
                .set({
                    totalFoul: nowPeriod[0].totalFoul + action
                })
                .where(
                    eq(periodsTable.displayId, URLperiodId)
                )
                .execute();
        }
        revalidatePath(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
    }
    const handleAddOpScore = async(periodId: string, action: number) => {
        "use server";
        console.log("Add Op Score");
        await db
            .update(periodsTable)
            .set({
                totalOpScore: nowPeriod[0].totalOpScore + action
            })
            .where(
                eq(periodsTable.displayId, periodId)
            )
            .execute();
        revalidatePath(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
    }
    const handleAddOpFoul = async(periodId: string, action: number) => {
        "use server";
        console.log("Add Op Foul");
        await db
            .update(periodsTable)
            .set({
                totalOpFoul: nowPeriod[0].totalOpFoul + action
            })
            .where(
                eq(periodsTable.displayId, periodId)
            )
            .execute();
        revalidatePath(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
    }

    const handleFinish = async(nowGameId:string) => {
        "use server"
        console.log("Finish Game");
        const totalScore = allPeriod.reduce((a, b) => a + b.totalScore, 0);
        finishGame(nowGameId, totalScore);
        // await db
        //     .update(gamesTable)
        //     .set({
        //         totalScore: totalScore,
        //     })
        //     .where(
        //         eq(gamesTable.displayId, nowGameId)
        //     )
        //     .execute();
        // redirect(`/history/${gameId}`);
    }
    
    return (
      <div>
        {/* <nav className=" sticky top-0 flex flex-col items-center justify-between border-b bg-blue-400 p-2 text-slate-50">GameTime [ID] Page</nav> */}
            {/* TODO: get the true info */}
            <div className="flex flex-col gap-2 p-5 m-3">
                <div className="flex items-center gap-2 justify-between">
                    <h1 className="text-3xl font-bold">GameTitle: {gameData[0].title}</h1>
                    <div className="text-lg bg-fuchsia-200 p-2 rounded">{gameData[0].hashtag}</div>
                </div>
                <p className="text-lg">Date: {gameData[0].date}</p>
            </div>
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 p-2">
                    <InputPlayerBar handleAddPlayer={handleAddPlayer}/>
                    <Possession gamePossession={gameData[0].possession} handlePossession={handlePossession} />
                    <AddOp periodId={URLperiodId} handleAddOpScore={handleAddOpScore} handleAddOpFoul={handleAddOpFoul}/>
                </div>
                <div className="flex gap-2 p-2">
                    <StartPeriod gameId={gameId} handlePeriod={handlePeriod} periodNumber={gameData[0].periodsNumber}/>
                    <FinishGame gameId={gameId} handleFinish={handleFinish}/>
                </div>     
            </div>
            <div className="grid grid-cols-3 gap-4">
                {allGamePerformances
                .sort((a, b) => (a.nowPlay === b.nowPlay ? 0 : a.nowPlay ? -1 : 1))
                .map((performance, index) => (
                    <div key={index} className="box-content rounded-lg border-2 border-blue-100 m-5 p-3 flex items-center flex-wrap">                    
                        <div className="w-full my-2 mx-4 flex flex-wrap justify-between items-center">
                            <div>
                                <p><b>{performance.player.name}</b></p>
                            </div>
                            <div>
                                <p>{performance.player.number}</p>
                            </div>
                            <OnTimeRecord 
                                performanceId={performance.displayId}
                                onP1={performance.onP1}
                                onP2={performance.onP2}
                                onP3={performance.onP3}
                                onP4={performance.onP4}
                                onOt={performance.onOt}
                                handleChangeOnTime={handleChangeOnTime}
                            />
                            <PlayNowButton
                                performanceId={performance.displayId}
                                nowPlay={performance.nowPlay}
                                handlePlayNow={handleNowPlay}
                            />
                        </div>
                        <div className="m-2 flex justify-between items-center ">
                            <AddShooting
                                    performanceId={performance.displayId}                            
                                    twoPt={performance.twoPt}
                                    threePt={performance.threePt}
                                    ft={performance.ft}
                                    inTwoPt={performance.inTwoPt}
                                    inThreePt={performance.inThreePt}
                                    inFt={performance.inFt}
                                    handleAddShooting={handleAddShooting}
                            />
                            <AddOther
                                performanceId={performance.displayId}                            
                                foul={performance.foul}
                                block={performance.block}
                                turnover={performance.turnover}
                                steal={performance.steal}
                                assist={performance.assist}
                                defReb={performance.defReb}
                                offReb={performance.offReb}
                                handleAddOther={handleAddOther}
                            />
                        </div>
                        
                    </div>
                ))}
                {/* here for trying display */}
                {/* <div className="box-content rounded-lg border-2 border-blue-100 m-5 p-3 flex items-center flex-wrap">
                    <div className="m-2 flex flex-wrap justify-between items-center">
                        <div>
                            <p>陳千蕙</p>
                        </div>
                        <div>
                            <p>Number: 3</p>
                        </div>
                        <OnTimeRecord 
                            performanceId={"81247b0e-8b5f-11ee-b9d1-0242ac120002"}   
                            onP1={true}
                            onP2={true}
                            onP3={false}
                            onP4={false}
                            onOt={false}
                            handleChangeOnTime={handleChangeOnTime}
                        />
                    </div>
                    <div className="m-2 flex flex-wrap justify-between items-center ">
                        <AddShooting
                                performanceId={"81247b0e-8b5f-11ee-b9d1-0242ac120002"}                            
                                twoPt={20}
                                threePt={30}
                                ft={10}
                                inTwoPt={2}
                                inThreePt={3}
                                inFt={1}
                                handleAddShooting={handleAddShooting}
                        />
                        <AddOther
                            performanceId={"81247b0e-8b5f-11ee-b9d1-0242ac120002"}                            
                            foul={2}
                            block={3}
                            turnover={1}
                            steal={0}
                            assist={0}
                            defReb={2}
                            offReb={3}
                            handleAddShooting={handleAddShooting}
                        />
                    </div>
                </div> */}
                <div>
                <b>ScoreBoard</b>
                    <table>
                        <thead>
                            <tr>
                                <th className="p-2">No</th>
                                <th className="p-2">Score</th>
                                <th className="p-2">OP Score</th>
                                <th className="p-2">Foul</th>
                                <th className="p-2">OP Foul</th>
                            </tr>
                        </thead>
                    </table>
                {URLperiodId !== null && URLperiodId !== undefined && allPeriod !== null && 
                    allPeriod
                    .sort((a, b) => (a.number === b.number ? 0 : a.number < b.number ? -1 : 1))
                    .map((period, index) => (
                        <div key={index} className="flex w-full">
                            <ScoreBoard
                                gameId={gameId}
                                periodId={URLperiodId}
                                number={period.number}
                                totalScore={period.totalScore}
                                totalOpScore={period.totalOpScore}
                                totalFoul={period.totalFoul}
                                totalOpFoul={period.totalOpFoul}
                            />
                        </div>
                    ))}
                </div>
               
            </div>
      </div>
    );
  }
  export default GameTimeIdPage;