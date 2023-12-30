'use client';
import { SkipForward } from "lucide-react";

type Props = {
    gameId: string;
    handlePeriod: (gameId:string, number:string) => void;
    periodNumber: number;
}

export default function StartPeriod({ gameId, handlePeriod, periodNumber }: Props) {
    // const [isStartPeriod, setIsStartPeriod] = useState(!(periodNumber === 0));
    let disabled = false;
    let passInData = (periodNumber+1).toString();
    if(periodNumber === 4) {
        passInData = "OT"
    }
    let nowPeriod = `Start P${(periodNumber+1).toString()}`;
    if(periodNumber === 4) {
        nowPeriod = "Start OT"
    }
    if(periodNumber === 5) {
        disabled=true
        nowPeriod = "End"
    }

    console.log("nowPeriod", nowPeriod);
    return (
        <button
        onClick={() => {
            handlePeriod(gameId, passInData);
        }}
        disabled={disabled}
        className="flex flex-col items-center justify-center w-full h-16 gap-1 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
        >
                {/* {nowPeriod} */}
            <SkipForward size={20}/>
            <p>{nowPeriod}</p>
        </button>
        
    )
}