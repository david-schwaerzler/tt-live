import { useContext, useMemo } from "react";
import { AppContext } from "../../../AppContext";
import { SimpleMatch } from "../../../rest/data/Match";

export function useMatchFilter(matches: Array<SimpleMatch> | null) {

    const context = useContext(AppContext);

    let filtered: Array<SimpleMatch> = useMemo(() => {

        let filter = context.matchFilter;

        if (matches == null)
            return [];

        let filtered = [...matches];

        if (filter.regions != null && filter.regions.length !== 0) {
            filtered = filtered.filter(m => filter.regions!.some(r => m.league.region.toLocaleLowerCase().includes(r.toLocaleLowerCase())));
        }
        if (filter.leagues != null && filter.leagues.length !== 0) {
            filtered = filtered.filter(m => filter.leagues!.some(l => m.league.name.toLocaleLowerCase().includes(l.toLocaleLowerCase())));
        }
        if (filter.clubs != null && filter.clubs.length !== 0) {
            filtered = filtered.filter(m => filter.clubs!.some(c =>
                m.homeClub.toLocaleLowerCase().includes(c.toLocaleLowerCase()))
                || filter.clubs!.some(c => m.guestClub.toLocaleLowerCase().includes(c.toLocaleLowerCase())))
        }
        if (filter.contests != null && filter.contests.length !== 0) {
            filtered = filtered.filter(m => filter.contests!.some(c => {
                return m.league.contest === c
            }));
        }
        if (filter.states != null && filter.states.length !== 0) {
            filtered = filtered.filter(m => filter.states!.includes(m.state));
        }
        return filtered;
    }, [context.matchFilter, matches])

    return filtered;
}