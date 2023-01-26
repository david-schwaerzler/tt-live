import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Trans, useTranslation } from "react-i18next";
import { putConnectMatch } from "../../../rest/api/AccountApi";
import { Account } from "../../../rest/data/Account";
import { Match } from "../../../rest/data/Match";
import LoginForm from "../../login/LoginForm";
import ErrorMessage from "../../utils/ErrorMessage";
import LoadingButton from "../../utils/LoadingButton";
import MatchNotConnectedText from "../MatchNotConnectedText";
import BaseSetting from "./BaseSetting";

export interface AccountSettingProps {
    match: Match,
    editorCode: string
}

const AccountSetting = ({ match, editorCode }: AccountSettingProps) => {

    const isAuthenticated = useIsAuthenticated();
    const [t] = useTranslation();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");


    // don't show this setting if the match is already connected to an account
    if (match.accountId != null)
        return null;

    return (

        <BaseSetting title={t("AccountSetting.title")} expanded={expanded} onExpandedChanged={setExpanded}>

            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>{t("AccountSetting.confirm.title")}</DialogTitle>
                <DialogContent sx={[{ "strong": { color: (theme) => theme.palette.primary.main } }, { whiteSpace: "pre-wrap" }]} >
                    <Trans i18nKey={"AccountSetting.confirm.text"} t={t} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDialog(false)}>{t("AccountSetting.confirm.cancel")}</Button>
                    <Button onClick={() => onConnect()}>{t("AccountSetting.confirm.connect")}</Button>
                </DialogActions>

            </Dialog>

            {match.accountId == null &&
                <React.Fragment>
                    <Typography variant="h6" mb={2}>{t("AccountSetting.notConnected")}</Typography>
                    <MatchNotConnectedText />
                </React.Fragment>
            }

            <ErrorMessage msg={errorMsg} sx={{ mb: 1 }} />

            {isAuthenticated()
                ? <LoadingButton loading={loading} variant="outlined" onClick={() => setShowDialog(true)}>{t("AccountSetting.confirm")}</LoadingButton>
                : <LoginForm onLogin={(account: Account) => setShowDialog(true)} />}
        </BaseSetting>
    )


    async function onConnect() {
        setLoading(true)
        let response = await putConnectMatch(match.id, editorCode);
        if (response.data != null) {
            setErrorMsg("");
        } else {
            setErrorMsg(t("AccountSetting.putError"));
        }
        setShowDialog(false);
        setLoading(false)
    }
}

export default AccountSetting;