import { Box, Card, CardContent, Divider, Grid, Paper, Skeleton, styled, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import GameScore from "./GameScore";

export interface GameReportProps {
    games: Array<Game> | null;
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

    const [gameScores, setGameScores] = useState<Array<GameScore> | null>(null);
    const [t] = useTranslation();


    useEffect(() => {
        if (games == null) {
            setGameScores(null);
            return;
        }

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
        setGameScores(gameScores);
    }, [games]);


    return (
        <React.Fragment>
            {gameScores == null
                ? <Skeleton sx={{ height: { xs: "247px", sm: "247px" }, mb: 2 }} variant="rectangular" />
                : <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography pb={2} variant="h5" >{t("GameReport.doubles")}</Typography>
                        <Stack gap={1.5}>
                            {gameScores.filter(game => game.doubles).map(game => renderDoubles(game))}
                        </Stack>
                    </CardContent>
                </Card>
            }
            {gameScores == null
                ? <Skeleton sx={{ height: { xs: "556px", sm: "556px" } }} variant="rectangular" />
                : <Card>
                    <CardContent>
                        <Typography pb={2} variant="h5">{t("GameReport.singles")}</Typography>
                        <Stack gap={1.5}>
                            {gameScores.filter(game => !game.doubles).map(game => renderSingles(game))}
                        </Stack>
                    </CardContent>
                </Card>
            }
        </React.Fragment>
    )

    function renderDoubles(game: GameScore) {

        let homeWon = game.state === "FINISHED" && game.homeSets > game.guestSets;
        let guestWon = game.state === "FINISHED" && game.guestSets > game.homeSets;

        return (
            <Box key={game.gameNumber} sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontSize: "0.8rem", fontWeight: homeWon ? 500 : "normal" }}>{renderPlayer(game.homeDoubles.player1)}<br />{renderPlayer(game.homeDoubles.player2)}</PlayerCell>
                        {game.sets.map(value => <Grid key={value.number} sx={{ opacity: 0.5 }} item xs={1} margin="auto">{renderSet(value, true)}</Grid>)}
                        <Grid item xs={1} sx={{ fontWeight: "bold", m: "auto" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontSize: "0.8rem", fontWeight: guestWon ? 500 : "normal" }}>{renderPlayer(game.guestDoubles.player1)}<br />{renderPlayer(game.guestDoubles.player2)}</PlayerCell>
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

    function renderPlayer(player: string) {
        if (player === "") {
            return <i>{t("GameReport.noPlayer")}</i>;
        }
        return player;
    }


    function renderSingles(game: GameScore) {
        let homeWon = game.state === "FINISHED" && game.homeSets > game.guestSets;
        let guestWon = game.state === "FINISHED" && game.guestSets > game.homeSets;

        return (
            <Box key={game.gameNumber} sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontWeight: homeWon ? 500 : "normal" }}>{renderPlayer(game.homePlayer.name)}</PlayerCell>
                        {game.sets.map(value => <Grid key={value.number} sx={{ opacity: 0.5 }} item xs={1}>{renderSet(value, true)}</Grid>)}
                        <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontWeight: guestWon ? 500 : "normal" }}>{renderPlayer(game.guestPlayer.name)}</PlayerCell>
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
