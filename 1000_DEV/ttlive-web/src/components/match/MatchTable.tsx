import { Button, Divider, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchMatches } from "../../rest/api/MatchApi";
import { Match } from "../../rest/data/Match";
import LinkIcon from '@mui/icons-material/Link';
import { Box, Stack } from "@mui/system";
import { spacingLarge, spacingNormal, spacingSmall } from "../utils/StyleVars";
import { green, red } from "@mui/material/colors";

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
                onError(response.error == null ? "" : response.error)
            }
        };

        let intervalId: NodeJS.Timer | null = null;
        console.log(fetchDelay)
        if (fetchDelay !== 0) {
            intervalId = setInterval(async () => {
                fetch();
            }, fetchDelay);
        }

        fetch();
        console.count("test")

        return () => {
            if (intervalId != null)
                clearInterval(intervalId);
        }

    }, [onError, onFetched, fetchDelay]);

    return (

        <Stack sx={{ gap: spacingNormal }}>
            {matches.map(match => (
                <Paper>
                    <Box sx={{ display: "flex" }} padding={spacingSmall}>
                        <Typography sx={{ flexGrow: 1 }}>{match.league.name}</Typography>
                        <Typography>{match.league.region}</Typography>
                    </Box>
                    <Divider sx={{ padding: "0" }} />
                    <Box sx={{ padding: spacingNormal }}>
                        <Box sx={{ display: "flex", alignItems: "center", paddingBottom: spacingNormal, flexDirection: "row" }}>
                            <Typography variant="h6" sx={{ flexGrow: 1, color: green[800] }}>{match.homeTeam.club} {match.homeTeam.number}<br /></Typography>
                            <Typography variant="h6" sx={{ minWidth: "2em", textAlign: "center", color: green[800] }}>{match.homeTeamScore}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", minWidth: "2em" }}>
                            <Typography variant="h6" sx={{ flexGrow: 1, color: red[800] }}>{match.guestTeam.club} {match.guestTeam.number}</Typography>
                            <Typography variant="h6" sx={{ minWidth: "2em", textAlign: "center", justifyContent: "center", color: red[800] }}>{match.guestTeamScore}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", paddingBottom: spacingSmall }}>
                        <Button  size="small">Öffnen</Button>
                    </Box>
                </Paper>
            ))
            }
        </Stack >

    );
}

export default MatchTable;