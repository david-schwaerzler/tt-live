import { Box, Divider, Grid, Paper, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import GameScore from "./GameScore";

export interface GameReportProps {
    games: Array<Game>;
}

const PlayerCell = styled(Grid)({
    textAlign: "left",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    fontSize: "0.9rem"
})

type GameScore = Game & { homeTeamScore: number, guestTeamScore: number };

const GameReport = ({ games }: GameReportProps) => {

    const [gameScores, setgameScores] = useState<Array<GameScore>>([]);
    const [t] = useTranslation();


    useEffect(() => {
        let homeTeamScore = 0;
        let guestTeamScore = 0;

        let gameScores = games.map<GameScore>(g => {

            if (g.homeSets >= 3)
                homeTeamScore++;
            else if (g.guestSets >= 3)
                guestTeamScore++;

            return {
                ...g,
                homeTeamScore: guestTeamScore,
                guestTeamScore: homeTeamScore
            }
        });
        setgameScores(gameScores);
    }, [games]);


    return (
        <React.Fragment>
            <Paper sx={{ p: 2, mb: 2 }}>
                <Typography pb={2} variant="h5" >{t("GameReport.doubles")}</Typography>
                <Stack gap={1.5}>
                    {gameScores.filter(game => game.doubles).map(game => renderDoubles(game))}
                </Stack>
            </Paper>
            <Paper sx={{ p: 2 }}>
                <Typography pb={2} variant="h5">{t("GameReport.singles")}</Typography>
                <Stack gap={1.5}>
                    {gameScores.filter(game => !game.doubles).map(game => renderSingles(game))}
                </Stack>
            </Paper>
        </React.Fragment>
    )

    function renderDoubles(game: GameScore) {
        return (
            <Box key={game.gameNumber} sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontSize: "0.8rem" }}>{game.homeDoubles.player1}<br />{game.homeDoubles.player2}</PlayerCell>
                        {game.sets.map(value => <Grid key={value.number} sx={{ opacity: 0.5 }} item xs={1} margin="auto">{renderSet(value, true)}</Grid>)}
                        <Grid item xs={1} sx={{ fontWeight: "bold", m: "auto" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontSize: "0.8rem" }}>{game.guestDoubles.player1}<br />{game.guestDoubles.player2}</PlayerCell>
                        {game.sets.map(value => <Grid key={value.number} sx={{ opacity: 0.5 }} item xs={1} margin="auto">{renderSet(value, false)}</Grid>)}
                        <Grid item xs={1} sx={{ fontWeight: "bold", m: "auto" }}>{game.state !== "NOT_STARTED" ? game.guestSets : "-"}</Grid>
                    </Grid>
                </Box>
                <Box margin="auto" minWidth="40px" textAlign="right" fontSize="1.1rem">
                    {game.state !== "NOT_STARTED" && <i>{game.homeTeamScore}:{game.guestTeamScore}</i>}
                </Box>
            </Box>
        )
    }


    function renderSingles(game: GameScore) {
        return (
            <Box key={game.gameNumber} sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} >{game.homePlayer.name}</PlayerCell>
                        {game.sets.map(value => <Grid key={value.number} sx={{ opacity: 0.5 }} item xs={1}>{renderSet(value, true)}</Grid>)}
                        <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5}>{game.guestPlayer.name}</PlayerCell>
                        {game.sets.map(value => <Grid key={value.number} sx={{ opacity: 0.5 }} item xs={1}>{renderSet(value, false)}</Grid>)}
                        <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.guestSets : "-"}</Grid>
                    </Grid>
                </Box>
                <Box margin="auto" minWidth="40px" textAlign="right" fontSize="1.1rem">
                    {game.state !== "NOT_STARTED" && <i>{game.homeTeamScore}:{game.guestTeamScore}</i>}
                </Box>
            </Box>
        )
    }

    function renderSet(set: GameSet, isHome: boolean) {

        if (set.state === "NOT_STARTED")
            return <Typography>-</Typography>


        if (isHome) {
            if (set.homeScore > set.guestScore)
                return <Typography fontSize="0.9rem" sx={{ fontWeight: "bold" }}>{set.homeScore}</Typography>
            return <Typography fontSize="0.9rem">{set.homeScore}</Typography>
        } else {
            if (set.guestScore > set.homeScore)
                return <Typography fontSize="0.9rem" sx={{ fontWeight: "bold" }}>{set.guestScore}</Typography>
            return <Typography fontSize="0.9rem">{set.guestScore}</Typography>
        }
    }


}

export default GameReport;
