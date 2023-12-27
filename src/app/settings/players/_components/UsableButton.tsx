// "use client";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useState } from "react";
// import { PlayerUsable } from "../actions";

// type UsableButtonProps = {
//     displayId: string;
//     usable: boolean;
//     };

// export default function UsableButton({displayId, usable}: UsableButtonProps) {
//   const [playerUsable, setPlayerUsable] = useState<boolean>(usable);
//   const handleToggleUsable = async (playerid:string) => {
//     // setPlayerUsable(!playerUsable);
//     try {
//         await PlayerUsable(playerid, playerUsable);
//     } catch (error) {
//         error instanceof Error;
//     }
//   }
//   const handleToggle = () => {
//     setPlayerUsable(!playerUsable);
//   }

//   return (
//     <Checkbox checked={playerUsable} onClick={handleToggle} onChange={() => handleToggleUsable(displayId)}/>
//   );
// }