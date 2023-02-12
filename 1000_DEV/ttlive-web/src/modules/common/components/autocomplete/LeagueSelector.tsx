import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { League } from "../../../../rest/data/League";
import { MatchStateObject } from "../../../create_match/components/MatchStateObject";

import CustomAutoComplete from "./CustomAutoComplete";


export interface LeagueSelectorProps {
    onUpdate: ((matchStateObject: MatchStateObject) => void);
    updateError: (msg: string) => void;
    leagues: Array<League>
    matchStateObject: MatchStateObject;
    error: boolean
}

const LeagueSelector = ({ onUpdate, updateError, leagues, matchStateObject, error }: LeagueSelectorProps) => {


    const [t] = useTranslation();

    let onCreate = useCallback((name: string) => (
        {
            id: -1,
            contest: matchStateObject.contest!, // value can never be null here.
            region: matchStateObject.region!.name,
            name: name
        }), [matchStateObject]);


    return (
        <CustomAutoComplete<League>
            sx={{ minWidth: "200px", alignSelf: "center" }}
            value={matchStateObject.league}
            onChange={onLeagueSelected}
            options={leagues}
            accessor={league => league.name}
            label={t("LeagueState.league")}
            onCreateType={onCreate}
            error={error}
        />
    );


    function onLeagueSelected(league: League | null) {
        let updated = { ...matchStateObject };
        updated.league = league;
        updateError("")
        onUpdate(updated);
    }
}


export default LeagueSelector;