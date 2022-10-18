import { Autocomplete, createFilterOptions, FilterOptionsState, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Team } from "../../../../rest/Team";
import { MatchStateObject } from "../MatchStateObject";

export interface ClubSelectorProps {
    onUpdate: ((matchStateObject: MatchStateObject) => void);
    updateError: (msg: string) => void;
    isHomeTeam: boolean;
    teams: Array<Team>
    matchStateObject: MatchStateObject;

}

const filter = createFilterOptions<string>();


const ClubSelector = ({ onUpdate, updateError, isHomeTeam, matchStateObject, teams }: ClubSelectorProps) => {

    const [clubInput, setClubInput] = useState<string>("");
    const [tmpClub, setTmpClub] = useState<string>("");
    const [clubs, setClubs] = useState<Array<string>>([]);

    const [t] = useTranslation();

    useEffect(() => {
        let lookupMap: any = {};
        let clubs = teams.filter(t => lookupMap.hasOwnProperty(t.club) ? false : (lookupMap[t.club] = true)).map(c => c.club);
        setClubs(clubs);
    }, [teams])

    return (
        <Autocomplete
            id="auto-league"            
            sx={{ minWidth: "200px", alignSelf: "center" }}
            value={isHomeTeam ? matchStateObject.homeClub : matchStateObject.guestClub}
            onChange={(e, value) => onClubSelected(value)}
            options={clubs}
            inputValue={clubInput}
            onInputChange={(e, value) => value.startsWith("Add \"") === false && setClubInput(value)}
            renderInput={(params) => <TextField {...params} label={isHomeTeam ? t("TeamState.homeTeam") : t("TeamState.guestTeam")} />}
            filterOptions={filterOptions}
        />
    )

    function filterOptions(options: string[], params: FilterOptionsState<string>) {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
            filtered.push(`Add "${inputValue}"`);
        }
        return filtered;
    }


    function onClubSelected(club: string | null) {

        if (club != null && club.startsWith("Add \"")) {
            club = club.replace("Add \"", "");
            club = club.replace("\"", "");

            let newClubs = clubs.filter(c => c !== tmpClub);
            newClubs.push(club);

            setClubs(newClubs);
            setTmpClub(club);
        }

        let oldClub;
        let update = { ...matchStateObject };
        if (isHomeTeam) {
            oldClub = update.homeClub
            update.homeClub = club;
        } else {
            oldClub = update.guestClub;
            update.guestClub = club;
        }

        if (club != null) {
            let sameClub = teams.filter(t => t.club === club);
            if (sameClub.length === 1) {
                // only one team of this club exists in this league
                // therefore select the number of the team as well
                if (isHomeTeam)
                    update.homeTeam = sameClub[0];
                else
                    update.guestTeam = sameClub[0];
            } else if (oldClub !== club) {
                // reset the number when the club changed
                if (isHomeTeam)
                    update.homeTeam = null;
                else
                    update.guestTeam = null;
            }
        }
        onUpdate(update);
        updateError('');
    }
}

export default ClubSelector;