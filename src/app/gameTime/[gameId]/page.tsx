import Possession from "./_components/possession";
import AddOp from "./_components/addOp";
import InputPlayerBar from "./_components/inputPlayerBar";
import StartPeriod from "./_components/startPeriod";
import {createPerformance, getGamePerformances, finishGame} from "./actions";
import AddShooting from "./_components/addShooting";
import AddOther from "./_components/addOther";
// import PlayNowButton from "./_components/playNowButton";
import { redirect } from "next/navigation";
import OnTimeRecord from "./_components/onTimeRecord";
import { db } from "@/db";
import { GoBackTable, gamesTable, periodsTable, gamePerformancesTable,  playersTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import  ScoreBoard  from "./_components/scoreBoard";
import  UndoButton  from "./_components/undoButton";
import FinishGame from "./_components/FinishButton";
import OpenCalculator from "./_components/openCalculator";
import React from "react";
import { getPlayersTwo } from "@/app/settings/players/actions";
import { auth } from "@/lib/auth";
import {Player} from "@/lib/types/db";
type Props = {
   params: {
         gameId: string;
    };
    searchParams: {
        URLperiodId?: string;
    };
}
// interface GamePerformancesTable {
//     id: number;
//     [key: string]: any;
// }


async function GameTimeIdPage({ params:{gameId}, searchParams:{URLperiodId} }: Props) {
    // let periodId = "131a8aee-8b33-11ee-b9d1-0242ac120002";
    // let nowPeriod = null;
    let gameTotalScore = 0;
    let gameTotalOpScore = 0;

    const session = await auth();
    if (!session?.user?.id) {
        return null;
    }
    const user = session.user;
    const userId = user.id;
    
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
            totalOpScore: gamesTable.totalOpScore,
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
        await db
            .delete(GoBackTable)
            .where(
                eq(GoBackTable.periodId, URLperiodId)
            )
            .execute();

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
        
        redirect(`/gameTime/${gameId}/?URLperiodId=${newPeriodId}`);        
        const params = new URLSearchParams();
        params.set("URLperiodId", newPeriodId);
        // redirect(`/gameTime/${gameId}/?${params.toString()}`);
        redirect(`/gameTime/${gameId}/?URLperiodId=${newPeriodId}`);
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
    // const allPlayer = await db
    //     .select()
    //     .from(playersTable)
    //     .where(
    //         eq(playersTable.userId, gameData[0].userId)
    //     )
    //     .execute();
    const allPlayer: Player[] = await getPlayersTwo(userId);

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
        //revalidatePath(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
        //BUG!!
    }

    const handleAddShooting = async(selectedItem: string, performanceId: string, newStatus: number, action: number) => {
        "use server";
        console.log("Add Shooting", selectedItem);
        // updateGamePerformance(selectedItem, performanceId, change, URLperiodId);

        await db
            .update(gamePerformancesTable)
            .set({
                [selectedItem]: newStatus,
            })
            .where(
                eq(gamePerformancesTable.displayId, performanceId)
            )
            .execute();
        if(action>0){
            await db
                .insert(GoBackTable)
                .values({
                    gameId: gameId,
                    periodId: URLperiodId,
                    performanceId: performanceId,
                    actionString: selectedItem,
                    undoAction: action,
                    originalValue: newStatus - 1,
                    })
                .execute();  
        }  
        if(action<0){
            await db
                .insert(GoBackTable)
                .values({
                    gameId: gameId,
                    periodId: URLperiodId,
                    performanceId: performanceId,
                    actionString: selectedItem,
                    undoAction: action,
                    originalValue: newStatus + 1,
                    })
                .execute();  
        }

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
            redirect(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
        }        
       
       
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
        await db
            .insert(GoBackTable)
            .values({
                gameId: gameId,
                periodId: URLperiodId,
                performanceId: performanceId,
                actionString: selectedItem,
                undoAction: action,
                originalValue: newStatus - action,
                })
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
            revalidatePath(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
        }
        
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
    gameTotalScore = allPeriod.reduce((a, b) => (a + b.totalScore), 0);
    gameTotalOpScore = allPeriod.reduce((a, b) => (a + b.totalOpScore), 0);
    const handleFinish = async(nowGameId:string) => {
        "use server";
        console.log("Finish Game");
        finishGame(nowGameId, gameTotalScore);
        await db
            .update(gamesTable)
            .set({
                totalScore: gameTotalScore,
                totalOpScore: gameTotalOpScore,
            })
            .where(
                eq(gamesTable.displayId, nowGameId)
            )
            .execute();
        await db
            .delete(GoBackTable)
            .where(
                eq(GoBackTable.gameId, gameId)
            )
            .execute();
        const AllGamePerformances= await db.query.gamePerformancesTable.findMany({
                where: (eq(gamePerformancesTable.gameId, gameId)),
                with:{
                    player:{
                        columns:{
                            name: true,
                            number: true,
                        }
                    }
                }
            });
        AllGamePerformances.map(async(performance) => {
            await db
                .update(playersTable)
                .set({
                    // personalValue: performance.personalValue,
                    personal2pt: performance.twoPt,
                    personalIn2pt: performance.inTwoPt,
                    personal3pt: performance.threePt,
                    personalIn3pt: performance.inThreePt,
                    personalFt: performance.ft,
                    personalInFt: performance.inFt,
                    personalDefReb: performance.defReb,
                    personalOffReb: performance.offReb,
                    personalSteal: performance.steal,
                    personalAssist: performance.assist,
                })
                .where(
                    eq(playersTable.displayId, performance.playerId)
                )
                .execute();
        }
        )
        redirect(`/history/${gameId}`);
    }
    const handleUndo = async() => {
        "use server";
        console.log("Undo");
        const undoData = await db
            .select()
            .from(GoBackTable)
            .where(
                eq(GoBackTable.gameId, gameId)
            )
            .orderBy(desc(GoBackTable.id)) 
            .limit(1)
            .execute();
        console.log("undoDate", undoData); 
         if(undoData.length === 0){
              console.log("No undoData");
              return;
         }
        const selectedItem = undoData[0].actionString;
        const originalValue = undoData[0].originalValue;
        const undoAction = undoData[0].undoAction;
        const performanceId = undoData[0].performanceId;
        if(selectedItem === null || selectedItem === undefined){
            console.log("selectedItem is null");
            return;
        }
        if(originalValue === null || originalValue === undefined){
            console.log("originalValue is null");
            return;
        }
        if(undoAction === null || undoAction === undefined){
            console.log("undoAction is null");
            return;
        }
        if(performanceId === null || performanceId === undefined){
            console.log("performanceId is null");
            return;
        }
        await db
            .update(gamePerformancesTable)
            .set({
                [selectedItem]: originalValue,
            })
            .where(
                eq(gamePerformancesTable.displayId, performanceId)
            )
            .execute();
        if(selectedItem === "inTwoPt" || selectedItem === "inThreePt" || selectedItem === "inFt"){
            console.log("Undo Score");
            await db
                .update(periodsTable)
                .set({
                    totalScore: nowPeriod[0].totalScore - undoAction
                })
                .where(
                    eq(periodsTable.displayId, URLperiodId)
                )
                .execute();
        }
        if(selectedItem === "foul"){
            await db
                .update(periodsTable)
                .set({
                    totalFoul: nowPeriod[0].totalFoul - undoAction
                })
                .where(
                    eq(periodsTable.displayId, URLperiodId)
                )
                .execute();
        }
        await db
            .delete(GoBackTable)
            .where(
                eq(GoBackTable.id, undoData[0].id)
            )
            .execute();
        redirect(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);        
    }

    const handleOpenCalculator = async(performanceId:string,openOrNot:boolean) => {
        "use server";
        await db
            .update(gamePerformancesTable)
            .set({
                openCalculator: openOrNot,
            })
            .where(
                eq(gamePerformancesTable.displayId, performanceId)
            )
            .execute();
        redirect(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
    }
    return (
      <>
        {/* <nav className=" sticky top-0 flex flex-col items-center justify-between border-b bg-blue-400 p-2 text-slate-50">GameTime [ID] Page</nav> */}
            {/* TODO: get the true info */}
        <nav className="flex flex-col flex-nowrap items-end justify-between w-60 px-24 py-12 sm:flex-row sm:w-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">GameTitle: {gameData[0].title}</h1>
                <div className="flex items-center gap-2 justify-between">
                    <p className="text-lg">{gameData[0].date}</p>
                    <div className="text-lg bg-muted text-muted-foreground p-2 rounded-full">{gameData[0].hashtag}</div>
                </div>
            </div>
            <div className="grid grid-cols-5 content-center items-center justify-between h-12 w-60 px-6 py-1 gap-2 rounded-full overflow-hidden bg-primary">
                <UndoButton handleUndo={handleUndo}/>
                <StartPeriod gameId={gameId} handlePeriod={handlePeriod} periodNumber={gameData[0].periodsNumber}/>
                <FinishGame gameId={gameId} handleFinish={handleFinish}/>
                <InputPlayerBar  allPlayers= {allPlayer} handleAddPlayer={handleAddPlayer}/>
                <Possession gamePossession={gameData[0].possession} handlePossession={handlePossession} />
            </div>
            
        </nav>
        <div className="grid grid-cols-3 gap-4 px-24 pb-24">

                <div className="flex flex-col items-center justify-center h-min gap-2 pt-2 border-ring border-2 rounded-xl text-center bg-ring">
                    
                <b className="text-background font-bold text-xl">Score Board</b>
                <div className="flex items-center justify-center bg-background w-full h-full p-4 rounded-xl">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th colSpan={2}><p>Score</p></th>
                                <th colSpan={2}><p>Foul</p></th>
                            </tr>
                            <tr>
                                <th><p className="w-8">No</p></th>
                                <th><p className="w-12">We</p></th>
                                <th><p className="w-12">OP</p></th>
                                <th><p className="w-12">We</p></th>
                                <th><p className="w-12">OP</p></th>
                            </tr>
                        </thead>
                    {URLperiodId !== null && URLperiodId !== undefined && allPeriod !== null && 
                    allPeriod
                    .sort((a, b) => (a.number === b.number ? 0 : a.number < b.number ? -1 : 1))
                    .map((period, index) => (
                        <React.Fragment key={index}>
                            <ScoreBoard
                                // gameId={gameId}
                                // periodId={URLperiodId}
                                number={period.number}
                                totalScore={period.totalScore}
                                totalOpScore={period.totalOpScore}
                                totalFoul={period.totalFoul}
                                totalOpFoul={period.totalOpFoul}
                            />
                        </React.Fragment>
                    ))}
                    <AddOp periodId={URLperiodId} handleAddOpScore={handleAddOpScore} handleAddOpFoul={handleAddOpFoul}/>
                    </table>
                    </div>
                </div>

                {allGamePerformances
                .sort((a, b) => a.id - b.id)
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
                            {/* <div> */}
                                {/* <a><img src={performance.player.photo} className="w-20 h-20 rounded-full" /></a> */}
                            {/* </div> */}
                            <OnTimeRecord 
                                performanceId={performance.displayId}
                                onP1={performance.onP1}
                                onP2={performance.onP2}
                                onP3={performance.onP3}
                                onP4={performance.onP4}
                                onOt={performance.onOt}
                                handleChangeOnTime={handleChangeOnTime}
                                nowPlay={performance.nowPlay}
                                handlePlayNow={handleNowPlay}
                            />
                            <OpenCalculator 
                                performanceId={performance.displayId}
                                openOrNot={performance.openCalculator}
                                handleOpenCalculator={handleOpenCalculator}
                            />
                            {/* <PlayNowButton
                                performanceId={performance.displayId}
                                nowPlay={performance.nowPlay}
                                handlePlayNow={handleNowPlay}
                            /> */}
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
                                    openCalculator={performance.openCalculator}
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
                                openCalculator={performance.openCalculator}
                                handleAddOther={handleAddOther}
                            />
                        </div>
                        
                    </div>
                ))}
        </div>
      </>
    );
    revalidatePath(`/gameTime/${gameId}/?URLperiodId=${URLperiodId}`);
  }
  export default GameTimeIdPage;