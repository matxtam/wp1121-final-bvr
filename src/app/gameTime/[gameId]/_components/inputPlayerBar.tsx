"use client"
import { useRef } from "react";
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Contact } from "lucide-react";

type Props = {
    handleAddPlayer: (inputName: string) => Promise<string>;
  };
function InputPlayerBar({ handleAddPlayer }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Dialog>
        <DialogTrigger asChild>
          <button
            className="flex items-center justify-center w-full h-10 rounded bg-secondary hover:bg-sky-200/80 hover:text-black transition-colors duration-300"
          >
            <Contact  size={18}/>
          </button>
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>
                <p>Add players</p>
            </DialogTitle>
            <form action={async(e) => {
                const resultPromise = handleAddPlayer(e.get("inputName")?.toString() ?? "");
                // const resultPromise = handleAddPlayer(inputRef.current?.value || '');
                const result = await resultPromise;
                console.log('result', result.toString());
                if(result === "0") {
                    alert('Player not found');
                }
                if(result === "1") {
                    alert('Player already exists');
                }
                // inputRef.current!.value = "";
                e.set("inputName", "");
                }}>
            <div className="flex items-center gap-0.5 px-2 py-1 mr-2 text-left text-md text-blue-400">
            <input
                type="text"
                name="inputName"
                placeholder="Enter Player Name"
                className="mr-2 p-1 border border-gray-300 rounded"
                ref={inputRef}
            />
            <DialogClose asChild>
            <button type="submit">
                <PlusCircle />
            </button>
        </DialogClose>       
      </div>
      
      </form>
      </DialogContent>
      
    </Dialog>
    )
}   
export default InputPlayerBar;
// async() => {
//     const resultPromise = handleAddPlayer(inputRef.current?.value || '');
//     const result = await resultPromise;
//     console.log('result', result.toString());
//     if(result === "0") {
//        alert('Player not found');
//     }
//     if(result === "1") {
//         alert('Player already exists');
//     }
//     inputRef.current!.value = "";
//     }