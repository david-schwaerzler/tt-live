import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchSimpleMatches } from "../../../rest/api/MatchApi";
import { SimpleMatch } from "../../../rest/data/Match";
import { Stack, SxProps } from "@mui/system";
import { spacingNormal } from "../../common/utils/StyleVars";
import MatchCard from "./MatchCard";
import MatchFilter from "./MatchFilter";
import { useMatchFilter } from "./useMatchFilter";

export interface MatchTableProps {
    sx?: SxProps;
    fetchDelay?: number
}

const MatchTable = ({ sx, fetchDelay = 0 }: MatchTableProps) => {

    const [t] = useTranslation();
    const [simpleMatches, setSimpleMatches] = useState<Array<SimpleMatch> | null>(null);

    useEffect(() => {
        async function fetch() {
            let response = await fetchSimpleMatches();
            if (response.data != null) {
                setSimpleMatches(response.data);
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

    const filtered = useMatchFilter(simpleMatches);

    return (
        <Stack sx={{ gap: spacingNormal }}>
            {simpleMatches == null
                ? <React.Fragment>
                    <MatchCard simpleMatch={null} variant="simple" />
                    <MatchCard simpleMatch={null} variant="simple" />
                    <MatchCard simpleMatch={null} variant="simple" />
                </React.Fragment>
                : <React.Fragment>
                    <MatchFilter simpleMatches={simpleMatches} />
                    {filtered.map(match => <MatchCard key={match.id} simpleMatch={match} variant="simple" />)}
                </React.Fragment>
            }
        </Stack>
    );
}

export default MatchTable;