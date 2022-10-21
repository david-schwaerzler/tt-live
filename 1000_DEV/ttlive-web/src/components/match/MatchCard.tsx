import { Button, Collapse, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { Match } from "../../rest/data/Match";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "@emotion/styled";
import MatchStateLabel from "./MatchStateLabel";
import { Game } from "../../rest/data/Game";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "../../AppContext";
import theme from "../../containers/CustomTheme";

export interface MatchCardProps {
    match: Match
}

const winningColor = green[800];
const loosingColor = red[800];


const ExpandMore = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    })

}));



const NUMBER_MATCHES = 4;

const MatchCard = ({ match }: MatchCardProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [t] = useTranslation();
    const navigate = useNavigate();
    const context = useContext(AppContext);

    const diff = match.homeTeamScore - match.guestTeamScore
    let homeTeamColor: string;
    let guestTeamColor: string;
    if (diff > 0) {
        homeTeamColor = winningColor;
        guestTeamColor = loosingColor;
    } else {
        homeTeamColor = loosingColor;
        guestTeamColor = winningColor;
    }
    return (
        <Paper elevation={6}>
            {renderHeader()}
            <Divider />
            <Box sx={{ padding: spacingNormal, display: "flex", flexDirection: { xs: "column", md: "row" } }}>
                {renderMatchScore(match.homeTeam.club + " " + match.homeTeam.number, match.homeTeamScore, homeTeamColor)}
                {renderMatchScore(match.guestTeam.club + " " + match.guestTeam.number, match.guestTeamScore, guestTeamColor)}
            </Box>


            <Stack direction={{ xs: "column", md: "column-reverse" }}>
                <Box sx={{ display: "flex", paddingLeft: spacingNormal, paddingBottom: spacingSmall, paddingRight: spacingNormal }} >
                    <Button sx={{ flexGrow: 1 }} variant="outlined" onClick={onLinkGame}>{t("MatchCard.linkGame")}</Button>
                </Box>
                <Collapse in={expanded} timeout="auto" unmountOnExit >
                    {renderGames()}
                </Collapse>
            </Stack>

            <Box sx={{ cursor: "pointer", /*background: `linear-gradient(180deg, white 0%, lightgray 100%)`,*/ display: "flex", justifyContent: "center" }} onClick={() => setExpanded(!expanded)}>
                <ExpandMore
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </Box>
        </Paper >
    );

    function renderHeader() {
        return (
            <Box sx={{ opacity: 0.5, display: "flex" }} padding={spacingSmall}>
                <Typography sx={{ flexGrow: 1 }}>{match.league.name}</Typography>
                <Box sx={{ opacity: 1, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <MatchStateLabel state={match.state} />
                </Box>
                <Typography>{match.league.region}</Typography>
            </Box>
        );
    }

    function renderMatchScore(teamName: string, score: number, color: string) {
        return (
            <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, flex: "1 1 0", justifyContent: "center" }}>
                <Typography variant="h6" sx={{ flexGrow: 1, textAlign: { md: "center" }, paddingBottom: spacingSmall }}>{teamName}</Typography>
                <Typography variant="h5" sx={{ minWidth: "2em", textAlign: "center", color: color }}><b>{score}</b></Typography>
            </Box>);
    }

    function renderGames() {
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
            <Stack sx={{ padding: spacingSmall }} >
                {displayGames.map(game => (
                    <Box key={game.gameNumber} sx={{ display: "flex", padding: spacingSmall, justifyContent: { md: "center" } }}>
                        {game.doubles ? renderDoubles(game) : renderSingles(game)}
                    </Box>
                ))}
            </Stack >
        )
    }

    function renderSingles(game: Game) {
        return (
            <React.Fragment>
                <Typography sx={{ flex: { md: "1 1 0" }, order: { xs: 1, md: 1 }, textAlign: "right" }}>{game.homePlayer.name}</Typography>
                <Typography sx={{ order: { xs: 2 }, display: { md: "none", xs: "block" } }}>&nbsp;- &nbsp;</Typography>
                <Typography sx={{ flex: { xs: "1 0 0", md: "1 1 0" }, order: { xs: 3 } }}>{game.guestPlayer.name}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", textWeight: "bold", paddingRight: spacingSmall, paddingLeft: spacingSmall, order: { xs: 4, md: 2 } }}>
                    <b>{game.homeSets}:{game.guestSets}</b>
                </Box>
            </React.Fragment >
        )
    }
    function renderDoubles(game: Game) {
        return (
            <React.Fragment>
                <Box sx={{ flexGrow: 1, display: { md: "none" } }}>
                    <Typography sx={{ flexGrow: 1, order: 1 }}>{game.homeDoubles.player1}/{game.homeDoubles.player2}</Typography>
                    <Typography sx={{ flexGrow: 1, order: 2 }}>{game.guestDoubles.player1}/{game.guestDoubles.player2}</Typography>
                </Box>
                <Typography sx={{ flex: { md: "1 1 0" }, order: 1, display: { xs: "none", md: "block" }, textAlign: "right" }}>{game.homeDoubles.player1}/{game.homeDoubles.player2}</Typography>
                <Typography sx={{ flex: { md: "1 1 0" }, order: 3, display: { xs: "none", md: "block" } }}>{game.guestDoubles.player1}/{game.guestDoubles.player2}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", textWeight: "bold", paddingRight: spacingSmall, paddingLeft: spacingSmall, order: { md: 2 } }}>
                    <b>{game.homeSets}:{game.guestSets}</b>
                </Box>
            </React.Fragment >
        )
    }


    function onLinkGame() {
        context.setCode(match.code);
        navigate("/live");
    }
}

export default MatchCard;