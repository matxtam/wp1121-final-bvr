"use client";
import { Plus, Minus } from 'lucide-react';
type Props = {
    periodId: string;
    handleAddOpScore: (periodId: string, action: number) => void;
    handleAddOpFoul: (periodId: string, action: number) => void;
}

export default function AddOp({ periodId, handleAddOpScore, handleAddOpFoul }: Props) {

    return (
    <tbody className="relative w-full">
        <tr className="-translate-y-6">
            <td></td>
            <td></td>
            <td className="flex justify-between">
            {/* <b>OP Score: </b> */}
                <button
                    className="rounded-full bg-muted text-black-50 shadow-sm flex w-25 items-center "
                    onClick={() => {handleAddOpScore(periodId, -1);}}
                >
                    <Minus size={16}/>
                </button>
                <button
                    className="rounded-full bg-muted text-black-50 shadow-sm flex w-25 items-center "
                    onClick={() => {handleAddOpScore(periodId, 1);}}
                >
                    <Plus size={16}/>
                </button>
            </td>
            <td></td>
            <td className="flex justify-between">
                {/* <b>OP Foul: </b> */}
                <button
                    className="rounded-full bg-muted text-black-50 shadow-sm flex w-25 items-center "
                    onClick={() => {
                        handleAddOpFoul(periodId, -1);
                    }}
                >
                    <Minus size={16}/>
                </button>               
                <button
                    className="rounded-full bg-muted text-black-50 shadow-sm flex w-25 items-center "
                    onClick={() => {
                        handleAddOpFoul(periodId, 1);
                    }}
                >
                    <Plus size={16}/>
                </button>
            </td>
        </tr>
    </tbody>

    )
}