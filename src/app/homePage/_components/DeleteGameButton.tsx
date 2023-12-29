"use client"
import { Button } from "@/components/ui/button";
import { DeleteGame } from "../actions";

type DeleteGameButtonProps = {
    gameId: string;
    };
export default function DeleteGameButton({gameId}: DeleteGameButtonProps) {
    const handleDelete = async (gameId:string) => {
        console.log("delete");
        try {
            await DeleteGame(gameId);
        } catch (error) {
            console.log("error is", error);
        }
    };
    const handlePreventDefault = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }
    return (
        <div>
            <Button className="destructive" onClick={(e) => {handleDelete(gameId); handlePreventDefault(e)}}>
                DeleteGameButton
            </Button>
        </div>
    );
    }