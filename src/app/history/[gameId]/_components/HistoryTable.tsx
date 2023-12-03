"use client";
import { SetStateAction, useState } from "react";
import { GamePerformance } from "@/lib/types/db";

import Switch from "@/components/ui/switch";
import { type Dispatch } from "react";

interface performanceWithPlayer extends GamePerformance{
  player: {name: string; number:string; }
}

type Props = {
  playersOfTheGame: performanceWithPlayer[]
}

export default function History ({playersOfTheGame}:Props) {
  const titles = ["#", "name", "on time", "2pt", "3pt", "ft", "foul", "steal", "block", "assist", "defReb", "offReb", "turnover", "point"]
  const contents :{title: string, state: [boolean, Dispatch<SetStateAction<boolean>>|undefined] }[] = [];
  for(let i in titles){
    if(i==="0" || i==="1"){
      contents.push({
        title: titles[i],
        state: [true, undefined]
      })
    }else{
      contents.push({
        title: titles[i],
        state: useState(false),
      })
    }
  }


  return (<div className="flex flex-row w-full px-12 py-6">
    <div className="grid grid-cols-14 w-3/4 gap-1">

    {contents.map((content) => (
      content.state[0] && <p key={content.title}>{content.title}</p>
    ))}

    {playersOfTheGame.map((player) => (
    <>
      <p key={player.player.name}>{player.player.number}</p>
      <p key={player.player.name}>{player.player.name}  </p>
      {contents[2] .state[0] && <p key={player.player.name}>{"player on?"}   </p>}
      {contents[3] .state[0] && <p key={player.player.name}>{player.twoPt}   </p>}
      {contents[4] .state[0] && <p key={player.player.name}>{player.threePt} </p>}
      {contents[5] .state[0] && <p key={player.player.name}>{player.ft}      </p>}
      {contents[6] .state[0] && <p key={player.player.name}>{player.foul}    </p>}
      {contents[7] .state[0] && <p key={player.player.name}>{player.steal}   </p>}
      {contents[8] .state[0] && <p key={player.player.name}>{player.block}   </p>}
      {contents[9] .state[0] && <p key={player.player.name}>{player.assist}  </p>}
      {contents[10].state[0] && <p key={player.player.name}>{player.defReb}  </p>}
      {contents[11].state[0] && <p key={player.player.name}>{player.offReb}  </p>}
      {contents[12].state[0] && <p key={player.player.name}>{player.turnover}</p>}
      {contents[13].state[0] && <p key={player.player.name}>{player.point}   </p>}
    </>))}
    </div>
    <div className="flex flex-col w-1/4">

      {contents.map((content) => (
        (content.state[1] !== undefined) &&
        <div className="flex flex-row items-center p-1 gap-3" key={content.title}>
          <Switch
            defaultChecked={content.state[0]}
            onCheckedChange={() => content.state[1]? content.state[1](!content.state[0]) : {}}
          />
          <label>{content.title}</label>
        </div>
      ))}
    </div>
  </div>)

}