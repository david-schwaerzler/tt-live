import { useContext, useEffect, useMemo, useState } from "react";
import {  SimpleMatch } from "../../rest/data/Match";
import { Autocomplete, Box, Button, Collapse, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, Select, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/system";
import FilterListIcon from '@mui/icons-material/FilterList';
import { AppContext } from "../../AppContext";

export interface MatchFilterProps {
    simpleMatches: Array<SimpleMatch>;
    onFilter: (filteredMatched: Array<SimpleMatch>) => void;
}

const MATCH_FILTER_SETTING_KEY = "matchFilter";
interface MatchFilters {
    region: string | null,
    league: string | null,
    club: string | null,
    contest: string,
    showLive: boolean,
    showFinished: boolean,
    showUpcoming: boolean,
    expanded: boolean
}

const MatchFilter = ({ simpleMatches, onFilter }: MatchFilterProps) => {

    const [regions, setRegions] = useState<Array<string>>([]);
    const [leagues, setLeagues] = useState<Array<string>>([]);
    const [clubs, setClubs] = useState<Array<string>>([]);
    const [isIconColored, setIconColored] = useState<boolean>(false);

    const context = useContext(AppContext);
    const filter: MatchFilters = useMemo(() => {

        let str = context.getSetting(MATCH_FILTER_SETTING_KEY)

        let ret: MatchFilters = {
            region: null,
            league: null,
            club: null,
            contest: "",
            showLive: true,
            showFinished: true,
            showUpcoming: true,
            expanded: false
        };
        if (str == null || str === "")
            return ret;
        return { ...ret, ...JSON.parse(str) };
    }, [context]);

    const [t] = useTranslation();

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

    useEffect(() => {
        let filtered = [...simpleMatches];

        // will be set to true if at least one filter has been applied
        let someFiltered = false;

        if (filter.region != null){
            filtered = filtered.filter(m => m.league.region === filter.region);
            someFiltered = true;
        }
        if (filter.league != null){
            filtered = filtered.filter(m => m.league.name === filter.league);
            someFiltered = true;
        }
        if (filter.club != null){
            filtered = filtered.filter(m => m.homeClub === filter.club || m.guestClub === filter.club)
            someFiltered = true;
        }
        if (filter.contest !== ""){
            filtered = filtered.filter(m => m.league.contest === filter.contest);
            someFiltered = true;
        }
        if (filter.showLive === false){
            filtered = filtered.filter(m => m.state !== "LIVE");
            someFiltered = true;
        }
        if (filter.showUpcoming === false){
            filtered = filtered.filter(m => m.state !== "NOT_STARTED");
            someFiltered = true;
        }
        if (filter.showFinished === false){
            filtered = filtered.filter(m => m.state !== "FINISHED");
            someFiltered = true;
        }

        setIconColored(someFiltered);

        onFilter(filtered);
    }, [simpleMatches, filter, onFilter])

    return (
        <Box>
            <Stack direction="row-reverse">
                <IconButton onClick={() => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, expanded: !filter.expanded}), false)} >
                    <FilterListIcon color={isIconColored ? "primary" : undefined} />
                    <Typography sx={{ fontStyle: "italic", ...(isIconColored ? {fontWeight: "bold"} : {opacity: "50%"}) }}>Filter </Typography>
                </IconButton>
            </Stack>
            <Collapse in={filter.expanded}>
                <Stack direction="column" gap={1}>
                    <Stack direction="row" gap={1} >
                        <FormControl sx={{ flex: "1 1 0" }}>
                            <Autocomplete
                                value={filter.region}
                                onChange={(e, value) => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, region: value}), false)}
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
                                value={filter.contest}
                                onChange={e => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, contest: e.target.value}), false)}>
                                <MenuItem value="WOMEN">{t('MatchFilter.contestWomen')}</MenuItem>
                                <MenuItem value="MEN">{t('MatchFilter.contestMen')}</MenuItem>
                                <MenuItem value="">{<i>{t('MatchFilter.emptyContest')}</i>}</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack gap={1} direction={{ xs: "column", sm: "row" }}>
                        <FormControl sx={{ flex: "1 1 0" }} >
                            <Autocomplete
                                value={filter.league}
                                onChange={(e, value) => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, league: value}), false)}
                                options={leagues}
                                renderInput={(params) => <TextField {...params} label={t('MatchFilter.league')} error={false} />}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: "1 1 0" }} >
                            <Autocomplete
                                value={filter.club}
                                onChange={(e, value) => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, club: value}), false)}
                                options={clubs}
                                renderInput={(params) => <TextField {...params} label={t('MatchFilter.club')} error={false} />}
                                sx={{ minWidth: "200px" }}
                            />
                        </FormControl>
                    </Stack>
                    <Stack direction="row" gap={1}>
                        <FormControlLabel
                            label={t("MatchFilter.showUpcoming")}
                            control={<Radio
                                checked={filter.showUpcoming}
                                onClick={() => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, showUpcoming: !filter.showUpcoming}), false)} />}
                        />
                        <FormControlLabel
                            label={t("MatchFilter.showLive")}
                            control={<Radio
                                checked={filter.showLive}
                                onClick={() => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, showLive: !filter.showLive}), false)} />}
                        />
                        <FormControlLabel
                            label={t("MatchFilter.showFinished")}
                            control={<Radio
                                checked={filter.showFinished}
                                onClick={() => context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify({...filter, showFinished: !filter.showFinished}), false)} />}
                        />
                    </Stack>

                    <Stack direction="row" gap={1}>
                        <Button onClick={() => onReset(filter.expanded)}>{t("Common.reset")}</Button>
                    </Stack>
                </Stack>
            </Collapse>
        </Box>
    );

    function onReset(expanded: boolean) {
        let ret: MatchFilters = {
            region: null,
            league: null,
            club: null,
            contest: "",
            showLive: true,
            showFinished: true,
            showUpcoming: true,
            expanded: expanded            
        };

       context.setSetting(MATCH_FILTER_SETTING_KEY, JSON.stringify(ret), false);
    }
};

export default MatchFilter;