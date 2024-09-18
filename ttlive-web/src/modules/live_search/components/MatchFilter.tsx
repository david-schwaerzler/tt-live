import { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Button, Collapse, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, Select, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/system";
import FilterListIcon from '@mui/icons-material/FilterList';
import { AppContext } from "../../../AppContext";
import { MatchState, SimpleMatch } from "../../../rest/data/Match";
import { MatchFilterOptions } from "./MatchFilterOptions";
import AccountFilterSelect from "./AccountFilterSelect";
import { useIsAuthenticated } from "react-auth-kit";
import React from "react";

export interface MatchFilterProps {
    simpleMatches: Array<SimpleMatch>;
}

const MatchFilter = ({ simpleMatches }: MatchFilterProps) => {

    const [regions, setRegions] = useState<Array<string>>([]);
    const [leagues, setLeagues] = useState<Array<string>>([]);
    const [clubs, setClubs] = useState<Array<string>>([]);
    const [expanded, setExpanded] = useState<boolean>(false);

    const context = useContext(AppContext);
    const [t] = useTranslation();
    const isAuthenticated = useIsAuthenticated();

    let someFiltered = !(context.matchFilter.clubs == null
        && context.matchFilter.contests == null
        && context.matchFilter.leagues == null
        && context.matchFilter.regions == null
        && context.matchFilter.states == null) && context.matchFilter.isCustom === true;



    useEffect(() => {
        let clubs: Array<string> = [];
        let leagues: Array<string> = [];
        let regions: Array<string> = [];

        simpleMatches.forEach(m => {
            if (clubs.includes(m.homeClub) === false)
                clubs.push(m.homeClub);
            if (clubs.includes(m.guestClub) === false)
                clubs.push(m.guestClub);
            if (leagues.includes(m.league.name) === false)
                leagues.push(m.league.name);
            if (regions.includes(m.league.region) === false) {
                regions.push(m.league.region)
            }
            setLeagues(leagues);
            setClubs(clubs);
            setRegions(regions);
        });
    }, [simpleMatches])

    let region = null;
    let contest = "ALL";
    let league = null;
    let club = null;

    if (context.matchFilter.isCustom != null && context.matchFilter.isCustom === true) {
        region = (context.matchFilter.regions != null && context.matchFilter.regions.length !== 0) ? context.matchFilter.regions[0] : null;
        contest = (context.matchFilter.contests != null && context.matchFilter.contests.length !== 0) ? context.matchFilter.contests[0] : "ALL";
        league = (context.matchFilter.leagues != null && context.matchFilter.leagues.length !== 0) ? context.matchFilter.leagues[0] : null;
        club = (context.matchFilter.clubs != null && context.matchFilter.clubs.length !== 0) ? context.matchFilter.clubs[0] : null;
    }

    return (
        <Box>
            <Stack direction="row-reverse" alignItems="center" gap={2} sx={{ ...(isAuthenticated() && { pt: 2 }) }}>

                <IconButton onClick={() => setExpanded(!expanded)} >
                    <FilterListIcon color={someFiltered ? "primary" : undefined} />
                    <Typography sx={{ fontStyle: "italic", ...(someFiltered ? { fontWeight: "bold" } : { opacity: "50%" }) }}>Filter </Typography>
                </IconButton>


                <FormControl sx={{ flexGrow: { xs: 1, md: 0 }, flexShrink: 0, minWidth: "200px" }}>
                    <AccountFilterSelect />
                </FormControl>
            </Stack>
            <Collapse in={expanded}>

                <Stack sx={{ mt: 3 }} gap={1}>
                    <Stack direction="row" gap={1} >
                        <FormControl sx={{ flex: "1 1 0" }}>
                            <Autocomplete
                                value={region}
                                onChange={(e, value) => setFilter({ regions: value != null ? [value] : undefined })}
                                options={regions}
                                renderInput={(params) => <TextField {...params} label={t('MatchFilter.region')} error={false} />}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: "1 1 0" }}>
                            <InputLabel id="select-contest">{t('MatchFilter.contest')}</InputLabel>
                            <Select
                                id="select-contest"
                                labelId="select-contest"
                                label={t('MatchFilter.contest')}
                                value={contest}
                                onChange={e => setFilter({ contests: (e.target.value != null && e.target.value !== "ALL") ? [e.target.value] : undefined })}>
                                <MenuItem value="WOMEN">{t('MatchFilter.contestWomen')}</MenuItem>
                                <MenuItem value="MEN">{t('MatchFilter.contestMen')}</MenuItem>
                                <MenuItem value="ALL">{<i>{t('MatchFilter.emptyContest')}</i>}</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack gap={1} direction={{ xs: "column", sm: "row" }}>
                        <FormControl sx={{ flex: "1 1 0" }} >
                            <Autocomplete
                                value={league}
                                onChange={(e, value) => setFilter({ leagues: value != null ? [value] : undefined })}
                                options={leagues}
                                renderInput={(params) => <TextField {...params} label={t('MatchFilter.league')} error={false} />}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: "1 1 0" }} >
                            <Autocomplete
                                value={club}
                                onChange={(e, value) => setFilter({ clubs: value != null ? [value] : undefined })}
                                options={clubs}
                                renderInput={(params) => <TextField {...params} label={t('MatchFilter.club')} error={false} />}
                            />
                        </FormControl>
                    </Stack>
                    <Stack direction="row" gap={0} flexWrap="wrap">
                        <FormControlLabel
                            label={t("MatchFilter.showUpcoming")}
                            control={<Radio
                                checked={context.matchFilter.states?.includes("NOT_STARTED") ?? true}
                                onClick={() => toggleState("NOT_STARTED")} />}
                        />
                        <FormControlLabel
                            label={t("MatchFilter.showLive")}
                            control={<Radio
                                checked={context.matchFilter.states?.includes("LIVE") ?? true}
                                onClick={() => toggleState("LIVE")} />}
                        />
                        <FormControlLabel
                            label={t("MatchFilter.showFinished")}
                            control={<Radio
                                checked={context.matchFilter.states?.includes("FINISHED") ?? true}
                                onClick={() => toggleState("FINISHED")} />}
                        />
                    </Stack>

                    <Stack direction="row" gap={1}>
                        <Button onClick={() => context.setMatchFilter({isCustom: false})}>{t("Common.reset")}</Button>
                    </Stack>
                </Stack>
            </Collapse>
        </Box>
    );

    function toggleState(state: MatchState) {

        let states = context.matchFilter.states == null ? [] : [...context.matchFilter.states];
        if (states.includes(state))
            states = states.filter(s => s !== state);
        else {
            states.push(state);
        }

        setFilter({ states: states });
    }

    function setFilter(filter: MatchFilterOptions) {
        if (context.matchFilter.isCustom != null && context.matchFilter.isCustom === false) {
            context.setMatchFilter({ ...filter, isCustom: true });
            return;
        }
        context.setMatchFilter({ ...context.matchFilter, ...filter, isCustom: true });

    }
};

export default React.memo(MatchFilter);