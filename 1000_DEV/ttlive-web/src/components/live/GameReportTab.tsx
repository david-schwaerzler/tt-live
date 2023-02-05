import { Card, CardContent, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton, Switch, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useCallback, useContext, useDeferredValue, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../AppContext";
import { ChatMessage } from "../../rest/data/ChatMessage";
import { Game } from "../../rest/data/Game";
import { InputType } from "../game/GameSetScore";
import GameReportGameRow from "./GameReportGameRow";

export interface GameReportProps {
    games: Array<Game> | null;
    /** Indicates if the user is an editor. Display all the editable Components when provided */
    editorCode: string | null;
    matchState: "FINISHED" | "NOT_STARTED" | "LIVE"
    messages: Array<ChatMessage>;
    matchId: number | null;
    onUpdate: (game: Game) => void;
}



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

    const  deferredIsEditMode = useDeferredValue(isEditMode);
    const  deferredInputType = useDeferredValue(inputType);

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
                            {gameScores.filter(game => game.type === "DOUBLES").map(game => renderGame(game))}
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
                            {gameScores.filter(game => game.type === "SINGLES").map(game => renderGame(game))}
                        </Stack>
                    </CardContent>
                </Card>
            }

            {gameScores != null && hasFinishingDoubles &&
                <Card>
                    <CardContent>
                        <Typography pb={2} variant="h5">{t("GameReport.lastDouble")}</Typography>
                        <Stack gap={3}>
                            {gameScores.filter(game => game.type === "FINISH_DOUBLES").map(game => renderGame(game))}
                        </Stack>
                    </CardContent>
                </Card>
            }
        </React.Fragment>
    )

    function renderGame(game: GameScoreType) {

        return (
            <GameReportGameRow
                key={game.gameNumber}
                editorCode={editorCode}
                game={game}
                guestTeamScore={game.guestTeamScore}
                homeTeamScore={game.homeTeamScore}
                inputType={deferredInputType}
                isEditMode={deferredIsEditMode}
                matchId={matchId}
                matchState={matchState}
                messages={messages}
                onError={onError}
                onUpdate={onUpdate}
            />
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
}


export default React.memo(GameReportTab);
