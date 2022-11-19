import { Box, Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";

import { Match } from "../../../rest/data/Match";
import LineupSetting from "./LineupSetting";
import NoCodeSetting from "./NoCodeSetting";

export interface MatchSettingsProps {
    match: Match | null;
    editorCode: string | null;
    onMatchChanged: (updated: Match) => void;
}

const MatchSettings = ({ match, editorCode, onMatchChanged }: MatchSettingsProps) => {


    if (editorCode == null)
        return <NoCodeSetting match={match} />;

    return (
        <Stack gap={2}>
            {match == null ? <Skeleton sx={{ height: { xs: "64px", sm: "96px" } }} variant="rectangular" />
                : <Box>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Editor-Code: <Box sx={{ display: "inline", fontWeight: "bold", color: theme => theme.palette.primary.main }}>{editorCode}</Box></Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Editor-Code: <Box sx={{ display: "inline", fontWeight: "bold", color: theme => theme.palette.primary.main }}>{editorCode}</Box></Typography>
                        </CardContent>
                    </Card>
                </Box>
            }
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={true} />
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={false} />

        </Stack>
    );


}

export default MatchSettings;