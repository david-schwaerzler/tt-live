import { Match } from "@testing-library/react";
import { useContext, useMemo } from "react";
import { AppContext } from "../../../AppContext";
import { SimpleMatch } from "../../../rest/data/Match";
import MatchFilter from "./MatchFilter";

export function useMatchFilter(matches: Array<SimpleMatch> | null) {

    const context = useContext(AppContext);

    let filtered: Array<SimpleMatch> = useMemo(() => {

        let filter = context.matchFilter;

        if (matches == null)
            return [];

        let filtered = [...matches];

        if (filter.regions != null && filter.regions.length !== 0) {
            filtered = filtered.filter(m => filter.regions!.some( r => m.league.region.includes(r)));
        }
        if (filter.leagues != null && filter.leagues.length !== 0) {
            filtered = filtered.filter(m => filter.leagues!.some(l => m.league.name.includes(l)));
        }
        if (filter.clubs != null && filter.clubs.length !== 0) {
            filtered = filtered.filter(m => filter.clubs!.some(c => m.homeClub.includes(c)) || filter.clubs!.some( c => m.guestClub.includes(c)))
        }
        if (filter.contests != null && filter.contests.length !== 0) {
            filtered = filtered.filter(m => filter.contests!.some( c => m.league.contest.includes(c)));
        }
        if (filter.states != null && filter.states.length !== 0) {
            filtered = filtered.filter(m => filter.states!.includes(m.state));
        }

        return filtered;
    }, [context.matchFilter, matches])

    return filtered;
}