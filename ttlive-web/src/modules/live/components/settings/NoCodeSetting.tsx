import { Card, CardContent, FormControl, FormHelperText, Skeleton, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { AppContext } from "../../../../AppContext";

import { fetchValidateEditorCode } from "../../../../rest/api/MatchApi";
import { Match } from "../../../../rest/data/Match";
import LoadingButton from "../../../common/components/buttons/LoadingButton";
import ErrorMessage from "../../../common/components/utils/ErrorMessage";


export interface NoCodeSettingProps {
    match: Match | null;
}

enum Errors {
    GENERAL,
    VALIDATE_CODE
}
const NoCodeSetting = ({ match }: NoCodeSettingProps) => {
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [newEditorCode, setNewEditorCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [t] = useTranslation();
    const context = useContext(AppContext);

    if (match == null)
        return <Skeleton sx={{ height: { xs: "304px", sm: "224px" } }} variant="rectangular" />;

    return (
        <Card>
            <CardContent>
                <ErrorMessage msg={errorMsgs[Errors.GENERAL]} />
                <Typography variant="h4" textAlign="left" sx={[{ "strong": { color: (theme) => theme.palette.primary.main, fontSize: "2.5rem" } }]}>
                    <Trans i18nKey="MatchSettings.noCodeHeader" t={t} />
                </Typography>
                <Typography textAlign="left" mt={1}>
                    {t("MatchSettings.noCodeText")}
                </Typography>

                <FormControl error={errorMsgs[Errors.VALIDATE_CODE] != null && errorMsgs[Errors.VALIDATE_CODE] !== ""} >
                    <TextField sx={{ width: "200px", mt: 2, display: "block" }}
                        label={t("MatchSettings.editorCodeInput")} value={newEditorCode}
                        onChange={e => setNewEditorCode(e.target.value.toLocaleLowerCase())}
                        autoComplete="off"
                    />
                    <FormHelperText >{errorMsgs[Errors.VALIDATE_CODE]}</FormHelperText>
                </FormControl>
                <LoadingButton loading={loading} variant="outlined" sx={{ mt: 1 }} onClick={() => checkCode(match)}>{t("MatchSettings.noCodeButton")}</LoadingButton>
            </CardContent>
        </Card>
    );


    async function checkCode(match: Match) {
        setLoading(true);

        let response = await fetchValidateEditorCode(match.id, newEditorCode);
        if (response.data != null) {
            if (response.data === true) {
                context.setEditorCode(match.id, newEditorCode, true);
                setErrorMsgs([]);
            } else {
                updateError(Errors.VALIDATE_CODE, t("MatchSettings.errorInvalidCode"));
            }
        } else {
            updateError(Errors.GENERAL, t("MatchSettings.errorValidatingCode"));
        }
        setLoading(false);
    }

    function updateError(key: number, msg: string) {
        let copy = [...errorMsgs];
        copy[key] = msg;
        setErrorMsgs(copy);
    }
}

export default NoCodeSetting