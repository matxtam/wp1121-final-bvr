"use client";
import React from "react";

import { SetStateAction, useState } from "react";
import { GamePerformance } from "@/lib/types/db";

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
  const titles = ["#", "name", "on time", "2pt", "3pt", "ft", "foul", "steal", "block", "assist", "defReb", "offReb", "turnover", "point"]
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

  return (<div className="flex flex-row w-full px-12 py-6">
    <div className="grid grid-cols-14 w-3/4 gap-1">

    {contents.map((content, index) => {
      if(index === 2 && content.state[0]) return (<div className="flex flex-col w-max" key={content.title+"table"}>
      <p className="">{content.title}</p>
      <p className="">P1 P2 P3 P4 OT</p>
      </div>);
      else return (
      content.state[0] ? 
        <p className="w-max" key={content.title+"table"}>{content.title}</p> 
      : <div className="w-max" key={content.title+"table"}></div>
    )})}

    {playersOfTheGame.map((player) => (
    <React.Fragment key={player.player.name}>
      <p> {player.player.number}</p>
      <p> {player.player.name}  </p>
      {contents[2] .state[0] ? (<div className="flex flex-row w-full">
        <div className={cn("w-1/4 h-full bg-gray-100", player.onP1 && "bg-batra-200")}></div>
        <div className={cn("w-1/4 h-full bg-gray-100", player.onP2 && "bg-batra-200")}></div>
        <div className={cn("w-1/4 h-full bg-gray-100", player.onP3 && "bg-batra-200")}></div>
        <div className={cn("w-1/4 h-full bg-gray-100", player.onP4 && "bg-batra-200")}></div>
        <div className={cn("w-1/4 h-full bg-gray-100", player.onOt && "bg-batra-200")}></div>
      </div>) : <div></div>}
      {contents[3] .state[0] ? <p> {player.twoPt}   </p> : <div></div>}
      {contents[4] .state[0] ? <p> {player.threePt} </p> : <div></div>}
      {contents[5] .state[0] ? <p> {player.ft}      </p> : <div></div>}
      {contents[6] .state[0] ? <p> {player.foul}    </p> : <div></div>}
      {contents[7] .state[0] ? <p> {player.steal}   </p> : <div></div>}
      {contents[8] .state[0] ? <p> {player.block}   </p> : <div></div>}
      {contents[9] .state[0] ? <p> {player.assist}  </p> : <div></div>}
      {contents[10].state[0] ? <p> {player.defReb}  </p> : <div></div>}
      {contents[11].state[0] ? <p> {player.offReb}  </p> : <div></div>}
      {contents[12].state[0] ? <p> {player.turnover}</p> : <div></div>}
      {contents[13].state[0] ? <p> {player.point}   </p> : <div></div>}
    </React.Fragment>))}
    </div>
    <div className="flex flex-col w-1/4">
    <Switch
            defaultChecked={false}
            onCheckedChange={() => {}}
          />
      {contents.map((content) => (
        (content.state[1] !== undefined) &&
        <div className="flex flex-row items-center p-1 gap-3" key={content.title+"switch"}>
          <Switch
            defaultChecked={content.state[0]}
            onCheckedChange={() => {content.state[1] ? content.state[1](!content.state[0]) : {};
          console.log(content.title, content.state[0])}}
          />
          <label>{content.title}</label>
        </div>
      ))}
    </div>
  </div>)

}