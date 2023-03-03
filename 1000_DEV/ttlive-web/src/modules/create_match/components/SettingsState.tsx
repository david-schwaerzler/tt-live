import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isMatchVisibility, MatchVisibility } from "../../../rest/data/Match";
import { useErrorArrays } from "../../common/hooks/useErrorArrays";
import { spacingNormal, spacingSmall } from "../../common/utils/StyleVars";
import { MatchStateObject } from "./MatchStateObject";
import { StateProps } from "./StateProps";

enum Errors {
    VISIBILITY
}

const SettingsState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {
    const [t] = useTranslation();
    const [errors, updateErrors] = useErrorArrays();

    // init the matchStateObject with public when empty
    useEffect(() => {
        if (matchStateObject.visibility == null)
            onUpdate({ ...matchStateObject, visibility: "PUBLIC" })
    }, [matchStateObject, onUpdate]);


    useEffect(() => {
        function onValidate(matchStateObject: MatchStateObject) {
            if (matchStateObject.visibility == null) {
                updateErrors(Errors.VISIBILITY, t('SettingsState.errorEmptyVisibility'));
                return false;
            }
            return true;
        };

        setValidate(onValidate);

    }, [setValidate, updateErrors, t]);

    return (
        <Box sx={{ width: "100%", margin: "auto" }}>
            <Stack width="100%">
                <FormControl sx={{ minWidth: "200px", alignSelf: "center" }}>
                    <InputLabel id="select-visibility">{t('SettingsState.visibility')}</InputLabel>
                    <Select
                        id="select-contest"
                        labelId="select-contest"
                        label={t('SettingsState.visibility')}
                        value={matchStateObject.visibility ?? ""}
                        onChange={e => isMatchVisibility(e.target.value) && onVisibilityChange(e.target.value)}>
                        <MenuItem value="PUBLIC">{t('MatchVisibility.public')}</MenuItem>
                        <MenuItem value="PRIVATE">{t('MatchVisibility.private')}</MenuItem>
                    </Select>
                    <FormHelperText>
                        {errors[Errors.VISIBILITY]}
                    </FormHelperText>
                </FormControl>

                <Box sx={{ paddingTop: spacingNormal, alignSelf: "flex-start" }}>
                    <Typography sx={{ fontWeight: "bold" }}  >{t("SettingsState.visibility")}</Typography>
                    <Typography sx={{ fontStyle: "italic", paddingTop: spacingSmall }}>
                        {matchStateObject.visibility === "PUBLIC" ? t("MatchVisibility.publicDesc") : t("MatchVisibility.privateDesc")}
                    </Typography>
                </Box>

            </Stack>
        </Box>
    );

    function onVisibilityChange(visibility: MatchVisibility) {
        onUpdate({ ...matchStateObject, visibility: visibility })
    }
}

export default SettingsState;