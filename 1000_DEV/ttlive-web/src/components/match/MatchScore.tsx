import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Match } from "../../rest/data/Match";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";

export interface MatchScoreProps {
    match: Match;
    scoreSize?: string | { xs?: string, sm?: string, md?: string },
    sx?: any;
}

const MatchScore = ({ match, scoreSize = "3rem", sx }: MatchScoreProps) => {
    return (
        <Box sx={{  minHeight: "10em", ...sx }} >
            {renderScore(match)}
        </Box >
    )

    function renderScore(match: Match) {
        return (
            <Box sx={{
                display: "grid",
                justifyContent: "center",
                fontSize: "1.25rem",
                textAlign: "center",
                alignItems: "center",
                gridAutoColumns: "1fr",
                gap: spacingSmall
            }}>
                <Box sx={{ gridRow: 1, gridColumn: 1 }}>{match.homeTeam.club} {match.homeTeam.number}</Box>

                <Box sx={{ display: "flex", fontSize: scoreSize, gridRow: { xs: 2 }, gridColumn: { sm: "1 / 3" }, justifyContent: "center", fontWeight: "bold" }}>
                    <Box sx={{ flex: { sm: "1 1 0" } }}>{match.homeTeamScore}</Box>
                    <Box sx={{ display: { md: "none" }, minWidth: "20px" }}>:</Box >
                    <Box sx={{ flex: { sm: "1 1 0" } }}>{match.guestTeamScore}</Box >
                </Box>

                <Box sx={{ gridRow: { xs: 3, sm: 1 }, gridColumn: { xs: 1, sm: 2 } }}>{match.guestTeam.club} {match.guestTeam.number}</Box>
            </Box >
        );
    }
}

export default MatchScore;