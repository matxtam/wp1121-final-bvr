import { GamePerformance } from '@/lib/types/db';

type Props = {
    gamePerformance: GamePerformance;   
}

export default function DashBoard({ gamePerformance}: Props) {
    return (
        <div>
            <h1> GamePerformance.playerId</h1>
        </div>
    )
}