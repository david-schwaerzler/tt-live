import { Autocomplete, createFilterOptions, FilterOptionsState, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Team } from "../../../../rest/data/Team";
import { MatchStateObject } from "../MatchStateObject";

export interface TeamNumberSelectorProps {
    onUpdate: ((matchStateObject: MatchStateObject) => void);
    updateError: (msg: string) => void;
    isHomeTeam: boolean;
    teams: Array<Team>
    matchStateObject: MatchStateObject;
    error: boolean;
}

const filter = createFilterOptions<Team>();


const TeamNumberSelector = ({ onUpdate, updateError, isHomeTeam, teams, matchStateObject, error }: TeamNumberSelectorProps) => {

    const [numberInput, setNumberInput] = useState<string>("");
    const [tmpTeams, setTmpTeams] = useState<Array<Team>>([]);

    const [t] = useTranslation();

    useEffect(() => {

        let options = teams.map(t => { return { ...t } });

        if (isHomeTeam) {
            if (matchStateObject.homeTeam?.id === -1) {
                options.push(matchStateObject.homeTeam)
            }
        } else {
            if (matchStateObject.guestTeam?.id === -1) {
                options.push(matchStateObject.guestTeam)
            }
        }
        setTmpTeams(options);

    }, [teams, isHomeTeam, matchStateObject.guestTeam, matchStateObject.homeTeam])


    return (
        <Autocomplete
            id="auto-league"
            sx={{ minWidth: "200px", alignSelf: "center" }}
            value={isHomeTeam ? matchStateObject.homeTeam : matchStateObject.guestTeam}
            onChange={(e, value) => onNumberSelected(value)}
            options={tmpTeams.filter(t => isHomeTeam ? t.club === matchStateObject.homeClub : t.club === matchStateObject.guestClub)}
            getOptionLabel={option => option.number === -1 ? `Add "${numberInput}"` : option.number.toString()}
            inputValue={numberInput}
            onInputChange={(e, value) => onInputChange(value)}
            renderInput={(params) => <TextField {...params} label={t("TeamState.number")} error={error} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterOptions={filterOptions}
            autoHighlight={true}
        />
    );


    function onInputChange(value: string) {
        if (value !== "" && isNum(value) === false)
            return;
        setNumberInput(value)
    }

    function filterOptions(options: Array<Team>, params: FilterOptionsState<Team>) {
        const filtered = filter(options, params);
        const { inputValue } = params;

        const isExisting = options.some((option) => parseInt(inputValue) === option.number);
        if (inputValue !== '' && !isExisting) {
            let newTeam: Team = {
                id: -1,
                club: isHomeTeam ? matchStateObject.homeClub! : matchStateObject.guestClub!, // can't be null here
                number: -1
            }
            filtered.push(newTeam);
        }
        return filtered;
    }

    function onNumberSelected(team: Team | null) {

        if (team != null && team.id === -1) {
            team.number = parseInt(numberInput)

            let tmp = teams.map(t => { return { ...t } })
            tmp.push(team);
            setTmpTeams(tmp);
        }

        let update = { ...matchStateObject };
        if (isHomeTeam)
            update.homeTeam = team;
        else
            update.guestTeam = team;
        onUpdate(update);
        updateError('');
    }


    function isNum(str: string) {
        return /\d$/.test(str);
    }
}


export default TeamNumberSelector;