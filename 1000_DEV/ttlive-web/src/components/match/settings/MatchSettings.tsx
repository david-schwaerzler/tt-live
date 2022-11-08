import { Box, Paper, Stack, Typography } from "@mui/material";

import { Match } from "../../../rest/data/Match";
import { spacingNormal } from "../../utils/StyleVars";
import LineupSetting from "./LineupSetting";
import NoCodeSetting from "./NoCodeSetting";

export interface MatchSettingsProps {
    match: Match;
    editorCode: string | null;
}

const MatchSettings = ({ match, editorCode }: MatchSettingsProps) => {



    if (editorCode == null)
        return <Paper elevation={1} sx={{ p: spacingNormal }}><NoCodeSetting match={match} /></Paper>;

    return (
        <Stack gap={2}>
            <Paper elevation={1} sx={{ p: spacingNormal }} >
                <Typography variant="h5">Editor-Code: <Box sx={{display: "inline", fontWeight: "bold", color: theme => theme.palette.primary.main}}>{editorCode}</Box></Typography>
            </Paper>
            <Paper elevation={1} >
                <LineupSetting match={match} isHomeTeam={true} />
            </Paper>


            <LineupSetting match={match} isHomeTeam={false} />

        </Stack>
    );


}

export default MatchSettings;