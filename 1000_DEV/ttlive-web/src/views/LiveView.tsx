import { Button, Card, CardContent, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../AppContext";
import GameLiveScore from "../components/game/GameLiveScore";
import GameReport from "../components/game/GameReport";
import { InputType } from "../components/game/GameSetScore";
import MatchScore from "../components/match/MatchScore";
import MatchSettings from "../components/match/settings/MatchSettings";
import ErrorMessage from "../components/utils/ErrorMessage";
import { spacingNormal } from "../components/utils/StyleVars";
import WebHookUtil from "../components/utils/WebHookUtil";
import { fetchMatch } from "../rest/api/MatchApi";
import { Game } from "../rest/data/Game";
import { Match, sortMatch } from "../rest/data/Match";

const ACTIVE_LIVE_TAB_SETTING = "activeLiveTab"

const LiveView = () => {
    const [match, setMatch] = useState<Match | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [editorCode, setEditorCode] = useState<string | null>(null)
    const [reversedGames, setReversedGames] = useState<Array<Game>>([]); // games of the match in reversed order (higher game number is first)
    const [activeTab, setActiveTab] = useState<number>(1);
    
    const context = useContext(AppContext)
    const [t] = useTranslation();


    const swipeHanlder = useSwipeable({
        onSwipedRight: () => setActiveTab(activeTab - 1 < 0 ? 0 : activeTab - 1),
        onSwipedLeft: () => setActiveTab(activeTab + 1 > 2 ? 2 : activeTab + 1)
    })

    useEffect(() => {
        async function fetchData(id: number) {
            let response = await fetchMatch(id);
            if (response.data != null) {
                setReversedGames([...response.data.games].reverse());
                setMatch(response.data);

                if (context.editorCode[response.data?.id] != null)
                    setEditorCode(context.editorCode[response.data?.id]);
                else
                    setEditorCode(null)
            } else {
                setErrorMsg(response.error == null ? "" : response.error);
            }
        }

        if (context.matchId != null)
            fetchData(context.matchId);
    }, [context.matchId, context.editorCode])

    if (context.matchId == null)
        return renderNoMatch();

    return (
        <Box {...swipeHanlder}>
            {match != null && <WebHookUtil match={match} onGameUpdated={game => onGameUpdated(game, match)} onMatchUpdated={onMatchUpdated} />}
            {/* This is a quick fix to allow swiping on on outside the component */}
            <Box {...swipeHanlder} className="test" position="absolute" top={"10%"} bottom={0} left={0} right={0} zIndex={-10} />

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

    function renderSettings() {
        return <MatchSettings match={match} editorCode={editorCode} onMatchChanged={match => setMatch(match)} />;
    }

    function renderLinup() {
        return <GameReport games={match != null ? match.games : null} editorCode={editorCode} />;
    }

    function renderLive() {
        return (
            <Stack direction="column" gap={spacingNormal}>
                <ErrorMessage msg={errorMsg} centered />
                {match == null ? <Skeleton sx={{ height: { xs: "212px", sm: "200px" } }} variant="rectangular" />
                    : <Card>
                        <CardContent>
                            <MatchScore match={match} />
                        </CardContent>
                    </Card>
                }

                {reversedGames.filter(game => game.state === "LIVE").map(game =>
                    <GameLiveScore key={game.id} game={game} />
                )}
                {reversedGames.filter(game => game.state === "FINISHED").map(game =>
                    <GameLiveScore key={game.id} game={game} />
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

    function onGameUpdated(game: Game, match: Match) {
        if (match == null)
            return;
      
        let matchCopy = { ...match }; // create a copy of the match        
        let gamesCopy = [...matchCopy.games];

        gamesCopy = gamesCopy.filter(g => g.id !== game.id); // remove the given game from the array
        gamesCopy.push(game); // add it to the copy
        matchCopy.games = gamesCopy // add the copies together
        sortMatch(matchCopy);

        setReversedGames([...gamesCopy].reverse());
        setMatch(matchCopy);
    }

    function onMatchUpdated(match: Match) {
        sortMatch(match)
        setMatch(match);
        setReversedGames([...match.games].reverse());
    }
}

export default LiveView;