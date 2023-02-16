import { TextField } from "@mui/material";
import { t } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { deleteMatch } from "../../../../rest/api/MatchApi";
import LoadingButton from "../buttons/LoadingButton";
import ErrorMessage from "../utils/ErrorMessage";

export interface MatchDeleteFormProps {
    matchId: number;
    editorCode: string | null;
    onDeleted: () => void;
}

const MatchDeleteForm = ({ matchId, editorCode, onDeleted }: MatchDeleteFormProps) => {

    const [inputValue, setInputValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();

    return (
        <React.Fragment>

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
                loading={loading}
                variant="outlined"
                onClick={onDelete}
            >{t("Common.delete")}</LoadingButton>
        </React.Fragment>
    );


    async function onDelete() {

        if (editorCode == null)
            return;

        if (inputValue.toLowerCase() !== "löschen") {
            setErrorMsg(t("DeleteMatchSetting.inputError"))
            return;
        }

        setLoading(true);
        let response = await deleteMatch(matchId, editorCode)
        if (response.error != null) {
            setErrorMsg(t("DeleteMatchSetting.deleteError"))
        } else {
            setErrorMsg("");
            onDeleted();          
        }
        setLoading(false);
    }

}

export default MatchDeleteForm;