import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { putMatch } from "../../../../rest/api/MatchApi";
import { RequestLeague } from "../../../../rest/data/League";
import { isMatchVisibility, Match, RequestMatch } from "../../../../rest/data/Match";
import { Region } from "../../../../rest/data/Region";
import { RequestTeam } from "../../../../rest/data/Team";
import ContestSelect from "../../../common/components/autocomplete/ContestSelect";
import RegionAutocomplete from "../../../common/components/autocomplete/RegionSelectAutocomplete";
import LoadingButton from "../../../common/components/buttons/LoadingButton";
import ErrorMessage from "../../../common/components/utils/ErrorMessage";
import { useErrorArrays } from "../../../common/hooks/useErrorArrays";

import BaseSetting from "./BaseSetting";

export interface MatchInfoEditProps {
    match: Match | null;
    editorCode: string;
};

enum Error {
    GENERAL,
    HOME_CLUB,
    HOME_NUMBER,
    GUEST_CLUB,
    GUEST_NUMBER,
    START_DATE,
    END_DATE,
    LEAGUE,
    REGION,
    VISIBILITY,
    CONTEST
};

const MatchInfoEdit = ({ match, editorCode }: MatchInfoEditProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [homeTeamClub, setHomeTeamName] = useState<string>(match == null ? "" : match.homeTeam.club);
    const [homeTeamNumber, setHomeTeamNumber] = useState<number>(match == null ? 0 : match.homeTeam.number);
    const [guestTeamClub, setGuestTeamName] = useState<string>(match == null ? "" : match.guestTeam.club);
    const [guestTeamNumber, setGuestTeamNumber] = useState<number>(match == null ? 0 : match.guestTeam.number);
    const [startDate, setStartDate] = useState<Dayjs | null>(match == null ? null : dayjs(match.startDate));
    const [endDate, setEndDate] = useState<Dayjs | null>(match == null ? null : dayjs(match.endDate));
    const [league, setLeague] = useState<string>(match == null ? "" : match.league.name);
    const [contest, setContest] = useState<"MEN" | "WOMEN">(match == null ? "MEN" : match.league.contest)
    const [region, setRegion] = useState<Region | null>(null);
    const [visibility, setVisibility] = useState<string>(match == null ? "" : match.visibility);
    const [isLoading, setLoading] = useState<boolean>(false);

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
        setEndDate(match.endDate == null ? null : dayjs(match.endDate));
        setLeague(match.league.name);
        setRegion(null)
    }, [match, expanded]);

    const [errorMsgs, updateError, clearErrors] = useErrorArrays();

    if (match == null)
        return <React.Fragment />;

    return (
        <BaseSetting title={t('MatchInfoEdit.title')} expanded={expanded} onExpandedChanged={setExpanded}>
            <ErrorMessage msg={errorMsgs[Error.GENERAL]} />
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
                            autoComplete="off"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label={t("MatchInfoEdit.teamNumber")}
                            type="tel"
                            value={homeTeamNumber < 0 ? "" : homeTeamNumber}
                            sx={{ maxWidth: { xs: "5em", sm: "inherit" } }}
                            onChange={e => e.target.value === "" ? setHomeTeamNumber(-1) : setHomeTeamNumber(parseInt(e.target.value))}
                            error={errorMsgs[Error.HOME_NUMBER] != null && errorMsgs[Error.HOME_NUMBER] !== ""}
                            helperText={errorMsgs[Error.HOME_NUMBER]}
                            autoComplete="off"
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
                            autoComplete="off"
                        />
                    </FormControl>
                    <FormControl>
                        <TextField
                            label={t("MatchInfoEdit.teamNumber")}
                            type="tel"
                            value={guestTeamNumber < 0 ? "" : guestTeamNumber}
                            sx={{ maxWidth: { xs: "5em", sm: "inherit" } }}
                            onChange={e => e.target.value === "" ? setGuestTeamNumber(-1) : setGuestTeamNumber(parseInt(e.target.value))}
                            error={errorMsgs[Error.GUEST_NUMBER] != null && errorMsgs[Error.GUEST_NUMBER] !== ""}
                            helperText={errorMsgs[Error.GUEST_NUMBER]}
                            autoComplete="off"
                        />
                    </FormControl>
                </Stack>

                <FormControl sx={{ flexGrow: 1 }} error={errorMsgs[Error.START_DATE] != null && errorMsgs[Error.START_DATE] !== ""}>
                    <DateTimePicker
                        ampm={false}
                        label={t("LeagueState.startDate")}
                        value={startDate}
                        onChange={date => setStartDate(date)}
                    />
                    <FormHelperText>{errorMsgs[Error.START_DATE]}</FormHelperText>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }} error={errorMsgs[Error.END_DATE] != null && errorMsgs[Error.END_DATE] !== ""}>
                    <DateTimePicker
                        ampm={false}
                        label={t("MatchInfoEdit.endDate")}
                        value={endDate}
                        onChange={date => setEndDate(date)}
                    />
                    <FormHelperText>{errorMsgs[Error.END_DATE]}</FormHelperText>
                </FormControl>
                {match.accountId != null &&
                    <FormControl>
                        <InputLabel id="select-visibility">{t('SettingsState.visibility')}</InputLabel>
                        <Select
                            id="select-contest"
                            labelId="select-contest"
                            label={t('SettingsState.visibility')}
                            value={visibility}
                            onChange={e => isMatchVisibility(e.target.value) && setVisibility(e.target.value)}>
                            <MenuItem value="PUBLIC">{t('MatchVisibility.public')}</MenuItem>
                            <MenuItem value="PRIVATE">{t('MatchVisibility.private')}</MenuItem>
                        </Select>
                        <FormHelperText>
                            {errorMsgs[Error.VISIBILITY]}
                        </FormHelperText>
                    </FormControl>
                }

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
                            autoComplete="off"
                        />
                    </FormControl>
                </Stack>
                <Stack direction="row" gap={1}>
                    <RegionAutocomplete
                        region={region == null ? match.league.region : region}
                        onChanged={r => setRegion(r)}
                        error={errorMsgs[Error.REGION]}
                        onError={msg => updateError(Error.REGION, msg)}
                        sx={{ flexGrow: 1 }}
                    />

                    <ContestSelect
                        contest={contest}
                        onChanged={setContest}
                        error={errorMsgs[Error.CONTEST]}
                        onError={msg => updateError(Error.CONTEST, msg)}
                        sx={{ flexGrow: 1 }}
                    />
                </Stack>
                <LoadingButton loading={isLoading} variant="outlined" onClick={() => onSave(match)}>Save</LoadingButton>
            </Stack>
        </BaseSetting>
    );

    function onReset(match: Match) {
        setHomeTeamName(match.homeTeam.club);
        setHomeTeamNumber(match.homeTeam.number);
        setGuestTeamName(match.guestTeam.club);
        setGuestTeamNumber(match.guestTeam.number);
        setStartDate(dayjs(match.startDate));
        setLeague(match.league.name);
        setVisibility(match.visibility)
        clearErrors();
    }


    async function onSave(match: Match) {
        clearErrors();
        if (homeTeamClub === "") {
            updateError(Error.HOME_CLUB, t("MatchInfoEdit.errorHomeClub"));
            return;
        } else if (homeTeamNumber < 0) {
            updateError(Error.HOME_NUMBER, t("MatchInfoEdit.errorHomeNumber"));
            return;
        } else if (guestTeamClub === "") {
            updateError(Error.GUEST_CLUB, t("MatchInfoEdit.errorGuestClub"));
            return;
        } else if (guestTeamNumber < 0) {
            updateError(Error.GUEST_NUMBER, t("MatchInfoEdit.errorGuestNumber"));
            return;
        } else if (startDate == null || startDate.isValid() === false) {
            updateError(Error.START_DATE, t("MatchInfoEdit.errorStartDate"));
            return;
        } else if (endDate != null && startDate.isValid() === false) {
            updateError(Error.END_DATE, t("MatchInfoEdit.errorEndDate"));
            return;
        } else if (league === "") {
            updateError(Error.LEAGUE, t("MatchInfoEdit.errorLeague"));
            return;
        } else if (region === null) {
            updateError(Error.REGION, t("MatchInfoEdit.errorRegion"));
            return;
        } else if (contest !== "MEN" && contest !== "WOMEN") {
            updateError(Error.CONTEST, t("MatchInfoEdit.errorContest"));
            return;
        } else if (!isMatchVisibility(visibility)) {
            updateError(Error.CONTEST, t("MatchInfoEdit.errorVisibility"));
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
            startDate: startDate.toISOString(),
            endDate: endDate != null ? endDate.toISOString() : null,
            visibility: visibility
        };
        setLoading(true);
        let response = await putMatch(match.id, requestMatch, editorCode);
        if (response.data != null) {
            setExpanded(false)
        } else {
            updateError(Error.GENERAL, t("Common.errorHttp"))
        }
        setLoading(false);
    }
};

export default MatchInfoEdit;