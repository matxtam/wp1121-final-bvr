"use client"
import PlayerInfo from "@/app/settings/_components/PlayerInfo";
import { Button } from "@/components/ui/button";
// import PlayerDialog from "./PlayerDialog";
import { useState } from "react";
    
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

export type Player = {
    id: number;
    displayId: string;
    name: string;
    photo: string;
    number: string; //背號 
    position: string; //位置
    useable: boolean; //是否可用
    personalValue: number; //個人價值(不知需不需要)
    personal2pt: number; //個人兩分球數
    personalIn2pt: number; //個人兩分球進球數
    personal3pt: number; //個人三分球數
    personalIn3pt: number; //個人三分球進球數
    personalDefReb: number; //個人防守籃板數
    personalOffReb: number; //個人進攻籃板數
    personalSteal: number; //個人抄截數
    personalAssist: number; //個人助攻數
  };
  
// type Players = {
//     players: Player[],
// };
     
// export default function PlayerListTable({players}:Players) {
export default function PlayerListTable() {
        const handleAddClick = () => {
        // add a new player to the database
    };
    const [isopen, setIsOpen] = useState(false);
    // const handleDialogClick = () => {
    //     setIsOpen(true);
    // };

    return(
        <>
            <Button onClick={handleAddClick}>Add New Player</Button>
            {/* <Button onClick={handleDialogClick}>Check Player Detaila</Button> */}
            <Table>
                <TableRow>
                    <TableCell align="center">Number</TableCell>
                    <TableCell align="center">Photo</TableCell>
                    <TableCell align="center">Player</TableCell>
                    <TableCell align="center">Position</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                    <TableCell align="center">Info</TableCell>
                </TableRow>
                <TableBody>
                    <PlayerInfo
                        playerid="playerid"
                        playername="playername"
                        playerphoto="https://cafe24img.poxo.com/dinotaeng/web/product/tiny/202303/3a6acc7861d016504fb115d69ed34198.gif"
                        playerposition="playerposition"
                        playerusable={true}
                    />
                    {/* {players?.map((player) => (
                        <PlayerInfo
                        key={player.id}
                        playerid={player.displayId}
                        // checkvalue={checked}
                        {...player}
                        // handlecheckcancel={()=>{setChecked(false)}}
                        />
                    ))} */}
                </TableBody>
                {/* <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center">
                        <Button onClick={handleAddClick}>Add New Player</Button>
                    </TableCell>
                </TableRow> */}
            </Table>
            {/* {isopen?(<PlayerDialog open={isopen}/>):<></>} */}
        </>
)}