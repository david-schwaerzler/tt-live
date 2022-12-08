import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Team } from "../../../../rest/data/Team";
import CustomAutoComplete from "../../../utils/CustomAutoComplete";
import { MatchStateObject } from "../MatchStateObject";

export interface TeamNumberSelectorProps {
    onUpdate: ((matchStateObject: MatchStateObject) => void);
    updateError: (msg: string) => void;
    isHomeTeam: boolean;
    teams: Array<Team>
    matchStateObject: MatchStateObject;
    error: boolean;
}

const TeamNumberSelector = ({ onUpdate, updateError, isHomeTeam, teams, matchStateObject, error }: TeamNumberSelectorProps) => {

    const [options, setOptions] = useState<Array<Team>>([]);

    const [t] = useTranslation();

    useEffect(() => {

        if (isHomeTeam) {
            setOptions(teams.filter(t => t.club === matchStateObject.homeClub));            
        } else {
            setOptions(teams.filter(t => t.club === matchStateObject.guestClub));            
        }

    }, [teams, isHomeTeam, matchStateObject.homeClub, matchStateObject.guestClub])

    const onCreate = useCallback((number: string) => ({
        id: -1,
        club: isHomeTeam ? matchStateObject.homeClub! : matchStateObject.guestClub!, // can't be null here
        number: parseInt(number)
    }), [isHomeTeam, matchStateObject.homeClub, matchStateObject.guestClub]);

    return (

        <CustomAutoComplete<Team>
            value={isHomeTeam ? matchStateObject.homeTeam : matchStateObject.guestTeam}
            options={options}
            accessor={team => team.number.toString()}
            onCreateType={onCreate}
            label={t("TeamState.number")}
            error={error}
            onChange={onNumberSelected}
            inputValidation={isNum}
        />
    );    

    function onNumberSelected(team: Team | null) {
        let update = { ...matchStateObject };
        if (isHomeTeam)
            update.homeTeam = team;
        else
            update.guestTeam = team;
        onUpdate(update);
        updateError('');
    }

    function isNum(str: string) {
        if(str === "")
            return true;
        return /\d$/.test(str);
    }
}


export default TeamNumberSelector;