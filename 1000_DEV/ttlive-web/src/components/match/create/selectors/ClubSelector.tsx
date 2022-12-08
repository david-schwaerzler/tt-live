import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Team } from "../../../../rest/data/Team";
import CustomAutoComplete from "../../../utils/CustomAutoComplete";
import { MatchStateObject } from "../MatchStateObject";

export interface ClubSelectorProps {
    onUpdate: ((matchStateObject: MatchStateObject) => void);
    updateError: (msg: string) => void;
    isHomeTeam: boolean;
    teams: Array<Team>
    matchStateObject: MatchStateObject;
    error: boolean;
}

const ClubSelector = ({ onUpdate, updateError, isHomeTeam, matchStateObject, teams, error }: ClubSelectorProps) => {

    const [clubs, setClubs] = useState<Array<string>>([]);

    const [t] = useTranslation();

    useEffect(() => {
        let lookupMap: any = {};
        let clubs = teams.filter(t => lookupMap.hasOwnProperty(t.club) ? false : (lookupMap[t.club] = true)).map(c => c.club);
        setClubs(clubs);

    }, [teams])



    return (
        <CustomAutoComplete<string>
            accessor={value => value}
            onCreateType={value => value}
            onChange={onClubSelected}
            label={isHomeTeam ? t("TeamState.homeTeam") : t("TeamState.guestTeam")}
            error={error}
            options={clubs}
            value={isHomeTeam
                ? matchStateObject.homeClub === "" ? null : matchStateObject.homeClub
                : matchStateObject.guestClub === "" ? null : matchStateObject.guestClub
            }
        />
    )



    function onClubSelected(club: string | null) {

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