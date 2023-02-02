import { Box, Card, CardContent, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton, styled, Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../AppContext";
import { ChatMessage } from "../../rest/data/ChatMessage";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import GameLiveEdit from "../game/GameLiveEdit";
import GameSetScore, { InputType } from "../game/GameSetScore";

export interface GameReportProps {
    games: Array<Game> | null;
    /** Indicates if the user is an editor. Display all the editable Components when provided */
    editorCode: string | null;
    matchState: "FINISHED" | "NOT_STARTED" | "LIVE"
    messages: Array<ChatMessage>;
    matchId: number | null;
    onUpdate: (game: Game) => void;
}

const PlayerCell = styled(Grid)({
    textAlign: "left",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    fontSize: "0.9rem"
})

type GameType = "DOUBLES" | "SINGLES" | "FINISH_DOUBLES";
type GameScoreType = Game & { homeTeamScore: number, guestTeamScore: number, type: GameType };

const GAME_INPUT_TYPE_SETTING = "gameInputType";
const GAME_EDIT_SETTING = "gameEdit";

// TODO fix Render performance Issues
const GameReportTab = ({ games, editorCode, matchState, messages, matchId, onUpdate }: GameReportProps) => {

    const [t] = useTranslation();
    const context = useContext(AppContext);


    const [gameScores, setGameScores] = useState<Array<GameScoreType> | null>(null);
    const [hasFinishingDoubles, setFinishDoubles] = useState(false);

    const [inputType, setInputType] = useState(() => {
        let inputTypeStr = context.getSetting(GAME_INPUT_TYPE_SETTING);
        if (inputTypeStr == null)
            return InputType.SET;

        let inputType = parseInt(inputTypeStr);
        if (isNaN(inputType))
            return InputType.SET;

        return inputType;
    });
    const [isEditMode, setEditMode] = useState<boolean>(() => {
        let isEditModeStr = context.getSetting(GAME_EDIT_SETTING);
        if (isEditModeStr == null)
            return false;
        return isEditModeStr === "true";
    });

    const onError = useCallback((msg: string) => console.log("todo error"), []);

    useEffect(() => {
        if (games == null) {
            setGameScores(null);
            return;
        }

        let homeTeamScore = 0;
        let guestTeamScore = 0;

        let type: GameType = games.length === 0 ? "DOUBLES" : games[0].doubles ? "DOUBLES" : "SINGLES";
        let gameScores: Array<GameScoreType> = [];
        let hasFinishingDoubles = false;

        for (let g of games) {

            if (g.doubles === false && type === "DOUBLES") {
                type = "SINGLES";
            } else if (g.doubles === true && type === "SINGLES") {
                type = "FINISH_DOUBLES";
                hasFinishingDoubles = true;
            }

            if (g.homeSets >= 3)
                homeTeamScore++;
            else if (g.guestSets >= 3)
                guestTeamScore++;

            gameScores.push({
                ...g,
                type: type,
                homeTeamScore: homeTeamScore,
                guestTeamScore: guestTeamScore
            });
        };
        setFinishDoubles(hasFinishingDoubles);
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
                        <Stack gap={3}>
                            {gameScores.filter(game => game.type === "DOUBLES").map(game => renderDoubles(game))}
                        </Stack>
                    </CardContent>
                </Card>
            }
            {gameScores == null
                ? <Skeleton sx={{ height: { xs: "556px", sm: "556px" } }} variant="rectangular" />
                : <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography pb={2} variant="h5">{t("GameReport.singles")}</Typography>
                        <Stack gap={3}>
                            {gameScores.filter(game => game.type === "SINGLES").map(game => renderSingles(game))}
                        </Stack>
                    </CardContent>
                </Card>
            }

            {gameScores != null && hasFinishingDoubles &&
                <Card>
                    <CardContent>
                        <Typography pb={2} variant="h5">{t("GameReport.lastDouble")}</Typography>
                        <Stack gap={3}>
                            {gameScores.filter(game => game.type === "FINISH_DOUBLES").map(game => renderDoubles(game))}
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
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherit" : 0.5 }} item xs={1} margin="auto">
                                {renderGameSetScore(value, true, game)}
                            </Grid>)
                        }
                        <Grid item xs={1} sx={{ fontWeight: "bold", m: "auto" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>

                    <Divider />

                    <Grid container sx={{ textAlign: "center" }} columns={11}>
                        <PlayerCell item xs={5} sx={{ fontSize: "0.8rem", fontWeight: guestWon ? 500 : "normal" }}>{renderPlayer(game.guestDoubles.player1)}<br />{renderPlayer(game.guestDoubles.player2)}</PlayerCell>
                        {game.sets.map(value =>
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherit" : 0.5 }} item xs={1} margin="auto">
                                {renderGameSetScore(value, false, game)}
                            </Grid>
                        )}
                        <Grid item xs={1} sx={{ fontWeight: "bold", m: "auto" }}>{game.state !== "NOT_STARTED" ? game.guestSets : "-"}</Grid>
                    </Grid>
                </Box>
                <Stack minWidth="40px" textAlign="right" fontSize="1.1rem" justifyContent="center">
                    {game.state === "FINISHED" && <i>{game.homeTeamScore}:{game.guestTeamScore}</i>}
                    {game.state === "LIVE" && <Typography color={theme => theme.palette.primary.main} fontWeight="bold" fontStyle="italic">LIVE</Typography>}
                    {isEditMode === true && editorCode != null && matchId != null &&
                        <GameLiveEdit editorCode={editorCode} messages={messages} game={game} matchId={matchId} onUpdate={onUpdate} />
                    }
                </Stack>
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
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherit" : 0.5 }} item xs={1} >
                                {renderGameSetScore(value, true, game)}
                            </Grid>
                        )}
                        <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.homeSets : "-"}</Grid>
                    </Grid>
                    <Divider />
                    <Grid container sx={{ textAlign: "center", mt: "3px" }} columns={11} alignItems="center">
                        <PlayerCell item xs={5} sx={{ fontWeight: guestWon ? 500 : "normal" }}>{renderPlayer(game.guestPlayer.name)}</PlayerCell>
                        {game.sets.map(value =>
                            <Grid key={value.number} sx={{ opacity: isEditMode ? "inherit" : 0.5 }} item xs={1}>
                                {renderGameSetScore(value, false, game)}
                            </Grid>
                        )}
                        <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.state !== "NOT_STARTED" ? game.guestSets : "-"}</Grid>
                    </Grid>
                </Box>
                <Stack minWidth="40px" textAlign="right" fontSize="1.1rem" justifyContent="center">
                    {game.state === "FINISHED" && <i>{game.homeTeamScore}:{game.guestTeamScore}</i>}
                    {game.state === "LIVE" && <Typography color={theme => theme.palette.primary.main} fontWeight="bold" fontStyle="italic">LIVE</Typography>}
                    {isEditMode === true && editorCode != null && matchId != null &&
                        <GameLiveEdit editorCode={editorCode} messages={messages} game={game} matchId={matchId} onUpdate={onUpdate} />
                    }
                </Stack>
            </Box>
        )
    }

    function renderHeader() {
        return (
            <Grid container spacing={1} mb={2} justifyContent="center" alignItems="center">
                <Grid item xs={6}>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="select-inputType">{t("GameReport.inputType")}</InputLabel>
                        <Select
                            id="select-inputType"
                            labelId="select-inputType"
                            label={t("GameReport.inputType")}
                            value={inputType.toString()}
                            onChange={onInputTypeChanged}>
                            <MenuItem value={InputType.SET}>{t("GameReport.set")}</MenuItem>
                            <MenuItem value={InputType.POINTS}>{t("GameReport.points")}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} >
                    <FormControlLabel
                        sx={{ width: "100%", ml: 0, mr: 0 }}
                        control={
                            <Switch
                                checked={isEditMode}
                                onChange={onEditModeChanged}
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


    function onEditModeChanged() {
        setEditMode((isEditMode) => !isEditMode)
        context.setSetting(GAME_EDIT_SETTING, !isEditMode ? "true" : "false", true)
    }

    function onInputTypeChanged(e: SelectChangeEvent) {
        setInputType(parseInt(e.target.value as string));
        context.setSetting(GAME_INPUT_TYPE_SETTING, inputType.toString(), true)
    }

    function renderGameSetScore(set: GameSet, isHome: boolean, game: Game) {
        return <GameSetScore
            set={set}
            isHome={isHome}
            inputType={inputType}
            isEditMode={isEditMode}
            editorCode={editorCode}
            game={game}
            onError={onError}
            matchState={matchState}
            onUpdate={onUpdate}
        />

    }

    function renderPlayer(player: string) {
        if (player === "") {
            return <i>{t("GameReport.noPlayer")}</i>;
        }
        return player;
    }
}

export default React.memo(GameReportTab);
