import {  Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import GameSetResultButton from "./GameSetResultButton";
import GameSetResultRadio from "./GameSetResultRadio";

export interface GameSetScoreProps {
    set: GameSet;
    game: Game;
    matchState: "NOT_STARTED" | "LIVE" | "FINISHED";
    isHome: boolean;
    isEditMode: boolean;
    inputType: InputType;
    editorCode: string | null;
    onError: (msg: string) => void;
    onUpdate: (game: Game) => void;
}

export enum InputType {
    SET, POINTS
}

const GameSetScore = ({ set, isHome, isEditMode, inputType, editorCode, game, matchState, onError, onUpdate }: GameSetScoreProps) => {

    let won = isWon();
    let score = isHome ? set.homeScore : set.guestScore;

    // render normal view
    if (editorCode == null || isEditMode === false)
        return renderNonEditView();

    let disabled = isDisabled();

    if (inputType === InputType.SET) {

        return <GameSetResultRadio
            disabled={disabled}
            editorCode={editorCode}
            gameId={game.id}
            isHome={isHome}
            selected={set.state === "FINISHED" && won}
            setNumber={set.number} 
            onError={onError}
            onUpdate={onUpdate}
        />
    } else if (inputType === InputType.POINTS) {
        return <GameSetResultButton
            disabled={disabled}
            editorCode={editorCode}
            game={game}
            isHome={isHome}
            set={set}
            won={won}
            onError={onError}
            onUpdate={onUpdate}
        />
    }

    return <Box>-</Box>;

    function renderNonEditView() {
        if (set.state === "NOT_STARTED")
            return <Typography>-</Typography>

        if ((isHome && set.homeScore === -1) || (!isHome && set.guestScore === -1))
            return <Box>?</Box>;

        if (won)
            return <Typography fontSize="0.9rem" sx={{ fontWeight: "bold" }}>{score}</Typography>
        else
            return <Typography fontSize="0.9rem">{score}</Typography>
    }



    function isWon(): boolean {
        if (set.state === "FINISHED") {
            if (isHome && set.homeScore > set.guestScore)
                return true;
            else if (!isHome && set.guestScore > set.homeScore)
                return true;
        }
        return false;
    }

    function isDisabled(): boolean {

        if(matchState === "FINISHED" && game.state === "NOT_STARTED")
            return true;

        if (set.state === "NOT_STARTED") {
            if (game.homeSets >= 3 || game.guestSets >= 3)
                return (game.homeSets + game.guestSets) < set.number;
            else
                return (game.homeSets + game.guestSets + 1) < set.number;
        }
        return false;
    }
}

export default React.memo(GameSetScore);