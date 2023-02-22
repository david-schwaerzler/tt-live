import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { spacingNormal, spacingSmall } from "../../common/utils/StyleVars";
import { MatchStateObject } from "./MatchStateObject";
import { StateProps } from "./StateProps";
import ErrorMessage from "../../common/components/utils/ErrorMessage";
import RegionAutocomplete from "../../common/components/autocomplete/RegionSelectAutocomplete";
import ContestSelect from "../../common/components/autocomplete/ContestSelect";
import { useErrorArrays } from "../../common/hooks/useErrorArrays";
import { Region } from "../../../rest/data/Region";

const ERROR_GENERAL = 0;
const ERROR_REGION = 1;
const ERROR_CONTEST = 2;

const RegionState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {
    const [t] = useTranslation();

    const [errorMsgs, updateError] = useErrorArrays();


    useEffect(() => {
        function onValidate(matchStateObject: MatchStateObject) {
            if (matchStateObject.region == null) {
                updateError(ERROR_REGION, t('RegionState.errorEmptyRegion'));
                return false;
            } else if (matchStateObject.contest == null) {
                updateError(ERROR_CONTEST, t('RegionState.errorEmptyContest'))
                return false;
            }
            return true;
        };

        setValidate(onValidate);

    }, [setValidate, updateError, t]);

    return (
        <Box sx={{ width: "100%", margin: "auto" }}>

            <Typography variant="h5" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                {t('CreateGameView.stepRegion')}
            </Typography>

            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingSmall }} />

            <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" }, gap: spacingNormal }} justifyContent="space-evenly" >
                <RegionAutocomplete
                    sx={{ minWidth: "200px", alignSelf: "center" }}
                    region={matchStateObject.region ?? ""}
                    onChanged={onRegionSelected}
                    error={errorMsgs[ERROR_REGION]}
                    onError={error => updateError(ERROR_REGION, error)}
                />
                <ContestSelect
                    sx={{ minWidth: "200px", alignSelf: "center" }}
                    contest={matchStateObject.contest}
                    onChanged={onContestSelected}
                    error={errorMsgs[ERROR_CONTEST]}
                    onError={error => updateError(ERROR_CONTEST, error)}
                />

            </Stack>
        </Box >
    );

    function onRegionSelected(value: Region | null) {
        let updated = { ...matchStateObject };
        updated.region = value;
        updateError(ERROR_REGION, '')
        onUpdate(updated);
    }

    function onContestSelected(value: string | null) {
        let updated = { ...matchStateObject };
        if (value === "WOMEN" || value === "MEN") {
            updated.contest = value
            updateError(ERROR_CONTEST, '')
        } else if (value === '') {
            updated.contest = null;
        }
        onUpdate(updated);
    }
}

export default RegionState;