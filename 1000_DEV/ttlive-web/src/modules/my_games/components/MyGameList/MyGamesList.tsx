import { Button, Card, CardActions, CardContent, IconButton, List, ListItem, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box, Stack } from "@mui/system";
import MatchScore from "../../../../components/match/MatchScore";
import { spacingNormal } from "../../../../components/utils/StyleVars";
import { SimpleMatch } from "../../../../rest/data/Match";
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link } from "react-router-dom";
import { useContext } from "react";
import ToGameButton from "../../../common/ToGameButton";
import StatisticsButton from "./StatisticsButton";

interface MyGamesListProps {
    matches: Array<SimpleMatch>;
}

const MyGamesList = ({ matches }: MyGamesListProps) => {


    return (

        <Stack gap={spacingNormal}>
            {matches.map(m => (
                <Card>
                    <CardContent>
                        <MatchScore
                            sx={{ pt: spacingNormal }}
                            homeClub={m.homeClub}
                            guestClub={m.guestClub}
                            homeNumber={m.homeNumber}
                            guestNumber={m.guestNumber}
                            homeTeamScore={m.homeTeamScore}
                            guestTeamScore={m.guestTeamScore}
                            scoreSize={{ xs: "2rem", md: "2rem" }}
                        />
                    </CardContent>
                    <Box position="relative">
                        <ToGameButton sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }} matchId={m.id} />
                    </Box>
                    <CardActions sx={{ p: 1, flexDirection: "row-reverse" }}>

                        <IconButton>
                            <DeleteIcon color="primary" />
                        </IconButton>
                        <StatisticsButton match={m} />
                    </CardActions>
                </Card>
            ))
            }
        </Stack >
    );
}

export default MyGamesList;