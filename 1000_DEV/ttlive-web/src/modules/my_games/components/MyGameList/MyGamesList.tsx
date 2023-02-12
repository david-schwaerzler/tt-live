import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { spacingNormal } from "../../../common/utils/StyleVars";
import { SimpleMatch } from "../../../../rest/data/Match";
import DeleteIcon from '@mui/icons-material/Delete';
import ToGameButton from "../../../common/components/buttons/ToGameButton";
import StatisticsButton from "./StatisticsButton";
import MatchScore from "../../../common/components/match/MatchScore";

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