import { Card, CardActions, CardContent, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { Match, SimpleMatch } from "../../../rest/data/Match";
import { spacingNormal, spacingSmall } from "../../common/utils/StyleVars";

import ExpandButton from "../../common/components/buttons/ExpandButton";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ToGameButton from "../../common/components/buttons/ToGameButton";
import MatchScore from "../../common/components/match/MatchScore";
import MatchStateLabel from "../../common/components/match/MatchStateLabel";
import MatchCardGameCollapse from "./MatchCardGameCollapse";

export interface MatchCardProps {
    variant: "simple" | "normal";
    match?: Match | null;
    simpleMatch?: SimpleMatch | null;
}

function convertToSimple(match: Match): SimpleMatch {
    return {
        id: match.id,
        homeTeamScore: match.homeTeamScore,
        guestTeamScore: match.guestTeamScore,
        state: match.state,
        startDate: match.startDate,
        league: match.league,
        homeClub: match.homeTeam.club,
        homeNumber: match.homeTeam.number,
        guestClub: match.guestTeam.club,
        guestNumber: match.guestTeam.number,

        simpleGames: match.games.map(g => ({
            gameNumber: g.gameNumber,
            guestSets: g.guestSets,
            homeSets: g.homeSets,
            state: g.state,
            doubles: g.doubles,
            ...(g.doubles
                ? { homePlayer1: g.homeDoubles.player1, homePlayer2: g.homeDoubles.player2, guestPlayer1: g.guestDoubles.player1, guestPlayer2: g.guestDoubles.player2 }
                : { homePlayer1: g.homePlayer.name, guestPlayer1: g.guestPlayer.name })
        }))
    }

}

const MatchCard = ({ match, simpleMatch, variant }: MatchCardProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const matchState = useMemo(() => {
        if (variant === "simple") {
            return simpleMatch == null ? null : simpleMatch
        } else {
            return match == null ? null : convertToSimple(match);
        }

    }, [variant, simpleMatch, match]);

    return (matchState == null
        ? <Box>
            <Skeleton sx={{ height: { xs: "40px", md: "56px" } }} variant="rectangular" />
            <Divider sx={{}} />
            <Skeleton sx={{ height: { xs: "248px", md: "260px" } }} variant="rectangular" />
        </Box>
        : <Card>
            {renderHeader(matchState)}
            <Divider sx={{}} />
            <CardContent >

                <MatchScore
                    sx={{ pt: spacingNormal }}
                    state={matchState.state}
                    homeClub={matchState.homeClub}
                    guestClub={matchState.guestClub}
                    homeNumber={matchState.homeNumber}
                    guestNumber={matchState.guestNumber}
                    homeTeamScore={matchState.homeTeamScore}
                    guestTeamScore={matchState.guestTeamScore}
                    scoreSize={{ xs: "2rem", md: "3rem" }}
                />
                <Stack direction={{ xs: "column", md: "column-reverse" }} gap={spacingNormal} sx={{ mt: 2 }}>
                    <Box sx={{ display: "flex", paddingLeft: spacingSmall, paddingRight: spacingSmall, justifyContent: "center" }} >
                        <ToGameButton sx={{ flexGrow: 1, maxWidth: "300px" }} matchId={matchState.id} />
                    </Box>

                    <MatchCardGameCollapse match={matchState} expanded={expanded} loading={loading} onLoadingChanged={setLoading} />

                </Stack>

            </CardContent>
            <CardActions>
                {matchState != null && matchState.state !== "NOT_STARTED" &&
                    <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center", width: "100%" }} onClick={onExpand}>
                        <ExpandButton expanded={expanded} loading={loading} />
                    </Box>
                }
            </CardActions>
        </Card >);


    function onExpand() {
        if (!expanded)
            setLoading(true)
        setExpanded(!expanded);
    }

    function renderHeader(simpleMatch: SimpleMatch) {
        return (
            <Box sx={{ display: "flex", alignItems: "center" }} padding={spacingSmall}>

                <Typography sx={{ flexGrow: 1, fontSize: "0.8rem", opacity: 0.5 }}>{simpleMatch.league.name}</Typography>
                <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <MatchStateLabel variant="border" state={simpleMatch.state} startDate={simpleMatch.startDate} />
                </Box>
                <Typography sx={{ opacity: 0.5 }}>{simpleMatch.league.region}</Typography>
                {simpleMatch.league.contest === "MEN" ? <MaleIcon sx={{ ml: 1 }} color="success" /> : <FemaleIcon sx={{ ml: 1 }} color="primary" />}
            </Box>
        );
    }
}

export default MatchCard;