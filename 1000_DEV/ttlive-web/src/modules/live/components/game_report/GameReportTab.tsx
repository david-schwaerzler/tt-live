import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Skeleton, Switch } from "@mui/material";
import React, {  useContext, useDeferredValue, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../../AppContext";
import { ChatMessage } from "../../../../rest/data/ChatMessage";
import { Game } from "../../../../rest/data/Game";
import { MatchState } from "../../../../rest/data/Match";
import { InputType } from "./edit/GameSetScore";

import GameReportSection from "./GameReportSection";
import { GameScoreType, GameType } from "./GameScoreType";

export interface GameReportProps {
    games: Array<Game> | null;
    /** Indicates if the user is an editor. Display all the editable Components when provided */
    editorCode: string | null;
    matchState: MatchState
    messages: Array<ChatMessage>;
    matchId: number | null;
    onUpdate: (game: Game) => void;
}



const GAME_INPUT_TYPE_SETTING = "gameInputType";
const GAME_EDIT_SETTING = "gameEdit";

interface GameReportSectionType {
    type: GameType;
    games: Array<GameScoreType>;
}

// TODO fix Render performance Issues
const GameReportTab = ({ games, editorCode, matchState, messages, matchId, onUpdate }: GameReportProps) => {

    const [t] = useTranslation();
    const context = useContext(AppContext);

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

    const deferredIsEditMode = useDeferredValue(isEditMode);
    const deferredInputType = useDeferredValue(inputType);


    const sections = useMemo(() => {
        if (games == null) {
            return null;
        }

        let homeTeamScore = 0;
        let guestTeamScore = 0;

        let sections: Array<GameReportSectionType> = [];
        let currentSection: GameReportSectionType = {
            type: games.length === 0 ? "DOUBLES" : games[0].doubles ? "DOUBLES" : "SINGLES",
            games: []
        };

        for (let g of games) {
            if (g.doubles === false && currentSection.type === "DOUBLES") {
                sections.push(currentSection);
                currentSection = { type: "SINGLES", games: [] };
            } else if (g.doubles === true && currentSection.type === "SINGLES") {
                sections.push(currentSection);
                currentSection = { type: "DOUBLES", games: [] };
            }

            if (g.homeSets >= 3)
                homeTeamScore++;
            else if (g.guestSets >= 3)
                guestTeamScore++;

            currentSection.games.push({
                ...g,
                homeTeamScore: homeTeamScore,
                guestTeamScore: guestTeamScore,
                
            });
        };

        if (currentSection.type === "DOUBLES") {
            currentSection.type = "FINISH_DOUBLES";
        }
        sections.push(currentSection);
        return sections;

    }, [games]);


    return (
        <React.Fragment>

            {editorCode != null && renderHeader()}

            {sections == null
                ? <React.Fragment>
                    <Skeleton sx={{ height: { xs: "247px", sm: "247px" }, mb: 2 }} variant="rectangular" />
                    <Skeleton sx={{ height: { xs: "556px", sm: "556px" } }} variant="rectangular" />
                </React.Fragment>
                : sections.map((section, index) =>
                   <GameReportSection
                    key={index}
                    games={section.games}
                    type={section.type}
                    editorCode={editorCode}
                    inputType={deferredInputType}
                    isEditMode={deferredIsEditMode}
                    matchId={matchId}
                    matchState = {matchState}
                    messages={messages}
                    onUpdate={onUpdate}
                    />
                )
            }

        </React.Fragment>
    );

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
        context.setSetting(GAME_INPUT_TYPE_SETTING, e.target.value.toString(), true)
    }
}


export default React.memo(GameReportTab);
