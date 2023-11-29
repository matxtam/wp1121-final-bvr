import { Button } from "@/components/ui/button";
import Possession from "./_components/possession";
import InputPlayerBar from "./_components/inputPlayerBar";
import StartPeriod from "./_components/startPeriod";
import {createPerformance, getGamePerformances, updateGamePerformance} from "./actions";
import { get } from "http";
import AddShooting from "./_components/addShooting";
import AddOther from "./_components/addOther";
import { redirect } from "next/navigation";
import OnTimeRecord from "./_components/onTimeRecord";
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
    async function handlePossession(gamePossession: string) {
        "use server"
        console.log("Possession");
        //TODO: change the game possession, can get ID from URL
        //if possession is WE, change to OP and vice versa
    }
    const handlePeriod = async(isStartPeriod: boolean, gameId: string) => {
        "use server";
        console.log("Start Period");
        const URLperiodId = "131a8aee-8b33-11ee-b9d1-0242ac120002";
        //TODO: add a period to the game with gameId, and return the periodId   
        const params = new URLSearchParams();
        params.set("URLperiodId", URLperiodId);
        redirect(`/gameTime/${gameId}/?${params.toString()}`);
    } 

    const handleAddPlayer = async(inputName: string) => {
        "use server";
        console.log("Add Player",inputName); //add a new performance with playerId and gameId and periodId
        const newPerformanceId = await createPerformance(inputName, gameId);
    }
    const allGamePerformances = await getGamePerformances(gameId);

    const handleAddShooting = async(selectedItem: string, performanceId: string, change: number) => {
        "use server";
        console.log("Add Shooting", URLperiodId);
        if(URLperiodId === null || URLperiodId === undefined){
            console.log("URLperiodId is null");
            return;
        }
        updateGamePerformance(selectedItem, performanceId, change, URLperiodId);
        //TODO: add a shooting to the performance with performanceId
        //TODO: change the total score of the period
    }

    return (
      <div>
        <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-blue-400 p-2 text-slate-50">GameTime [ID] Page</nav>
            {/* TODO: get the true info */}
            <div className="flex flex-col gap-2 p-5">
                <div className="flex items-center gap-2 justify-between">
                    <h1 className="text-3xl font-bold">GameTitle: 1121-台大電機VS交大電機</h1>
                    <div className="text-lg bg-fuchsia-200 p-2 rounded">北電盃</div>
                </div>
                <p className="text-lg">Date: 2023-11-21</p>
            </div>
            <div className="flex items-center justify-between px-2">
                <div className="flex gap-2 p-2">
                    <InputPlayerBar handleAddPlayer={handleAddPlayer}/>
                    <Possession gamePossession="WE" handlePossession={handlePossession} />
                </div>
                <div className="flex gap-2 p-2">
                    <StartPeriod gameId="1" handlePeriod={handlePeriod}/>
                    <Button>Finish Game</Button>
                </div>     
            </div>
            <div className="grid grid-cols-3 gap-4">
                {allGamePerformances
                .sort((a, b) => (a.nowPlay === b.nowPlay ? 0 : a.nowPlay ? -1 : 1)).sort((a, b) => (a.nowPlay === b.nowPlay ? 0 : a.nowPlay ? -1 : 1))
                .map((performance, index) => (
                    <div key={index} className="rounded-lg border-2 border-blue-100 m-5 p-3 flex items-center flex-wrap">
                        <div>
                            <p>{performance.player.name}</p>
                            <p>{performance.player.number}</p>
                            {/* <OnTimeRecord /> */}
                        </div>
                        <div>
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
                        </div>    
                        
                        {/* <AddOther/> */}
                        
                    </div>
                ))}
                {/* here for trying display */}
                <div className="rounded-lg border-2 border-blue-100 m-5 p-3 flex items-center flex-wrap">
                    <div className="m-2">
                        <div>
                            <p>陳千蕙</p>
                            <p>Number: 3</p>
                        </div>
                        <OnTimeRecord />
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
                    </div>
                    <AddOther
                        performanceId={"81247b0e-8b5f-11ee-b9d1-0242ac120002"}                            
                        twoPt={20}
                        threePt={30}
                        ft={10}
                        inTwoPt={2}
                        inThreePt={3}
                        inFt={1}
                        handleAddShooting={handleAddShooting}
                    />
                    {/* <AddShooting /> */}
                </div>
            </div>
      </div>
    );
  }
  export default GameTimeIdPage;