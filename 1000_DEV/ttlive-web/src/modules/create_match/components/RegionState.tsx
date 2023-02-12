import { Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { spacingNormal, spacingSmall } from "../../common/utils/StyleVars";
import { fetchRegions } from "../../../rest/api/RegionApi";
import { Region } from "../../../rest/data/Region";
import { MatchStateObject } from "./MatchStateObject";
import { StateProps } from "./StateProps";
import ErrorMessage from "../../common/components/utils/ErrorMessage";

const ERROR_GENERAL = 0;
const ERROR_REGION = 1;
const ERROR_CONTEST = 2;

const RegionState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {
    const [regions, setRegions] = useState<Array<Region>>([]);
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [regionInput, setRegionInput] = useState<string>('')
    const hasFetchedData = useRef(false);

    const [t] = useTranslation();

    const updateError = useCallback((code: number, msg: string) => {
        let updated = [...errorMsgs]
        updated[code] = msg;
        setErrorMsgs(updated);
    }, [errorMsgs]);


    const fetchRegionsLocal = useCallback(async () => {

        let response = await fetchRegions();
        if(response.data != null){
            setRegions(response.data);
        }else{
            updateError(ERROR_GENERAL, t(`Common.errorHttp: ${response.error}`))
        }
    }, [updateError, t]);


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
        if (hasFetchedData.current === false) {
            setErrorMsgs([])
            setValidate(onValidate);
            fetchRegionsLocal();
            hasFetchedData.current = true;
        }
    }, [setValidate, fetchRegionsLocal, updateError, t])

    return (
        <Box sx={{ width: "100%", margin: "auto" }}>

            <Typography variant="h5" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                {t('CreateGameView.stepRegion')}
            </Typography>

            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingSmall }} />

            <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" }, gap: spacingNormal }} justifyContent="space-evenly" >
                <FormControl >
                    <Autocomplete
                        id="auto-region"
                        sx={{ minWidth: "200px", alignSelf: "center" }}
                        value={matchStateObject.region}
                        onChange={(e, value) => onRegionSelected(value)}
                        options={regions}
                        getOptionLabel={option => option.name}
                        inputValue={regionInput}
                        onInputChange={(e, value) => setRegionInput(value)}
                        renderInput={(params) => <TextField {...params} label={t('RegionState.region')} error={errorMsgs[ERROR_REGION] != null && errorMsgs[ERROR_REGION] !== ""} />}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        autoHighlight={true}
                    />
                    <FormHelperText error={errorMsgs[ERROR_REGION] != null && errorMsgs[ERROR_REGION] !== ""} >{errorMsgs[ERROR_REGION]}</FormHelperText>
                </FormControl>
                <FormControl >
                    <FormControl sx={{ minWidth: "200px", alignSelf: "center" }} error={errorMsgs[ERROR_CONTEST] != null && errorMsgs[ERROR_REGION] !== ""} >
                        <InputLabel id="select-contest">{t('RegionState.contest')}</InputLabel>
                        <Select
                            id="select-contest"
                            labelId="select-contest"
                            label={t('RegionState.contest')}
                            value={matchStateObject.contest == null ? '' : matchStateObject.contest}
                            onChange={e => onContestSelected(e.target.value)}>
                            <MenuItem value="WOMEN">{t('RegionState.contestWomen')}</MenuItem>
                            <MenuItem value="MEN">{t('RegionState.contestMen')}</MenuItem>
                        </Select>
                        <FormHelperText>{errorMsgs[ERROR_CONTEST]}</FormHelperText>

                    </FormControl>
                </FormControl>
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