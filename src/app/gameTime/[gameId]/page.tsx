import { Button } from "@/components/ui/button";
import Possession from "./_components/possession";
import InputPlayerBar from "./_components/inputPlayerBar";
import StartPeriod from "./_components/startPeriod";
import {createPerformance, getGamePerformances} from "./actions";
import { get } from "http";

type Props = {
   params: {
         gameId: string;
    };
}

async function GameTimeIdPage({ params:{gameId} }: Props) {
    let periodId = "07367510-3aa6-4bfd-bd57-74b7639d620d";
    async function handlePossession(gamePossession: string) {
        "use server"
        console.log("Possession");
        //TODO: change the game possession, can get ID from URL
        //if possession is WE, change to OP and vice versa
    }
    const handleAddPlayer = async(inputName: string) => {
        "use server";
        console.log("Add Player",inputName); //add a new performance with playerId and gameId and periodId
        const newPerformanceId = await createPerformance(inputName, gameId, periodId);
    }
    const handlePeriod = async(isStartPeriod: boolean, gameId: string) => {
        "use server";
        console.log("Start Period");
        //TODO: add a period to the game with gameId, and return the periodId
        periodId = "1";
    }
    const allGamePerformances = await getGamePerformances(gameId, periodId);

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
            <div>
                {allGamePerformances.map((performance) => (
                    <div key={performance.displayId}>
                        <p>{performance.gameId}</p>
                        <p>{performance.periodId}</p>
                    </div>
                ))}
            </div>
      </div>
    );
  }
  export default GameTimeIdPage;