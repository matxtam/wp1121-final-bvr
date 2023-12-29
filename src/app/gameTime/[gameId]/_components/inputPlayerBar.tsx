"use client"
import { useRef, useState } from "react";
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Contact } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
    handleAddPlayer: (inputName: string) => Promise<string>;
    allPlayers: any;
  };


function InputPlayerBar({ handleAddPlayer, allPlayers }: Props) {
    // const inputRef = useRef<HTMLInputElement>(null);
    // const handleToggle = async (playerid:string) => {
    //   try {
    //       await TogglePlayerUsable(playerid, !playerUsable);
    //   } catch (error) {
    //       error instanceof Error;
    //   }
    //   setPlayerUsable(!playerUsable)
    // }
    const [checkedPlayers, setCheckedPlayers] = useState<string[]>([]);
    const togglePlayer = (playerName: string) => {
      setCheckedPlayers((prevCheckedPlayers) => {
        if (prevCheckedPlayers.includes(playerName)) {
          return prevCheckedPlayers.filter((name) => name !== playerName);
        } else {
          return [...prevCheckedPlayers, playerName];
        }
      });
    };
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
                checkedPlayers.map(async (playerName) => {
                    const resultPromise = handleAddPlayer(playerName);
                    const result = await resultPromise;
                    console.log('result', result.toString());
                    if(result === "0") {
                        alert('Player not found');
                    }
                    if(result === "1") {
                        alert('Player already exists');
                    }
                })
                // const resultPromise = handleAddPlayer(e.get("inputName")?.toString() ?? "");
                // const resultPromise = handleAddPlayer(inputRef.current?.value || '');
                // const result = await resultPromise;
                // console.log('result', result.toString());
                // if(result === "0") {
                //     alert('Player not found');
                // }
                // if(result === "1") {
                //     alert('Player already exists');
                // }
                // inputRef.current!.value = "";
                // e.set("inputName", "");
                setCheckedPlayers([]);
                }}>
            <div className="flex items-center gap-0.5 px-2 py-1 mr-2 text-left text-md text-blue-400">
            {/* <input
                type="text"
                name="inputName"
                placeholder="Enter Player Name"
                className="mr-2 p-1 border border-gray-300 rounded"
                ref={inputRef}
            /> */}
            {allPlayers.map((player: any) => (
                player && (
                    <div className="flex" key={player.id}>
                        <div className="flex flex-row items-center">
                            <Checkbox
                              checked={checkedPlayers.includes(player.name)}
                              onClick={() => togglePlayer(player.name)}
                            />
                            <p className="p-3">{player.name}</p>
                        </div>                  
                    </div>
                )
            ))}
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