"use client"
import { useRef } from "react";
import { PlusCircle } from 'lucide-react';
import { type } from "os";

type Props = {
     handleAddPlayer: (inputName:string) => void;
}
function InputPlayerBar({ handleAddPlayer }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="flex items-center gap-0.5 px-2 py-1 mr-2 text-left text-md text-blue-400">
            <input
                type="text"
                name="inputName"
                placeholder="Enter Player Name"
                className="mr-2 p-1 border border-gray-300 rounded"
                ref={inputRef}
            />
            <button onClick={()=>handleAddPlayer(inputRef.current?.value||'')}>
                <PlusCircle />
            </button>
      </div>
    )
}   
export default InputPlayerBar;