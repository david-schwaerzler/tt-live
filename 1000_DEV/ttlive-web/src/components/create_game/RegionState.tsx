import { Autocomplete, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { Region } from "../../rest/Region";
import { Config } from "../utils/Config";
import ErrorMessage from "../utils/ErrorMessage";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";
import { MatchStateObject } from "./MatchStateObject";
import { StateProps } from "./StateProps";



const ERROR_GENERAL = 0;
const ERROR_REGION = 1;
const ERROR_CONTEST = 2;


const RegionState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {
    const [regions, setRegions] = useState<Array<Region>>([]);
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [regionInput, setRegionInput] = useState<string>('')
    const hasFetchedData = useRef(false);


    const updateError = useCallback((code: number, msg: string) => {
        let updated = [...errorMsgs]
        updated[code] = msg;
        setErrorMsgs(updated);
    }, [errorMsgs]);


    const fetchRegions = useCallback(async () => {
        try {
            let response = await fetch(Config.REST_URL + "/region")
            if (!response.ok) {
                console.log(`Error fetching regions. status: '${response.status}'`)
                updateError(ERROR_GENERAL, `Leider kann der Server nicht erreicht werden. Bitte versuchen sie es später noch einmal`);
                return;
            }
            let regions: Array<Region> = await response.json();
            setRegions(regions);
        } catch (error) {
            console.log(`Error fetching regions. error: '${error}'`)
            updateError(ERROR_GENERAL, `Leider kann der Server nicht erreicht werden. Bitte versuchen sie es später noch einmal`)
        }
    }, [updateError]);


    useEffect(() => {
        function onValidate(matchStateObject: MatchStateObject) {
            if (matchStateObject.region == null) {
                updateError(ERROR_REGION, 'Region muss gesetzt werden');
                return false;
            } else if (matchStateObject.contest == null) {
                updateError(ERROR_CONTEST, 'Konkurrenz muss gesetzt werden')
                return false;
            }
            return true;
        };
        if (hasFetchedData.current === false) {
            setErrorMsgs([])
            setValidate(onValidate);
            fetchRegions();
            hasFetchedData.current = true;
        }
    }, [setValidate, fetchRegions, updateError])

    return (
        <Box sx={{ width: "100%" }}>
            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingSmall }} />

            <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} justifyContent="space-evenly" alignItems="center" >
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_REGION]} centered />
                    <Autocomplete
                        id="auto-region"
                        sx={{ minWidth: "200px", alignSelf: "center" }}
                        value={matchStateObject.region}
                        onChange={(e, value) => onRegionSelected(value)}
                        options={regions}
                        getOptionLabel={option => option.name}
                        inputValue={regionInput}
                        onInputChange={(e, value) => setRegionInput(value)}
                        renderInput={(params) => <TextField {...params} label="Region" />}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                    />
                </Box>
                <Box sx={{ paddingTop: spacingNormal, display: { xs: "block", md: "none" } }}></Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_CONTEST]} centered />
                    <FormControl sx={{ minWidth: "200px", alignSelf: "center" }}  >
                        <InputLabel id="select-contest">Konkurrenz</InputLabel>
                        <Select
                            id="select-contest"
                            labelId="select-contest"
                            label="select-contest"
                            value={matchStateObject.contest == null ? '' : matchStateObject.contest}
                            onChange={e => onContestSelected(e.target.value)}>
                            <MenuItem value="WOMEN">Damen</MenuItem>
                            <MenuItem value="MEN">Herren</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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