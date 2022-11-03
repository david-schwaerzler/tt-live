import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { GameStyle } from "../../../rest/data/GameStyle";
import { League } from "../../../rest/data/League";
import { Config } from "../../utils/Config";
import ErrorMessage from "../../utils/ErrorMessage";
import { spacingNormal, spacingSmall } from "../../utils/StyleVars";
import { MatchStateObject } from "./MatchStateObject";
import LeagueSelector from "./selectors/LeagueSelector";
import { StateProps } from "./StateProps";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Dayjs } from 'dayjs';

const ERROR_GENERAL = 0;
const ERROR_LEAGUE = 1;
const ERROR_GAME_STYLE = 2;
const ERROR_START_DATE = 3;

const LeagueState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {
    const [leagues, setLeagues] = useState<Array<League>>([]);
    const [gameStyles, setGameStyles] = useState<Array<GameStyle>>([]);
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const hasFetchedData = useRef(false);
    const [t] = useTranslation();

    const updateError = useCallback((code: number, msg: string) => {
        let updated = [...errorMsgs]
        updated[code] = msg;
        setErrorMsgs(updated);
    }, [errorMsgs]);

    const fetchLeagues = useCallback(async () => {
        try {
            if (matchStateObject.region == null) {
                updateError(ERROR_GAME_STYLE, t("LeagueState.errorRegion"))
                return;
            } else if (matchStateObject.contest == null) {
                updateError(ERROR_GENERAL, t("LeagueState.errorContest"))
                return;
            }

            let response = await fetch(Config.REST_URL + `/region/${matchStateObject.region.id}/leagues?contest=${matchStateObject.contest}`)
            if (!response.ok) {
                console.log(`Error fetching leagues. status: "${response.status}"`)
                updateError(ERROR_GENERAL, t("Common.errorFetch"));
                return;
            }
            let leagues: Array<League> = await response.json();
            setLeagues(leagues);

        } catch (error) {
            console.log(`Error fetching leagues. error: "${error}"`)
            updateError(ERROR_GENERAL, t("Common.errorFetch"))
        }
    }, [updateError, matchStateObject.region, matchStateObject.contest, t]);

    const fetchGmeStyles = useCallback(async () => {
        try {
            let response = await fetch(Config.REST_URL + "/game_style")
            if (!response.ok) {
                console.log(`Error fetching gameStyle. status: "${response.status}"`)
                updateError(ERROR_GENERAL, t("Common.errorFetch"));
                return;
            }
            let gameStyles: Array<GameStyle> = await response.json();
            setGameStyles(gameStyles);
        } catch (error) {
            console.log(`Error fetching gameStyle. error: "${error}"`)
            updateError(ERROR_GENERAL, t("Common.errorFetch"))
        }
    }, [updateError, t]);


    useEffect(() => {
        function onValidate(matchStateObject: MatchStateObject) {
            if (matchStateObject.league == null) {
                updateError(ERROR_LEAGUE, t("LeagueState.errorEmptyLeague"));
                return false;
            } else if (matchStateObject.gameStyle == null) {
                updateError(ERROR_GAME_STYLE, t("LeagueState.errorEmptyGameStyle"));
                return false;
            } else if (matchStateObject.startDate == null){
                updateError(ERROR_START_DATE, t("LeagueState.errorEmptyStartDate"));
                return false;                
            }else if(matchStateObject.startDate.isValid() === false){
                updateError(ERROR_START_DATE, t("LeagueState.errorInvalidStartDate"));
                return false;
            }

            return true;
        };

        if (hasFetchedData.current === false) {
            setErrorMsgs([])
            setValidate(onValidate);
            fetchGmeStyles();
            fetchLeagues();
            hasFetchedData.current = true;
        }
    }, [setValidate, updateError, fetchGmeStyles, fetchLeagues, t])

    return (
        <Box sx={{ width: "100%" }}>

            <Typography variant="h5" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                {t('CreateGameView.stepLeague')}
            </Typography>

            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingSmall }} />

            <Stack sx={{ flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-end" }, gap: spacingNormal }} justifyContent="space-around" >
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_LEAGUE]} centered />
                    <LeagueSelector
                        matchStateObject={matchStateObject}
                        leagues={leagues}
                        onUpdate={onUpdate}
                        updateError={msg => updateError(ERROR_LEAGUE, msg)}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_GAME_STYLE]} centered />
                    <FormControl sx={{ minWidth: "200px", alignSelf: "center" }}  >
                        <InputLabel id="select-gameStyle">{t("LeagueState.gameStyle")}</InputLabel>
                        <Select
                            id="select-gameStyle"
                            labelId="select-gameStyle"
                            label="select-gameStyle"
                            value={matchStateObject.gameStyle == null || gameStyles.length === 0 ? "" : matchStateObject.gameStyle.id}
                            onChange={e => onGameStyleSelected(e.target.value)}>
                            {gameStyles.map((value, index) =>
                                <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_START_DATE]} centered />
                    <FormControl sx={{ width: "200px", alignSelf: "center" }}  >
                        <DateTimePicker                            
                            ampm={false}
                            label={t("LeagueState.startDate")}
                            value={matchStateObject.startDate}
                            onChange={onStartDateSelected}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                </Box>
            </Stack>


            {matchStateObject.gameStyle !== null && (
                <Box sx={{ paddingTop: spacingNormal }}>
                    <Typography sx={{ fontWeight: "bold" }}  >{t("LeagueState.gameStyleDesc")}</Typography>
                    <Typography sx={{ fontStyle: "italic", paddingTop: spacingSmall }}>{matchStateObject.gameStyle.description}</Typography>
                </Box>
            )}
        </Box >
    );

    function onStartDateSelected(startDate: Dayjs | null){
        console.log(startDate)
        let updated = { ...matchStateObject };
        updated.startDate = startDate;
        updateError(ERROR_START_DATE, "")
        onUpdate(updated);
    }

    function onGameStyleSelected(value: string | number) {

        let gameStyle = gameStyles.filter(g => g.id === value);
        if (gameStyle.length === 0 || gameStyle.length > 1) {
            updateError(ERROR_GAME_STYLE, t("LeagueState.errorInvalidGameStyle"));
            return;
        }
        let updated = { ...matchStateObject };
        updated.gameStyle = gameStyle[0];
        updateError(ERROR_GAME_STYLE, "")
        onUpdate(updated);
    }
}

export default LeagueState;