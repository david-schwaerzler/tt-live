import { Autocomplete, Button, Card, CardActions, CardContent, Collapse, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { putMatch } from "../../../rest/api/MatchApi";
import { fetchRegions } from "../../../rest/api/RegionApi";
import { RequestLeague } from "../../../rest/data/League";
import { Match, RequestMatch } from "../../../rest/data/Match";
import { Region } from "../../../rest/data/Region";
import { RequestTeam } from "../../../rest/data/Team";
import ExpandButton from "../../utils/ExpandButton";
import LoadingButton from "../../utils/LoadingButton";

export interface MatchInfoEditProps {
    match: Match | null;
    editorCode: string;
}

enum Error {
    HOME_CLUB,
    HOME_NUMBER,
    GUEST_CLUB,
    GUEST_NUMBER,
    START_DATE,
    LEAGUE,
    REGION,
    CONTEST
};

const MatchInfoEdit = ({ match, editorCode }: MatchInfoEditProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [homeTeamClub, setHomeTeamName] = useState<string>(match == null ? "" : match.homeTeam.club);
    const [homeTeamNumber, setHomeTeamNumber] = useState<number>(match == null ? 0 : match.homeTeam.number);
    const [guestTeamClub, setGuestTeamName] = useState<string>(match == null ? "" : match.guestTeam.club);
    const [guestTeamNumber, setGuestTeamNumber] = useState<number>(match == null ? 0 : match.guestTeam.number);
    const [startDate, setStartDate] = useState<Dayjs | null>(match == null ? dayjs() : dayjs(match.startDate));
    const [league, setLeague] = useState<string>(match == null ? "" : match.league.name);
    const [contest, setContest] = useState<"MEN" | "WOMEN">(match == null ? "MEN" : match.league.contest)
    const [region, setRegion] = useState<Region | null>(null);
    const [regions, setRegions] = useState<Array<Region>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);

    const [t] = useTranslation();

    useEffect(() => {
        if (match == null)
            return;

        if (expanded === true)
            return;

        setHomeTeamName(match.homeTeam.club);
        setHomeTeamNumber(match.homeTeam.number);
        setGuestTeamName(match.guestTeam.club);
        setGuestTeamNumber(match.guestTeam.number);
        setStartDate(dayjs(match.startDate));
        setLeague(match.league.name);

    }, [match, expanded]);

    useEffect(() => {
        async function fetchRegionLocal() {
            let response = await fetchRegions();
            if (response.data != null) {
                setRegions(response.data);
                if (match) {
                    let region = response.data.filter(r => match.league.region === r.name);
                    if (region.length > 0)
                        setRegion(region[0]);
                }
            }

        }
        if (regions.length != null)
            fetchRegionLocal();
    }, [match, regions.length])

    const updateErrors = useCallback((errorMsgs: Array<string>, key: Error, msg: string) => {
        let tmp = [...errorMsgs];
        tmp[key] = msg;
        setErrorMsgs(tmp);
    }, [setErrorMsgs]);


    if (match == null)
        return <React.Fragment />;


    return (
        <Card>
            <Typography variant="h5" p={2}>
                {t('MatchInfoEdit.title')}
            </Typography>
            <Collapse in={expanded} timeout="auto" >
                <Divider />
                <CardContent>
                    <Stack gap={2}>

                        <Typography variant="h6" width="100%" >
                            {t("MatchInfoEdit.common")}:
                            <Button sx={{ float: "right" }} onClick={() => onReset(match)}>reset</Button>
                        </Typography>
                        <Stack direction="row" gap={1} >
                            <FormControl sx={{ flexGrow: 1 }}>
                                <TextField
                                    label={t("MatchInfoEdit.homeTeamName")}
                                    value={homeTeamClub}
                                    onChange={e => setHomeTeamName(e.target.value)}
                                    error={errorMsgs[Error.HOME_CLUB] != null && errorMsgs[Error.HOME_CLUB] !== ""}
                                    helperText={errorMsgs[Error.HOME_CLUB]}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    label={t("MatchInfoEdit.teamNumber")}
                                    type="number"
                                    value={homeTeamNumber}
                                    sx={{ maxWidth: { xs: "5em", sm: "inherit" } }}
                                    onChange={e => parseInt(e.target.value) > 0 && setHomeTeamNumber(parseInt(e.target.value))}
                                    error={errorMsgs[Error.HOME_NUMBER] != null && errorMsgs[Error.HOME_NUMBER] !== ""}
                                    helperText={errorMsgs[Error.HOME_NUMBER]}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction="row" gap={1} >
                            <FormControl sx={{ flexGrow: 1 }}>
                                <TextField
                                    label={t("MatchInfoEdit.guestTeamName")}
                                    value={guestTeamClub}
                                    onChange={e => setGuestTeamName(e.target.value)}
                                    error={errorMsgs[Error.GUEST_CLUB] != null && errorMsgs[Error.GUEST_CLUB] !== ""}
                                    helperText={errorMsgs[Error.GUEST_CLUB]}
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    label={t("MatchInfoEdit.teamNumber")}
                                    type="number"
                                    value={guestTeamNumber}
                                    sx={{ maxWidth: { xs: "5em", sm: "inherit" } }}
                                    onChange={e => parseInt(e.target.value) > 0 && setGuestTeamNumber(parseInt(e.target.value))}
                                    error={errorMsgs[Error.GUEST_NUMBER] != null && errorMsgs[Error.GUEST_NUMBER] !== ""}
                                    helperText={errorMsgs[Error.GUEST_NUMBER]}
                                />
                            </FormControl>
                        </Stack>

                        <FormControl sx={{ flexGrow: 1 }} error={errorMsgs[Error.START_DATE] != null && errorMsgs[Error.START_DATE] !== ""}>
                            <DateTimePicker
                                ampm={false}
                                label={t("LeagueState.startDate")}
                                value={startDate}
                                onChange={date => setStartDate(date)}
                                renderInput={(params) => 
                                    <TextField {...params} error={errorMsgs[Error.START_DATE] != null && errorMsgs[Error.START_DATE] !== ""}
                                    />}
                                
                            />
                            <FormHelperText>{errorMsgs[Error.START_DATE]}</FormHelperText>
                        </FormControl>

                        <Typography variant="h6" width="100%" mb={1}>
                            {t("MatchInfoEdit.league")}:
                        </Typography>
                        <Stack direction="row" gap={1}>
                            <FormControl sx={{ flexGrow: 1 }}>
                                <TextField
                                    label={t("MatchInfoEdit.league")}
                                    value={league}
                                    onChange={e => setLeague(e.target.value)}
                                    error={errorMsgs[Error.LEAGUE] != null && errorMsgs[Error.LEAGUE] !== ""}
                                    helperText={errorMsgs[Error.LEAGUE]}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction="row" gap={1}>
                            <FormControl sx={{ flexGrow: 1 }} error={errorMsgs[Error.REGION] != null && errorMsgs[Error.REGION] !== ""} >
                                <Autocomplete
                                    value={region}
                                    onChange={(e, value) => setRegion(value)}
                                    options={regions}
                                    getOptionLabel={option => option.name}
                                    renderInput={(params) => <TextField {...params} label={t('RegionState.region')} error={false} />}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    autoHighlight={true}

                                />
                                <FormHelperText >
                                    {errorMsgs[Error.REGION]}
                                </FormHelperText>
                            </FormControl>
                            <FormControl sx={{ flexGrow: 1 }} error={errorMsgs[Error.CONTEST] != null && errorMsgs[Error.CONTEST] !== ""}>
                                <InputLabel id="select-contest">{t('RegionState.contest')}</InputLabel>
                                <Select
                                    id="select-contest"
                                    labelId="select-contest"
                                    label={t('RegionState.contest')}
                                    value={contest}
                                    onChange={e => (e.target.value === "MEN" || e.target.value === "WOMEN") && setContest(e.target.value)}>
                                    <MenuItem value="WOMEN">{t('RegionState.contestWomen')}</MenuItem>
                                    <MenuItem value="MEN">{t('RegionState.contestMen')}</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {errorMsgs[Error.CONTEST]}
                                </FormHelperText>
                            </FormControl>
                        </Stack>
                        <LoadingButton loading={isLoading} variant="outlined" onClick={() => onSave(match)}>Save</LoadingButton>
                    </Stack>
                </CardContent>
            </Collapse>

            <CardActions>
                <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center", width: "100%" }} onClick={() => setExpanded(!expanded)}>
                    <ExpandButton expanded={expanded} />
                </Box>
            </CardActions>
        </Card >
    );

    function onReset(match: Match) {
        setHomeTeamName(match.homeTeam.club);
        setHomeTeamNumber(match.homeTeam.number);
        setGuestTeamName(match.guestTeam.club);
        setGuestTeamNumber(match.guestTeam.number);
        setStartDate(dayjs(match.startDate));
        setLeague(match.league.name);
        setErrorMsgs([]);
    }

    async function onSave(match: Match) {        

        if (homeTeamClub === "") {
            updateErrors([], Error.HOME_CLUB, "MatchInfoEdit.errorHomeClub");
            return;
        } else if (homeTeamNumber < 0) {
            updateErrors([], Error.HOME_NUMBER, "MatchInfoEdit.errorHomeNumber");
            return;
        } else if (guestTeamClub === "") {
            updateErrors([], Error.GUEST_CLUB, "MatchInfoEdit.errorGuestClub");
            return;
        } else if (guestTeamNumber < 0) {
            updateErrors([], Error.GUEST_NUMBER, "MatchInfoEdit.errorGuestNumber");
            return;
        } else if (startDate == null || startDate.isValid() === false) {
            updateErrors([], Error.START_DATE, "MatchInfoEdit.errorStartDate");
            return;
        } else if (league === "") {
            updateErrors([], Error.LEAGUE, "MatchInfoEdit.errorLeague");
            return;
        } else if (region === null || regions.some(r => region.id === r.id) === false) {
            updateErrors([], Error.REGION, "MatchInfoEdit.errorRegion");
            return;
        } else if (contest !== "MEN" && contest !== "WOMEN") {
            updateErrors([], Error.CONTEST, "MatchInfoEdit.errorContest");
            return;
        }


        let requestLeague: RequestLeague = {
            id: match.league.id,
            name: league.trim(),
            contest: contest,
            regionId: region.id
        };

        let requestHomeTeam: RequestTeam = {
            id: match.homeTeam.id,
            club: homeTeamClub.trim(),
            number: homeTeamNumber
        };

        let requestGuestTeam: RequestTeam = {
            id: match.guestTeam.id,
            club: guestTeamClub.trim(),
            number: guestTeamNumber
        };

        let requestMatch: RequestMatch = {
            gameStyleId: match.gameStyle.id,
            guestTeam: requestGuestTeam,
            homeTeam: requestHomeTeam,
            league: requestLeague,
            startDate: startDate.toISOString()
        };
        setLoading(true);
        let response = await putMatch(match.id, requestMatch, editorCode);
        if (response.data != null) {
            setErrorMsgs([]);
        } else {

        }
        setLoading(false);
    }
};

export default MatchInfoEdit;