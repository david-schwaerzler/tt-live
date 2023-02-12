import { Box, SxProps } from "@mui/system";
import { spacingSmall } from "../../utils/StyleVars";

export interface MatchScoreProps {
    homeClub: string;
    homeNumber: number;
    guestClub: string;
    guestNumber: number;
    homeTeamScore: number;
    guestTeamScore: number;
    scoreSize?: string | { xs?: string, sm?: string, md?: string },
    sx?: SxProps;
}

const MatchScore = ({ homeClub, homeNumber, guestClub,guestNumber, homeTeamScore, guestTeamScore, scoreSize = "3rem", sx }: MatchScoreProps) => {
    return (
        <Box sx={{
            display: "grid",
            justifyContent: "center",
            fontSize: { xs: "1.25rem", sm: "1.25rem ", md: "2rem" },
            textAlign: "center",
            alignItems: "center",
            gridAutoColumns: "1fr",
            gap: spacingSmall,
            ...sx
        }
        } >

            <Box sx={{ gridRow: 1, gridColumn: 1 }}>{homeClub} {homeNumber}</Box>

            <Box sx={{ display: "flex", fontSize: scoreSize, gridRow: { xs: 2 }, gridColumn: { sm: "1 / 3" }, justifyContent: "center", fontWeight: "bold" }}>
                <Box sx={{ flex: { sm: "1 1 0" } }}>{homeTeamScore}</Box>
                <Box sx={{ display: { sm: "none" }, minWidth: "20px" }}>:</Box >
                <Box sx={{ flex: { sm: "1 1 0" } }}>{guestTeamScore}</Box >

            </Box>
            <Box sx={{ gridRow: { xs: 3, sm: 1 }, gridColumn: { xs: 1, sm: 2 } }}>{guestClub} {guestNumber}</Box>
        </Box >
    );

}

export default MatchScore;