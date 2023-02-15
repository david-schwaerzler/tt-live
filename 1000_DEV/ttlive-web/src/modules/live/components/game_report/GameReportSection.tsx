import { Card, CardContent, Typography, Stack } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChatMessage } from "../../../../rest/data/ChatMessage";
import { Game } from "../../../../rest/data/Game";
import { InputType } from "./edit/GameSetScore";
import GameReportGameRow from "./GameReportGameRow";
import { GameScoreType, GameType } from "./GameScoreType";

export interface GameReportSectionProps {
    games: Array<GameScoreType>;
    type: GameType;
    editorCode: string | null;
    inputType: InputType;
    isEditMode: boolean;
    matchId: number | null;
    matchState: "FINISHED" | "NOT_STARTED" | "LIVE"
    messages: Array<ChatMessage>;
    onUpdate: (game: Game) => void;
}

const GameReportSection = ({ games, type,editorCode, isEditMode, inputType, matchId, messages, matchState, onUpdate}: GameReportSectionProps) => {

    const [t] = useTranslation();


    const onError = useCallback((msg: string) => console.log("todo error"), []);

    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Typography pb={2} variant="h5" >{getSectionTitle(type)}</Typography>
                <Stack gap={3}>
                    {games.map(game =>
                        <GameReportGameRow
                            key={game.gameNumber}
                            editorCode={editorCode}
                            game={game}
                            guestTeamScore={game.guestTeamScore}
                            homeTeamScore={game.homeTeamScore}
                            inputType={inputType}
                            isEditMode={isEditMode}
                            matchId={matchId}
                            matchState={matchState}
                            messages={messages}
                            onError={onError}
                            onUpdate={onUpdate}
                        />)}
                </Stack>
            </CardContent>
        </Card>
    );

    function getSectionTitle(type: GameType){
        switch(type){
            case "DOUBLES": return t("GameReport.doubles");
            case "SINGLES":  return t("GameReport.singles");
            case "FINISH_DOUBLES":  return t("GameReport.lastDouble");
        }
    }
}

export default GameReportSection;