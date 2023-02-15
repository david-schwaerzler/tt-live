import { Box, Grid, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatMessage } from "../../../../rest/data/ChatMessage";
import { Game } from "../../../../rest/data/Game";
import { GameSet } from "../../../../rest/data/GameSet";
import GameLiveEdit from "../live_edit/GameLiveEdit";
import GameSetScore, { InputType } from "./edit/GameSetScore";

import GameReportPlayerCell from "./GameReportPlayerCell";

export interface GameReportGameRowProps {
    matchId: number | null;
    matchState: "FINISHED" | "NOT_STARTED" | "LIVE";
    game: Game;
    inputType: InputType;
    isEditMode: boolean;
    homeTeamScore: number;
    guestTeamScore: number;
    editorCode: string | null;
    messages: Array<ChatMessage>;
    onUpdate: (game: Game) => void;
    onError: (msg: string) => void;
}


const GameReportGameRow = ({ game, inputType, isEditMode, homeTeamScore, guestTeamScore, editorCode, messages, matchId, matchState, onUpdate, onError }: GameReportGameRowProps) => {

    const [isEditModeLocal, setEditModeLocal] = useState(isEditMode);
    const [inputTypelocal, setInputTypeLocal] = useState(inputType);

    const timeout = game.gameNumber * 30;

    useEffect(() => {
        const id = setTimeout(() => {
            setEditModeLocal(isEditMode);
        }, timeout)

        return () => clearTimeout(id);
    }, [isEditMode, timeout])

    useEffect(() => {
        const id = setTimeout(() => {
            setInputTypeLocal(inputType);
        }, timeout)

        return () => clearTimeout(id);
    }, [inputType, timeout])

    let homeWon = game.state === "FINISHED" && game.homeSets > game.guestSets;
    let guestWon = game.state === "FINISHED" && game.guestSets > game.homeSets;

    let homePlayer1 = game.homePlayer?.name;
    let homePlayer2 = null;
    let guestPlayer1 = game.guestPlayer?.name;
    let guestPlayer2 = null;

    if (game.doubles) {
        homePlayer1 = game.homeDoubles.player1;
        homePlayer2 = game.homeDoubles.player2;
        guestPlayer1 = game.guestDoubles.player1;
        guestPlayer2 = game.guestDoubles.player2;
    }

    return (
        <Box key={game.gameNumber} sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container sx={{ textAlign: "center", mb: "3px" }} columns={11} alignItems="center">
                    <GameReportPlayerCell player1={homePlayer1} player2={homePlayer2} won={homeWon} />
                    {game.sets.map(value =>
                        <Grid key={value.number} sx={{ opacity: isEditModeLocal ? "inherit" : 0.5 }} item xs={1} >
                            {renderGameSetScore(value, true, game)}
                        </Grid>
                    )}
                    <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                </Grid>
                <Divider />
                <Grid container sx={{ textAlign: "center", mt: "3px" }} columns={11} alignItems="center">
                    <GameReportPlayerCell player1={guestPlayer1} player2={guestPlayer2} won={guestWon} />
                    {game.sets.map(value =>
                        <Grid key={value.number} sx={{ opacity: isEditModeLocal ? "inherit" : 0.5 }} item xs={1}>
                            {renderGameSetScore(value, false, game)}
                        </Grid>
                    )}
                    <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.guestSets : "-"}</Grid>
                </Grid>
            </Box>
            <Stack  minWidth="40px" textAlign="right" fontSize="1.1rem" justifyContent="center">
                {game.state === "FINISHED" && <i>{homeTeamScore}:{guestTeamScore}</i>}
                {game.state === "LIVE" && <Typography color={theme => theme.palette.primary.main} fontWeight="bold" fontStyle="italic">LIVE</Typography>}
                {isEditModeLocal === true && editorCode != null && matchId != null &&
                    <GameLiveEdit editorCode={editorCode} messages={messages} game={game} matchId={matchId} onUpdate={onUpdate} />
                }
            </Stack>
        </Box>
    );

    function renderGameSetScore(set: GameSet, isHome: boolean, game: Game) {
        return <GameSetScore
            set={set}
            isHome={isHome}
            inputType={inputTypelocal}
            isEditMode={isEditModeLocal}
            editorCode={editorCode}
            game={game}
            onError={onError}
            matchState={matchState}
            onUpdate={onUpdate}
        />

    }
};

export default React.memo(GameReportGameRow);
