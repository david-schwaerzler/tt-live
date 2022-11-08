import { Button, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { render } from "@testing-library/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../AppContext";
import GameLiveScore from "../components/game/GameLiveScore";
import GameReport from "../components/game/GameReport";
import MatchScore from "../components/match/MatchScore";
import MatchSettings from "../components/match/settings/MatchSettings";
import ErrorMessage from "../components/utils/ErrorMessage";
import { spacingNormal } from "../components/utils/StyleVars";
import { fetchMatch } from "../rest/api/MatchApi";
import { Match } from "../rest/data/Match";

const LiveView = () => {
    const [match, setMatch] = useState<Match | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [activeTab, setActiveTab] = useState(0);
    const [editorCode, setEditorCode] = useState<string | null>(null)

    const context = useContext(AppContext)
    const [t] = useTranslation();
    const ref = useRef(null);


    const swipeHanlder = useSwipeable({
        onSwipedRight: () => setActiveTab(activeTab - 1 < 0 ? 0 : activeTab - 1),
        onSwipedLeft: () => setActiveTab(activeTab + 1 > 2 ? 2 : activeTab + 1)
    })

    useEffect(() => {
        async function fetchData(id: number) {
            let response = await fetchMatch(id);
            if (response.data != null) {
                setMatch(response.data);
                if (context.editorCode[response.data?.id] != null)
                    setEditorCode(context.editorCode[response.data?.id]);
                else
                    setEditorCode(null)
            } else {
                setErrorMsg(response.error == null ? "" : response.error);
            }
        }

        if (context.matchId == null)
            setMatch(null)
        else
            fetchData(context.matchId);
    }, [context.matchId, context.editorCode])

    if (context.matchId == null)
        return renderNoMatch()

    if (match == null)
        return renderLoading();


    return (
        <Box {...swipeHanlder} >
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered variant="fullWidth" sx={{ mb: 4 }}>
                <Tab label={t("LiveView.settings")} />
                <Tab label={t("LiveView.live")} />
                <Tab label={t("LiveView.lineup")} />
            </Tabs>

            <Box display={activeTab === 0 ? "block" : "none"}>{renderSettings()}</Box>
            <Box display={activeTab === 1 ? "block" : "none"}>{renderLive()}</Box>
            <Box display={activeTab === 2 ? "block" : "none"}>{renderLinup()}</Box>
        </Box>
    );

    function renderSettings(){
        return match && <MatchSettings match={match} editorCode={editorCode} />;
    }

    function renderLinup() {
        return (match && <GameReport games={match.games} />);
    }

    function renderLive() {
        return (

            <Stack direction="column" gap={spacingNormal} ref={ref}>
                <ErrorMessage msg={errorMsg} centered />
                <Paper elevation={1} sx={{ pt: 4, pb: 4 }}>
                    {match != null && <MatchScore match={match} />}
                </Paper>

                {match?.games.filter(game => game.state === "LIVE").map(game =>
                    <Paper key={game.id} elevation={1} sx={{ paddingTop: spacingNormal }}>
                        <GameLiveScore game={game} />
                    </Paper>
                )}
            </Stack>
        );
    }


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

    function renderLoading() {
        // TODO render loading
        return <h1>TODO Render loading</h1>
    }
}

export default LiveView;