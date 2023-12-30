import { type NextRequest, NextResponse } from "next/server";
import { type Player } from "@/lib/types/db";
import { db } from "@/db";
import { playersTable } from "@/db/schema";


export async function POST(req: NextRequest){
  try{
    const data = await req.json();
    //todo: parse the data
    const { number, name, photo, position, } = data as Player
    await db
      .insert(playersTable)
      .values({
        number,
        name,
        photo,
        position,
      })
      .execute();
    return NextResponse.json("OK", { status: 200 });
  } catch (error){
    console.log(error);
    return NextResponse.json({ error:"Internal Server Error" }, { status: 400 })
  }
}