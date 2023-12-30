"use client";
import React from "react";

import { type SetStateAction, useState } from "react";
import { type GamePerformance } from "@/lib/types/db";

import Switch from "@/components/ui/switch";
import { type Dispatch } from "react";

import { cn } from "@/lib/utils/shadcn";

interface performanceWithPlayer extends GamePerformance{
  player: {name: string; number:string; }
}

type Props = {
  playersOfTheGame: performanceWithPlayer[]
}

export default function History ({playersOfTheGame}:Props) {
  const titles = ["No.", "name", "on time", "2pt", "3pt", "ft", "foul", "steal", "block", "assist", "defReb", "offReb", "turnover", "point"]
  const contents :{title: string, state: [boolean, Dispatch<SetStateAction<boolean>>|undefined] }[] = [];
  
  titles.forEach((title) => {
    contents.push({
      title: title,
      state: [true, undefined]
    })
  })
  contents[2].state = useState(false);
  contents[3].state = useState(false);
  contents[4].state = useState(false);
  contents[5].state = useState(false);
  contents[6].state = useState(false);
  contents[7].state = useState(false);
  contents[8].state = useState(false);
  contents[9].state = useState(false);
  contents[10].state = useState(false);
  contents[11].state = useState(false);
  contents[12].state = useState(false);
  contents[13].state = useState(false);


  return (
  <div className="flex flex-row justify-between w-full px-12 py-6">
    <div className="flex flex-row justify-center w-full">
    <table className="w-min gap-1 h-min" >
      <thead>
        <tr>
          {contents.map((content, index) => {
          // titles
          if(index === 2 && content.state[0]) return (
          <th className="flex flex-col w-max" key={content.title+"table"}>
            <p className="">{content.title}</p>
            <p className="">P1 P2 P3 P4 OT</p>
          </th>);
          else if(index <2) return (<th>
          <p key={content.title+"table"}>{content.title}</p>
        </th>)
          else return (
          content.state[0] ? 
            <th className="relative">
              <div className="flex justify-start items-left absolute bottom-0 left-6">
                <p className="origin-bottom-left -rotate-45" key={content.title+"table"}>{content.title}</p>
              </div>
            </th>
            : <></>
          // : <div className="w-max" key={content.title+"table"}></div>
          )})}
        </tr>
      </thead>
    <tbody>
      {playersOfTheGame.map((player) => (
      <tr key={player.player.name} className="odd:bg-muted even:bg-background items-center text-center align-middle truncate">
        <td><p className="p-2"> {player.player.number}</p></td>
        <td><p className="p-2"> {player.player.name}  </p></td>
        {contents[2] .state[0] ? (<td className="flex flex-row items-center justify-center my-2">
          <div className={cn("w-1/5 h-8 bg-primary", player.onP1 && "bg-muted-foreground")}></div>
          <div className={cn("w-1/5 h-8 bg-primary", player.onP2 && "bg-muted-foreground")}></div>
          <div className={cn("w-1/5 h-8 bg-primary", player.onP3 && "bg-muted-foreground")}></div>
          <div className={cn("w-1/5 h-8 bg-primary", player.onP4 && "bg-muted-foreground")}></div>
          <div className={cn("w-1/5 h-8 bg-primary", player.onOt && "bg-muted-foreground")}></div>
        </td>) : <></>}
        {contents[3] .state[0] ? <td><p className="p-2"> {`${player.inTwoPt}/${player.twoPt}`}   </p></td> : <></>}
        {contents[4] .state[0] ? <td><p className="p-2"> {`${player.inThreePt}/${player.threePt}`} </p></td> : <></>}
        {contents[5] .state[0] ? <td><p className="p-2"> {`${player.inFt}/${player.ft}`}      </p></td> : <></>}
        {contents[6] .state[0] ? <td><p className="p-2"> {player.foul}    </p></td> : <></>}
        {contents[7] .state[0] ? <td><p className="p-2"> {player.steal}   </p></td> : <></>}
        {contents[8] .state[0] ? <td><p className="p-2"> {player.block}   </p></td> : <></>}
        {contents[9] .state[0] ? <td><p className="p-2"> {player.assist}  </p></td> : <></>}
        {contents[10].state[0] ? <td><p className="p-2"> {player.defReb}  </p></td> : <></>}
        {contents[11].state[0] ? <td><p className="p-2"> {player.offReb}  </p></td> : <></>}
        {contents[12].state[0] ? <td><p className="p-2"> {player.turnover}</p></td> : <></>}
        {contents[13].state[0] ? <td><p className="p-2"> {player.point}   </p></td> : <></>}
      </tr>))}
      </tbody>
    </table>
    </div>
    <div className="flex flex-col w-1/4">

      <div className="flex flex-row items-center p-1 gap-3">
        <Switch
          defaultChecked={false}
          onCheckedChange={(checked) => {
            contents.forEach((content) => {if(content.state[1])content.state[1](checked);})
          }}
        />
          <label>View All</label>
        </div>
      
      {contents.map((content) => (
        (content.state[1] !== undefined) &&
        <div className="flex flex-row items-center p-1 gap-3" key={content.title+"switch"}>
          <Switch
            defaultChecked={content.state[0]}
            checked={content.state[0]}
            onCheckedChange={() => {content.state[1] ? content.state[1](!content.state[0]) : {};
          }}

          />
          <label>{content.title}</label>
        </div>
      ))}
    </div>
  </div>)

}