import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchMatches } from "../../rest/api/MatchApi";
import { Match } from "../../rest/data/Match";
import { Stack, SxProps } from "@mui/system";
import { spacingNormal } from "../utils/StyleVars";
import MatchCard from "./MatchCard";
import MatchFilter from "./MatchFilter";

export interface MatchTableProps {
    sx?: SxProps;
    fetchDelay?: number
}

const MatchTable = ({ sx, fetchDelay = 0 }: MatchTableProps) => {

    const [t] = useTranslation();
    const [matches, setMatches] = useState<Array<Match> | null>(null);
    const [filteredMatches, setFilteredMatches] = useState<Array<Match>>([]);
    useEffect(() => {
        async function fetch() {
            let response = await fetchMatches();
            if (response.data != null) {
                setMatches(response.data);
            } else {
                // don't display any error yet 
            }

        };

        let intervalId: NodeJS.Timer | null = null;
        if (fetchDelay !== 0) {
            intervalId = setInterval(async () => {
                fetch();
            }, fetchDelay);
        }
        fetch();

        return () => {
            if (intervalId != null)
                clearInterval(intervalId);
        }

    }, [fetchDelay, t]);

    const onFilter = useCallback((filtered: Array<Match>) => {
        setFilteredMatches(filtered);
    }, [setFilteredMatches]);

    return (
        <Stack sx={{ gap: spacingNormal }}>
            {matches == null
                ? <React.Fragment>
                    <MatchCard match={null} />
                    <MatchCard match={null} />
                    <MatchCard match={null} />
                </React.Fragment>
                : <React.Fragment>
                    <MatchFilter matches={matches} onFilter={onFilter} />
                    {filteredMatches.map(match => <MatchCard key={match.id} match={match} />)}
                </React.Fragment>
            }
        </Stack>
    );
}

export default MatchTable;