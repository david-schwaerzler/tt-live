import { Box, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Skeleton, styled, Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../AppContext";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import GameSetScore, { InputType } from "./GameSetScore";

export interface GameReportProps {
    games: Array<Game> | null;
    /** Indicates if the user is an editor. Display all the editable Components when provided */
    editorCode: string | null;
    matchState: "FINISHED" | "NOT_STARTED" | "LIVE"
}

const PlayerCell = styled(Grid)({
    textAlign: "left",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    fontSize: "0.9rem"
})

type GameScoreType = Game & { homeTeamScore: number, guestTeamScore: number };

const GAME_INPUT_TYPE_SETTING = "gameInputType"

// TODO fix Render performance Issues
const GameReport = ({ games, editorCode, matchState }: GameReportProps) => {

    const [gameScores, setGameScores] = useState<Array<GameScoreType> | null>(null);
    const [lastDouble, setLastDouble] = useState<GameScoreType | null>(null);
    const [isEditMode, setEditMode] = useState<boolean>(editorCode != null);

    const [t] = useTranslation();
    const context = useContext(AppContext);


    useEffect(() => {
        if (games == null) {
            setGameScores(null);
            return;
        }

        let homeTeamScore = 0;
        let guestTeamScore = 0;

        let gameScores = games.map<GameScoreType>(g => {

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

        let lastDouble = gameScores[gameScores.length - 1];
        if (lastDouble.doubles) {
            gameScores = gameScores.filter(gc => gc.id != lastDouble.id)
            setLastDouble(lastDouble)
        } else {
            setLastDouble(null);
        }

        setGameScores(gameScores);
    }, [games]);


    return (
        <React.Fragment>
            {editorCode != null && renderHeader()}

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
                : <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography pb={2} variant="h5">{t("GameReport.singles")}</Typography>
                        <Stack gap={1.5}>
                            {gameScores.filter(game => !game.doubles).map(game => renderSingles(game))}
                        </Stack>
                    </CardContent>
                </Card>
            }

            {lastDouble == null
                ? <Skeleton sx={{ height: { xs: "100px", sm: "100px" } }} variant="rectangular" />
                : <Card>
                    <CardContent>
                        <Typography pb={2} variant="h5">{t("GameReport.lastDouble")}</Typography>
                        <Stack gap={1.5}>
                            {renderDoubles(lastDouble)}
                        </Stack>
                    </CardContent>
                </Card>
            }
        </React.Fragment>
    )

    function renderDoubles(game: GameScoreType) {

        let homeWon = game.state === "FINISHED" && game.homeSets > game.guestSets;
        let guestWon = game.state === "FINISHED" && game.guestSets > game.homeSets;

        return (
            <Box key={game.gameNumber} sx={{ display: "flex" }} >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontSize: "0.8rem", fontWeight: homeWon ? 500 : "normal" }}>{renderPlayer(game.homeDoubles.player1)}<br />{renderPlayer(game.homeDoubles.player2)}</PlayerCell>
                        {game.sets.map(value =>
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherited" : 0.5 }} item xs={1} margin="auto">
                                {renderGameSetScore(value, true, game)}
                            </Grid>)
                        }
                        <Grid item xs={1} sx={{ fontWeight: "bold", m: "auto" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>

                    <Divider />

                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontSize: "0.8rem", fontWeight: guestWon ? 500 : "normal" }}>{renderPlayer(game.guestDoubles.player1)}<br />{renderPlayer(game.guestDoubles.player2)}</PlayerCell>
                        {game.sets.map(value =>
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherited" : 0.5 }} item xs={1} margin="auto">
                                {renderGameSetScore(value, false, game)}
                            </Grid>
                        )}
                        <Grid item xs={1} sx={{ fontWeight: "bold", m: "auto" }}>{game.state !== "NOT_STARTED" ? game.guestSets : "-"}</Grid>
                    </Grid>
                </Box>
                <Box margin="auto" minWidth="40px" textAlign="right" fontSize="1.1rem">
                    {game.state === "FINISHED" && <i>{game.homeTeamScore}:{game.guestTeamScore}</i>}
                    {game.state === "LIVE" && <Typography color={theme => theme.palette.primary.main} fontWeight="bold" fontStyle="italic">LIVE</Typography>}
                </Box>
            </Box>
        )
    }



    function renderSingles(game: GameScoreType) {
        let homeWon = game.state === "FINISHED" && game.homeSets > game.guestSets;
        let guestWon = game.state === "FINISHED" && game.guestSets > game.homeSets;

        return (
            <Box key={game.gameNumber} sx={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container sx={{ textAlign: "center", mb: "3px" }} columns={11} alignItems="center">
                        <PlayerCell item xs={5} sx={{ fontWeight: homeWon ? 500 : "normal" }}>{renderPlayer(game.homePlayer.name)}</PlayerCell>
                        {game.sets.map(value =>
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherited" : 0.5 }} item xs={1} >
                                {renderGameSetScore(value, true, game)}
                            </Grid>
                        )}
                        <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ textAlign: "center", mt: "3px" }} columns={11} alignItems="center">
                        <PlayerCell item xs={5} sx={{ fontWeight: guestWon ? 500 : "normal" }}>{renderPlayer(game.guestPlayer.name)}</PlayerCell>
                        {game.sets.map(value =>
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherited" : 0.5 }} item xs={1}>
                                {renderGameSetScore(value, false, game)}
                            </Grid>
                        )}
                        <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.guestSets : "-"}</Grid>
                    </Grid>
                </Box>
                <Box margin="auto" minWidth="40px" textAlign="right" fontSize="1.1rem">
                    {game.state === "FINISHED" && <i>{game.homeTeamScore}:{game.guestTeamScore}</i>}
                    {game.state === "LIVE" && <Typography color={theme => theme.palette.primary.main} fontWeight="bold" fontStyle="italic">LIVE</Typography>}
                </Box>
            </Box>
        )
    }

    function renderHeader() {
        let inputType = context.getSetting(GAME_INPUT_TYPE_SETTING);

        return (
            <Grid container spacing={1} mb={2} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="select-inputType">{t("GameReport.inputType")}</InputLabel>
                        <Select
                            id="select-inputType"
                            labelId="select-inputType"
                            label={t("GameReport.inputType")}
                            value={inputType == null ? InputType.SET : parseInt(inputType)}
                            onChange={(e: any) => context.setSetting(GAME_INPUT_TYPE_SETTING, e.target.value, true)}>
                            <MenuItem value={InputType.SET}>{t("GameReport.set")}</MenuItem>
                            <MenuItem value={InputType.POINTS}>{t("GameReport.points")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    {/*<Button variant="outlined" sx={{ width: "100%", height: "100%" }}>{isEditMode ? t("GameReport.preview") : t("GameReport.edit")}</Button>*/}
                    <FormControlLabel
                        sx={{ width: "100%", ml: 0, mr: 0 }}
                        control={
                            <Switch
                                checked={isEditMode}
                                onChange={() => setEditMode(!isEditMode)}
                                name="loading"
                                color="primary"
                            />
                        }
                        label={t("GameReport.edit")}
                        labelPlacement="bottom"
                    />
                </Grid>
            </Grid>
        )
    }

    function renderGameSetScore(set: GameSet, isHome: boolean, game: Game) {
        return <GameSetScore
            set={set}
            isHome={isHome}
            inputType={parseInt(context.getSetting(GAME_INPUT_TYPE_SETTING))}
            isEditMode={isEditMode}
            editorCode={editorCode}
            game={game}
            onError={(msg) => console.log("todo error")}
            matchState={matchState}
        />

    }

    function renderPlayer(player: string) {
        if (player === "") {
            return <i>{t("GameReport.noPlayer")}</i>;
        }
        return player;
    }
}

export default GameReport;
