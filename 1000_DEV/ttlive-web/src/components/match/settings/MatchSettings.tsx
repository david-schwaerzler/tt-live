import { Box, Card, CardContent, Paper, Skeleton, Stack, Typography } from "@mui/material";

import { Match } from "../../../rest/data/Match";
import { spacingNormal } from "../../utils/StyleVars";
import LineupSetting from "./LineupSetting";
import NoCodeSetting from "./NoCodeSetting";

export interface MatchSettingsProps {
    match: Match | null;
    editorCode: string | null;
    onMatchChanged: (updated: Match) => void;
}

const MatchSettings = ({ match, editorCode, onMatchChanged }: MatchSettingsProps) => {

    if (editorCode == null)
        return <Card><CardContent><NoCodeSetting match={match} /></CardContent></Card>;

    return (
        <Stack gap={2}>
            {match == null ? <Skeleton sx={{ height: { xs: "64px", sm: "96px" } }} variant="rectangular" />
                : <Card>
                    <CardContent>
                        <Typography variant="h5">Editor-Code: <Box sx={{ display: "inline", fontWeight: "bold", color: theme => theme.palette.primary.main }}>{editorCode}</Box></Typography>
                    </CardContent>
                </Card>
            }
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={true} onMatchChanged={onMatchChanged} />
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={false} onMatchChanged={onMatchChanged} />

        </Stack>
    );


}

export default MatchSettings;