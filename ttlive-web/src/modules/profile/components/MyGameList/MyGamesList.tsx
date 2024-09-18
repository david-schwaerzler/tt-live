import { Card, CardContent, IconButton, Skeleton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { SimpleMatch } from "../../../../rest/data/Match";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { fetchAccountMatches } from "../../../../rest/api/AccountApi";
import MyGameCard from "./MyGameCard";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import ErrorMessage from "../../../common/components/utils/ErrorMessage";

const MyGamesList = () => {

    const [matches, setMatches] = useState<Array<SimpleMatch>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [t] = useTranslation();

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            setError("");
            let response = await fetchAccountMatches();
            if (response.data != null)
                setMatches(response.data.sort((a, b) => b.id - a.id));
            else {
                setError(t("Common.errorHttp"));
            }
            setLoading(false);
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
            <Stack direction="row" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="h4" flexGrow={1}>{t("MyGameList.myGames")}</Typography>
                <Box>
                    <Link to="/create">
                        <IconButton color="primary" sx={{ margin: "auto" }}>
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Link>
                </Box>
            </Stack>
            <Stack gap={1}>

                {matches.map(m =>
                    <MyGameCard key={m.id} match={m} onMatchDeleted={onMatchDeleted} />
                )}


                {loading && <Skeleton height="100px" variant="rectangular" />}
                {((loading === false && matches.length === 0) || error !== "") &&
                    <Card elevation={3} sx={{ paddingBottom: "0px" }}>
                        <CardContent sx={{ paddingBottom: 2 }}>
                            <ErrorMessage msg={error} />
                            {error === "" && t("MyGameList.noGame")}
                        </CardContent>
                    </Card>
                }
            </Stack >
        </Box>
    );


}

export default React.memo(MyGamesList);