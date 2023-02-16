import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { SimpleMatch } from "../../../../rest/data/Match";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { fetchAccountMatches } from "../../../../rest/api/AccountApi";
import MyGameCard from "./MyGameCard";

const MyGamesList = () => {

    const [matches, setMatches] = useState<Array<SimpleMatch>>([]);
    const [error, setError] = useState<string>();
    const [t] = useTranslation();

    useEffect(() => {
        async function fetch() {
            let response = await fetchAccountMatches();
            if (response.data != null)
                setMatches(response.data);
            else {
                setError(t("Common.errorHttp"));
            }
        }

        fetch();
    }, [t]);

    const onMatchDeleted = useCallback((matchId: number) => {
        setMatches(matches => {
            return matches.filter(m => m.id !== matchId);
        });
    }, [])

    return (
        <Box>
            <Typography mb={2} variant="h4">{t("MyGameList.myGames")}</Typography>
            <Stack gap={1}>
                {matches.map(m => (
                    <MyGameCard match={m} onMatchDeleted={onMatchDeleted}/>
                ))
                }
            </Stack >
        </Box>
    );

    
}

export default MyGamesList;