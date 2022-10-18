import { Autocomplete, createFilterOptions, FilterOptionsState, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { League } from "../../../../rest/League";
import { MatchStateObject } from "../MatchStateObject";

export interface LeagueSelectorProps {
    onUpdate: ((matchStateObject: MatchStateObject) => void);
    updateError: (msg: string) => void;
    leagues: Array<League>
    matchStateObject: MatchStateObject;
}

const filter = createFilterOptions<League>();

const LeagueSelector = ({ onUpdate, updateError, leagues, matchStateObject }: LeagueSelectorProps) => {

    const [leagueInput, setLeagueInput] = useState<string>("")
    const [tmpLeagues, setTmpLeagues] = useState<Array<League>>([]);
    const [t] = useTranslation();

    useEffect(() => {

        let tmpLeagues = leagues.map(l => { return { ...l } });

        if (matchStateObject.league != null && matchStateObject.league.id === -1) {
            tmpLeagues.push(matchStateObject.league);
        }

        setTmpLeagues(tmpLeagues);

    }, [leagues, matchStateObject.league])


    return (
        <Autocomplete
            id="auto-league"
            sx={{ minWidth: "200px", alignSelf: "center" }}
            value={matchStateObject.league}
            onChange={(e, value) => onLeagueSelected(value)}
            options={tmpLeagues}
            getOptionLabel={option => option.name === "" ? `Add "${leagueInput}"` : option.name}
            inputValue={leagueInput}
            onInputChange={(e, value) => value.startsWith("Add \"") === false && setLeagueInput(value)}
            renderInput={(params) => <TextField {...params} label={t("LeagueState.league")} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterOptions={filterOptions}
        />
    )


    function filterOptions(options: Array<League>, params: FilterOptionsState<League>) {
        const filtered = filter(options, params);
        const { inputValue } = params;

        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
            let newTeam: League = {
                id: -1,
                contest: matchStateObject.contest!, // value can never be null here.
                name: ""
            }
            filtered.push(newTeam);
        }
        return filtered;
    }

    function onLeagueSelected(league: League | null) {

        if (league != null && league.id === -1) {
            league.name = leagueInput

            let tmp = leagues.map(l => { return { ...l } })
            tmp.push(league);
            setTmpLeagues(tmp);
        }

        let updated = { ...matchStateObject };
        updated.league = league;
        updateError("")
        onUpdate(updated);
    }
}


export default LeagueSelector;