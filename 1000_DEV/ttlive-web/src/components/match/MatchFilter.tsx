import React, { useEffect, useState } from "react";
import { Match } from "../../rest/data/Match";
import { Autocomplete, Box, Button, Collapse, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, Select, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/system";
import FilterListIcon from '@mui/icons-material/FilterList';

export interface MatchFilterProps {
    matches: Array<Match>;
    onFilter: (filteredMatched: Array<Match>) => void;
}

const MatchFilter = ({ matches, onFilter }: MatchFilterProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);

    const [regions, setRegions] = useState<Array<string>>([]);
    const [region, setRegion] = useState<string | null>(null);

    const [leagues, setLeagues] = useState<Array<string>>([]);
    const [league, setLeague] = useState<string | null>(null);

    const [clubs, setClubs] = useState<Array<string>>([])
    const [club, setClub] = useState<string | null>(null);

    const [showLive, setShowLive] = useState<boolean>(true);
    const [showFinished, setShowFinished] = useState<boolean>(true);
    const [showUpcoming, setShowUpcoming] = useState<boolean>(true);

    const [contest, setContest] = useState<string>("")
    const [t] = useTranslation();

    useEffect(() => {
        let clubs: Array<string> = [];
        let leagues: Array<string> = [];
        let regions: Array<string> = [];

        matches.forEach(m => {
            if (clubs.includes(m.homeTeam.club) === false)
                clubs.push(m.homeTeam.club);
            if (clubs.includes(m.guestTeam.club) === false)
                clubs.push(m.guestTeam.club);
            if (leagues.includes(m.league.name) === false)
                leagues.push(m.league.name);
            if (regions.includes(m.league.region) === false) {
                regions.push(m.league.region)
            }
            setLeagues(leagues);
            setClubs(clubs);
            setRegions(regions);
        });
    }, [matches])

    useEffect(() => {
        let filtered = [...matches];
        if (region != null)
            filtered = filtered.filter(m => m.league.region === region);
        if (league != null)
            filtered = filtered.filter(m => m.league.name === league)
        if (club != null)
            filtered = filtered.filter(m => m.homeTeam.club === club || m.guestTeam.club === club)
        if (contest !== "")
            filtered = filtered.filter(m => m.league.contest === contest);
        if (showLive === false)
            filtered = filtered.filter(m => m.state !== "LIVE");
        if (showUpcoming === false)
            filtered = filtered.filter(m => m.state !== "NOT_STARTED");
        if (showFinished === false)
            filtered = filtered.filter(m => m.state !== "FINISHED");

        onFilter(filtered);
    }, [matches, region, club, league, contest, showFinished, showLive, showUpcoming, onFilter])

    return (
        <Box>
            <Stack direction="row-reverse">
                <IconButton onClick={() => setExpanded(!expanded)}>
                    <FilterListIcon color={expanded ? "primary" : undefined} />
                    <Typography sx={{ opacity: "50%", fontStyle: "italic" }}>Filter </Typography>
                </IconButton>
            </Stack>
            <Collapse in={expanded}>
                <Stack direction="column" gap={1}>
                    <Stack direction="row" gap={1} >
                        <FormControl sx={{ flex: "1 1 0" }}>
                            <Autocomplete
                                value={region}
                                onChange={(e, value) => setRegion(value)}
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
                                onChange={e => setContest(e.target.value)}>
                                <MenuItem value="WOMEN">{t('MatchFilter.contestWomen')}</MenuItem>
                                <MenuItem value="MEN">{t('MatchFilter.contestMen')}</MenuItem>
                                <MenuItem value="">{<i>{t('MatchFilter.emptyContest')}</i>}</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack gap={1} direction={{ xs: "column", sm: "row" }}>
                        <FormControl sx={{ flex: "1 1 0" }} >
                            <Autocomplete
                                value={league}
                                onChange={(e, value) => setLeague(value)}
                                options={leagues}
                                renderInput={(params) => <TextField {...params} label={t('MatchFilter.league')} error={false} />}
                            />
                        </FormControl>
                        <FormControl sx={{ flex: "1 1 0" }} >
                            <Autocomplete
                                value={club}
                                onChange={(e, value) => setClub(value)}
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
                                checked={showUpcoming}
                                onClick={() => setShowUpcoming(!showUpcoming)} />}
                        />
                        <FormControlLabel
                            label={t("MatchFilter.showLive")}
                            control={<Radio
                                checked={showLive}
                                onClick={() => setShowLive(!showLive)} />}
                        />
                        <FormControlLabel
                            label={t("MatchFilter.showFinished")}
                            control={<Radio
                                checked={showFinished}
                                onClick={() => setShowFinished(!showFinished)} />}
                        />
                    </Stack>

                    <Stack direction="row" gap={1}>
                        <Button onClick={() => onReset()}>{t("Common.reset")}</Button>
                    </Stack>
                </Stack>
            </Collapse>
        </Box>
    );

    function onReset() {
        setRegion(null);
        setLeague(null);
        setClub(null);
        setContest("");
        setShowFinished(true);
        setShowLive(true);
        setShowUpcoming(true);

        onSave();
    }

    function onSave(){

    }

};

export default MatchFilter;