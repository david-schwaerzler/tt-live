import { TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "../../../AppContext";
import { deleteMatch } from "../../../rest/api/MatchApi";
import { Account } from "../../../rest/data/Account";
import { Match } from "../../../rest/data/Match";
import ErrorMessage from "../../utils/ErrorMessage";
import LoadingButton from "../../utils/LoadingButton";
import BaseSetting from "./BaseSetting";

export interface DeleteMatchSettingProps {
    match: Match;
    editorCode: string | null;
}

const DeleteMatchSetting = ({ match, editorCode }: DeleteMatchSettingProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [isDeletable, setDeletable] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
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
            <React.Fragment>
                <Typography sx={[{ "& strong": { color: theme => theme.palette.primary.main } }]} mb={2} >
                    <Trans i18nKey={"DeleteMatchSetting.deletable"} t={t} />
                </Typography>
                <ErrorMessage msg={errorMsg} sx={{ mb: 1 }} />
                <TextField
                    sx={{}}
                    label="löschen"
                    placeholder="Löschen"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />


                <LoadingButton
                    sx={{ mt: 2 }}
                    loading={isLoading}
                    variant="outlined"
                    onClick={onDelete}
                >{t("Common.delete")}</LoadingButton>
            </React.Fragment>
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

    async function onDelete() {

        if (editorCode == null)
            return;

        if (inputValue.toLowerCase() !== "löschen") {
            setErrorMsg(t("DeleteMatchSetting.inputError"))
            return;
        }

        setLoading(true);
        let response = await deleteMatch(match.id, editorCode)
        if (response.error != null) {
            setErrorMsg(t("DeleteMatchSetting.deleteError"))
        } else {
            setErrorMsg("");
            context.setEditorCode(match.id, "");
            context.setMatchId(null);
            navigate("/");
        }
        setLoading(false);
    }



}

export default DeleteMatchSetting;