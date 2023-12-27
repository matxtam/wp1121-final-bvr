"use client"
import { useRef } from "react";
import { PlusCircle } from 'lucide-react';
import { type } from "os";
type Props = {
    handleAddPlayer: (inputName: string) => Promise<string>;
  };
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
            <button onClick={async() => {
                const resultPromise = handleAddPlayer(inputRef.current?.value || '');
                const result = await resultPromise;
                console.log('result', result.toString());
                if(result === "0") {
                   alert('Player not found');
                }
                if(result === "1") {
                    alert('Player already exists');
                }
                inputRef.current!.value = "";
                }}>
                <PlusCircle />
            </button>
      </div>
      

    )
}   
export default InputPlayerBar;