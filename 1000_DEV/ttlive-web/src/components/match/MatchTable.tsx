import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchMatches } from "../../rest/api/MatchApi";
import { Match } from "../../rest/data/Match";
import { Stack } from "@mui/system";
import { spacingNormal } from "../utils/StyleVars";
import MatchCard from "./MatchCard";
import { Box } from "@mui/material";

export interface MatchTableProps {
    onError: (msg: string) => void;
    onFetched: () => void;
    sx?: any;
    fetchDelay?: number
}

const MatchTable = ({ sx, fetchDelay = 0, onError, onFetched }: MatchTableProps) => {

    const [t] = useTranslation();
    const [matches, setMatches] = useState<Array<Match>>([]);


    useEffect(() => {
        async function fetch() {
            let response = await fetchMatches();
            if (response.data != null) {
                setMatches(response.data);
                onFetched()
            } else {
                onError(response.error == null ? "" : t("Common.errorFetch"))
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

    }, [onError, onFetched, fetchDelay, t]);

    return (

        <Stack sx={{ gap: spacingNormal }}>
            {matches.map(match =>
                <MatchCard key={match.id} match={match} />
            )}
        </Stack >

    );
}

export default MatchTable;