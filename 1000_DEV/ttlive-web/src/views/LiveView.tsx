import { Button, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import GameLiveScore from "../components/game/GameLiveScore";
import MatchScore from "../components/match/MatchScore";
import { spacingNormal } from "../components/utils/StyleVars";
import { fetchMatch } from "../rest/api/MatchApi";
import { Match } from "../rest/data/Match";

const LiveView = () => {
    const [match, setMatch] = useState<Match | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const context = useContext(AppContext)
    const [t] = useTranslation();

    useEffect(() => {
        async function fetchData(id: number) {
            let response = await fetchMatch(id);
            if (response.data != null)
                setMatch(response.data);
            else
                setErrorMsg(response.error == null ? "" : response.error);
        }

        if (context.matchId == null)
            setMatch(null)
        else
            fetchData(context.matchId);
    }, [setMatch, context.matchId])


    if (context.matchId == null)
        return renderNoMatch()

    if(match == null)
        return renderLoading();    

    return (
        <Box>
            <Stack direction="column" gap={spacingNormal}>
                <Paper elevation={1}>
                    <MatchScore match={match} />
                </Paper>

                {match?.games.filter(game => game.state === "LIVE").map(game =>
                    <Paper elevation={1} sx={{ paddingLeft: spacingNormal, paddingRight: spacingNormal, paddingTop: spacingNormal }}>
                        <GameLiveScore game={game} />
                    </Paper>
                )}
            </Stack>
        </Box >
    );


    function renderNoMatch() {
        return (
            <Box >
                <Typography variant="h6" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                    {t('LiveView.noMatch')}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Link to="/live_search" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" sx={{ alignSelf: "center" }}>
                            {t('LiveView.search')}
                        </Button>
                    </Link>
                </Box>
            </Box>
        )
    }

    function renderLoading(){
        // TODO render loading
        return <h1>TODO Render loading</h1>
    }
}

export default LiveView;