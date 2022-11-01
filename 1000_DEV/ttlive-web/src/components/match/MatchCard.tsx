import { Button, Collapse, Divider, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Match } from "../../rest/data/Match";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";
import styled from "@emotion/styled";
import MatchStateLabel from "./MatchStateLabel";
import { Game } from "../../rest/data/Game";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "../../AppContext";
import GameScore from "../game/GameScore";
import MatchScore from "./MatchScore";
import ExpandButton from "../utils/ExpandButton";

export interface MatchCardProps {
    match: Match
}

const NUMBER_MATCHES = 4;

const MatchCard = ({ match }: MatchCardProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [t] = useTranslation();
    const navigate = useNavigate();
    const context = useContext(AppContext);

    return (
        <Paper elevation={5} >
            {renderHeader()}
            <Divider />
            <MatchScore match={match} scoreSize={{ xs: "2rem", sm: "3rem" }} />
            <Stack direction={{ xs: "column", sm: "column-reverse" }} padding={spacingSmall} gap={spacingNormal}>
                <Box sx={{ display: "flex", paddingLeft: spacingSmall, paddingRight: spacingSmall, justifyContent: "center" }} >
                    <Button sx={{ flexGrow: 1, maxWidth: "300px" }} variant="outlined" onClick={onLinkGame}>{t("MatchCard.linkGame")}</Button>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {renderGames()}
                </Collapse>
            </Stack>

            <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center" }} onClick={() => setExpanded(!expanded)}>
                <ExpandButton expanded={expanded} />
            </Box>
        </Paper >
    );

    function renderHeader() {
        return (
            <Box sx={{ opacity: 0.5, display: "flex" }} padding={spacingSmall}>
                <Typography sx={{ flexGrow: 1 }}>{match.league.name}</Typography>
                <Box sx={{ opacity: 1, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <MatchStateLabel variant="border" state={match.state} />
                </Box>
                <Typography>{match.league.region}</Typography>
            </Box>
        );
    }

    function renderMatchScore(teamName: string, score: number) {
        return (
            <Box sx={{ display: "flex", flexDirection: { xs: "row", sm: "column" }, flex: "1 1 0", justifyContent: "center" }}>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: { sm: "center" }, paddingBottom: spacingSmall }}>{teamName}</Typography>
                <Typography variant="h5" sx={{ fontSize: { md: "3rem" }, minWidth: "2em", textAlign: "center" }}><b>{score}</b></Typography>
            </Box>);
    }

    function renderGames() {
        // TODO Put displayed games in the state variable (with useEffect)
        let games = match.games;
        let liveGames = games.filter(g => g.state === "LIVE");
        let displayGames: Array<Game> = [];

        if (liveGames.length === 0) {
            for (let i = 0; i < Math.min(NUMBER_MATCHES, games.length); i++) {
                displayGames.push(games[i]);
            }
        } else {
            let maxNumber = Number.MIN_VALUE;

            liveGames.forEach(g => {
                maxNumber = g.gameNumber > maxNumber ? g.gameNumber : maxNumber;
            })
            maxNumber = maxNumber + 1 >= games.length ? games.length - 1 : maxNumber + 1;

            displayGames = games.filter(g => g.gameNumber <= maxNumber);
        }

        return (
            <Stack sx={{ gap: spacingNormal }} >
                {displayGames.map(game => (
                    <GameScore game={game} />
                ))}
            </Stack >
        )
    }

    function onLinkGame() {
        context.setMatchId(match.id);
        navigate("/live");
    }
}

export default MatchCard;