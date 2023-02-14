import { IconButton } from "@mui/material";
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { ChatMessage } from "../../../../rest/data/ChatMessage";
import { Game } from "../../../../rest/data/Game";
import { useBackDialogHandler } from "../../../common/hooks/useBackDialogHandler";
import GameLiveEditDialog from "./GameLiveEditDialog";

export interface GameLiveEditProps {
    game: Game;
    matchId: number;
    messages: Array<ChatMessage>;
    editorCode: string;
    onUpdate: (game: Game) => void;
}

const GameLiveEdit = ({ game, messages, editorCode, matchId, onUpdate }: GameLiveEditProps) => {

    const [show, setShow] = useState<boolean>(false);

    useBackDialogHandler(show, setShow);

    return (
        <React.Fragment>
            {show === true &&
                <GameLiveEditDialog
                    editorCode={editorCode}
                    game={game}
                    matchId={matchId}
                    messages={messages}
                    show={show}
                    onClose={() => setShow(false)}
                    onUpdate={onUpdate}
                />
            }
            <IconButton onClick={() => setShow(true)} sx={{ mt: "auto", mb: "auto", p: 0, display: "flex", justifyContent: "right" }} disableRipple>
                <EditIcon sx={{ width: "20px" }} />
            </IconButton>

        </React.Fragment>
    );



}


export default GameLiveEdit;