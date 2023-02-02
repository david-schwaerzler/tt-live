import { Stack } from "@mui/material";
import React from "react";

import { Match } from "../../rest/data/Match";
import AccountSetting from "../match/settings/AccountSetting";
import CodeSetting from "../match/settings/CodeSetting";
import DeleteMatchSetting from "../match/settings/DeleteMatchSetting";
import LineupSetting from "../match/settings/LineupSetting";
import MatchInfoEdit from "../match/settings/MatchInfoEdit";
import NoCodeSetting from "../match/settings/NoCodeSetting";

export interface MatchSettingsProps {
    match: Match | null;
    editorCode: string | null;
    onMatchChanged: (updated: Match) => void;
}

const MatchSettingsTab = ({ match, editorCode, onMatchChanged }: MatchSettingsProps) => {


    if (editorCode == null)
        return <NoCodeSetting match={match} />;

    return (
        <Stack gap={2}>
            <CodeSetting editorCode={editorCode} />
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={true} />
            <LineupSetting match={match} editorCode={editorCode} isHomeTeam={false} />
            <MatchInfoEdit match={match} editorCode={editorCode} />
            {match != null && 
                <React.Fragment>
                    <AccountSetting match={match} editorCode={editorCode} />
                    <DeleteMatchSetting match={match} editorCode={editorCode} />
                </React.Fragment>
            }
        </Stack>
    );
}

export default React.memo(MatchSettingsTab);