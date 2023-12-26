import {TableCell, TableRow } from "@/components/ui/table"
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
import { Copy } from "lucide-react"
import { Label } from "@/components/ui/label"

  export type PlayerInfoProps = {
    playerid:string;
    playername: string;
    playerphoto: string;
    playerposition?: string;
    playerusable?: boolean;
    // description: string;
  };
  
  export default function PlayerInfo( {playerid, playername, playerphoto, playerposition, playerusable}:PlayerInfoProps ){
    const [isEditing, setIsEditing] = useState(false);
    const [editedPlayerid, setEditedPlayerid] = useState(playerid);
    const [editedPlayername, setEditedPlayername] = useState(playername);
    const [editedPlayerphoto, setEditedPlayerphoto] = useState(playerphoto);
    const [editedPlayerposition, setEditedPlayerposition] = useState(playerposition);
    const [isUsable, setIsUsable] = useState(playerusable);
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleDoneClick = () => {
        setIsEditing(false);
        // still need to update the player info in the database
    };
    const handleDeleteClick = () => {
        //still need to delete player in the database
        // delete the player from the database
        try {
            // await deleteList(id);
            // fetchLists();
            setIsUsable(false);
          } catch (error) {
            alert("Error: Failed to delete list");
          }
    };

    return(
        // <>
        <TableRow>
            <TableCell align="center">
                {isEditing ?
                    (<Input value={editedPlayerid} onChange={(e) => setEditedPlayerid(e.target.value)} />)
                    :
                    (<span>{editedPlayerid}</span>)
            }
            </TableCell>
            <TableCell align="center">
                {isEditing ?
                    (<Input placeholder="URL of the image" onChange={(e) => setEditedPlayerphoto(e.target.value)} />)
                    // (<Input type="file" onChange={(e) => setEditedPlayerphoto(e.target.value)} />)
                    :
                    (<Avatar>
                        <AvatarImage src={editedPlayerphoto} />
                        <AvatarFallback>CN</AvatarFallback>
                     </Avatar>)
                }
            </TableCell>
            <TableCell align="center">
                {isEditing ?
                    (<Input value={editedPlayername} onChange={(e) => setEditedPlayername(e.target.value)} />)
                    :
                    (<span>{editedPlayername}</span>)
                }
            </TableCell>
            <TableCell align="center">
                {isEditing ?
                    (<Input value={editedPlayerposition} onChange={(e) => setEditedPlayerposition(e.target.value)} />)
                    :
                    (<span>{editedPlayerposition}</span>)
                }
            </TableCell>
            <TableCell align="center">
                {isEditing ?
                    (<Button onClick={handleDoneClick}>Done</Button>)
                    :
                    (<Button onClick={handleEditClick}>Edit</Button>)
                }
            </TableCell>
            <TableCell align="center">
                    <Button onClick={handleDeleteClick}>Delete</Button>
            </TableCell>
            {/* {isEditing ?
                (<TableCell align="center">
                    <Button onClick={handleDeleteClick}>Delete</Button>
                </TableCell>)
                :
                (<></>)
            } */}
            <TableCell align="center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">More</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                        <DialogTitle>PlayerName</DialogTitle>
                        <DialogDescription>
                            information dialog for each player
                        </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            2pts: personal2pt/personalIn2pt+{isUsable? "1":"0"}
                            <br/>
                            3pts: personal3pt/personalIn3pt
                            <br/>
                            fts: personalFts/personalInFts
                            <br/>
                            Rebounce: personalDefReb + personalOffReb
                            <br/>
                            Assist: personalAssist
                            <br/>
                            Steal: personalSteal
                        </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                            Close
                            </Button>
                        </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
        // {/* </> */}
    )}
