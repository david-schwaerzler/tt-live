import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "../../../../AppContext";
import { Account } from "../../../../rest/data/Account";
import { Match } from "../../../../rest/data/Match";
import MatchDeleteForm from "../../../common/components/match/MatchDeleteForm";

import BaseSetting from "./BaseSetting";

export interface DeleteMatchSettingProps {
    match: Match;
    editorCode: string | null;
}

const DeleteMatchSetting = ({ match, editorCode }: DeleteMatchSettingProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [isDeletable, setDeletable] = useState<boolean>(false);
    const [t] = useTranslation();
    const loginData = useAuthUser();
    const context = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        let account = loginData() as (Account | null);

        let deletable = false;


        // Account isn't connected to an account. Everybody can delete the match that has the editor code
        if (match.accountId == null && editorCode != null)
            deletable = true;

        if (match.accountId != null && account != null && match.accountId === account.id)
            deletable = true;

        setDeletable(deletable);
    }, [loginData, match.accountId, editorCode]);

    if (editorCode == null)
        return null;


    return (
        <BaseSetting title={t("DeleteMatchSetting.title")} expanded={expanded} onExpandedChanged={expanded => setExpanded(expanded)}>
            {isDeletable ? renderDeletable() : renderNotDeletable()}
        </BaseSetting>
    )

    function renderDeletable() {

        return (
            <MatchDeleteForm matchId={match.id} editorCode={editorCode} onDeleted={onDeleted} />
        );
    }

    function renderNotDeletable() {

        if (match.accountId != null) {
            return (
                <Typography >
                    {t("DeleteMatchSetting.notDeletableAccount")}
                    &nbsp;
                    <Typography color="primary" fontWeight="bold" component="span">{match.accountUsername}</Typography>
                </Typography>

            )
        }

        return <Typography>{t("DeleteMatchSetting.notDeletableEditor")}</Typography>;

    }

    async function onDeleted() {
        context.setEditorCode(match.id, "", true);
        context.setMatchId(null);
        navigate("/");
    }
}

export default DeleteMatchSetting;