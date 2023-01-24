import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import { useBackDialogHandler } from "../utils/useBackDialogHandler";
import GameSetResultDialog from "./GameSetResultDialog";

export interface GameSetResultButtonProps {
    disabled: boolean
    won: boolean;
    isHome: boolean;
    editorCode: string;
    set: GameSet
    game: Game;
    onError: (msg: string) => void;
    onUpdate: (game: Game) => void;
}

const GameSetResultButton = ({ disabled, won, set, game, isHome, editorCode, onError, onUpdate }: GameSetResultButtonProps) => {

    const [show, setShow] = useState<boolean>(false);
    useBackDialogHandler(show, setShow);

    let buttonScore = isHome ? set.homeScore : set.guestScore;
    return (
        <React.Fragment>
            {show === true &&
                < GameSetResultDialog
                    editorCode={editorCode}
                    game={game}
                    set={set}
                    isHome={isHome}
                    show={show}
                    onError={onError}
                    onUpdate={onUpdate}
                    onClose={() => setShow(false)}
                />
            }

            <Button disabled={disabled} variant="outlined" sx={{ pt: "3px", pb: "3px", pl: "0px", pr: "0px", minWidth: "95%" }} onClick={() => setShow(true)}>
                {disabled ? <Typography fontSize="0.8rem" >-</Typography> :
                    won
                        ? <Typography fontSize="0.8rem" sx={{ fontWeight: "bold" }}>{buttonScore === -1 ? "?" : buttonScore}</Typography>
                        : <Typography fontSize="0.8rem">{buttonScore === -1 ? "?" : buttonScore}</Typography>
                }
            </Button>
        </React.Fragment>
    );
}

export default GameSetResultButton;