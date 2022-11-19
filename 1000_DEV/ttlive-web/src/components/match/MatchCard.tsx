import { Button, Card, CardActions, CardContent, Collapse, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Match } from "../../rest/data/Match";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";
import MatchStateLabel from "./MatchStateLabel";
import { Game } from "../../rest/data/Game";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "../../AppContext";
import GameScore from "../game/GameScore";
import MatchScore from "./MatchScore";
import ExpandButton from "../utils/ExpandButton";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

export interface MatchCardProps {
    match: Match | null
}

const NUMBER_MATCHES = 4;

const MatchCard = ({ match }: MatchCardProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [t] = useTranslation();
    const navigate = useNavigate();
    const context = useContext(AppContext);

    return (match == null
        ? <Box>
            <Skeleton sx={{ height: { xs: "40px", md: "56px" } }} variant="rectangular" />
            <Divider sx={{}} />
            <Skeleton sx={{ height: { xs: "248px", md: "260px" } }} variant="rectangular" />
        </Box>
        : <Card>
            {renderHeader(match)}
            <Divider sx={{}} />
            <CardContent >

                <MatchScore sx={{ pt: spacingNormal }} match={match} scoreSize={{ xs: "2rem", md: "3rem" }} />
                <Stack direction={{ xs: "column", md: "column-reverse" }} gap={spacingNormal} sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", paddingLeft: spacingSmall, paddingRight: spacingSmall, justifyContent: "center" }} >
                        <Button sx={{ flexGrow: 1, maxWidth: "300px" }} variant="outlined" onClick={() => onLinkGame(match)}>{t("MatchCard.linkGame")}</Button>
                    </Box>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {renderGames(match)}
                    </Collapse>
                </Stack>

            </CardContent>
            <CardActions>
                {match != null && match.state !== "NOT_STARTED" &&
                    <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center", width: "100%" }} onClick={() => setExpanded(!expanded)}>
                        <ExpandButton expanded={expanded} />
                    </Box>
                }
            </CardActions>
        </Card >);


    function renderHeader(match: Match) {
        return (
            <Box sx={{ opacity: 0.5, display: "flex" }} padding={spacingSmall}>

                <Typography sx={{ flexGrow: 1 }}>{match.league.name}</Typography>
                <Box sx={{ opacity: 1, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <MatchStateLabel variant="border" state={match.state} startDate={match.startDate} />
                </Box>
                <Typography sx={{}}>{match.league.region}</Typography>
                {match.league.contest === "MEN" ? <MaleIcon sx={{ ml: 1 }} /> : <FemaleIcon sx={{ ml: 1 }} />}
            </Box>
        );
    }

    function renderGames(match: Match) {
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
            <Stack sx={{ gap: 2 }} >
                {displayGames.map(game => (
                    <GameScore key={game.id} game={game} />
                ))}
            </Stack >
        )
    }

    function onLinkGame(match: Match) {
        context.setMatchId(match.id);
        navigate("/live");
    }
}

export default MatchCard;