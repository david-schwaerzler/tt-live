import { Stack } from "@mui/material";

import { Match } from "../../../rest/data/Match";
import CodeSetting from "./CodeSetting";
import LineupSetting from "./LineupSetting";
import MatchInfoEdit from "./MatchInfoEdit";
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
            <CodeSetting editorCode={editorCode} />
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={true} />
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={false} />
            <MatchInfoEdit match={match} editorCode={editorCode} />
        </Stack>
    );
}

export default MatchSettings;