import { Button, Card, CardContent, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../AppContext";
import ChatDrawer from "../components/chat/ChatDrawer";
import GameLiveEdit from "../components/game/GameLiveEdit";
import GameLiveScore from "../components/game/GameLiveScore";
import GameReport from "../components/game/GameReport";
import MatchScore from "../components/match/MatchScore";
import MatchSettings from "../components/match/settings/MatchSettings";
import ErrorMessage from "../components/utils/ErrorMessage";
import ShareButton from "../components/utils/ShareButton";
import { spacingNormal } from "../components/utils/StyleVars";
import WebHookUtil from "../components/utils/WebHookUtil";
import { fetchChatMessages } from "../rest/api/ChatApi";
import { fetchMatch } from "../rest/api/MatchApi";
import { ChatMessage, sortChatMessages } from "../rest/data/ChatMessage";
import { Game } from "../rest/data/Game";
import { Match, sortMatch } from "../rest/data/Match";


const LiveView = () => {
    const [match, setMatch] = useState<Match | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [editorCode, setEditorCode] = useState<string | null>(null)
    const [reversedGames, setReversedGames] = useState<Array<Game>>([]); // games of the match in reversed order (higher game number is first)
    const [activeTab, setActiveTab] = useState<number>(1);
    const [chatDrawerExpanded, setChatDrawerExpanded] = useState(false);
    const [messages, setMessages] = useState<Array<ChatMessage>>([])
    const [badgeCounter, setBadgeCounter] = useState<number>(0);

    const context = useContext(AppContext)
    const [t] = useTranslation();
    const [searchParams] = useSearchParams();


    const swipeHanlder = useSwipeable({
        onSwipedRight: () => setActiveTab(activeTab - 1 < 0 ? 0 : activeTab - 1),
        onSwipedLeft: () => setActiveTab(activeTab + 1 > 2 ? 2 : activeTab + 1),
    })

    useEffect(() => {
        const matchIdStr = searchParams.get("id");
        if (matchIdStr != null) {
            const matchId = parseInt(matchIdStr);
            context.setMatchId(matchId);
        }
    }, [searchParams, context])


    useEffect(() => {
        async function fetchMatchLocal(id: number) {
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
        async function fetchChatLocal(id: number) {
            let response = await fetchChatMessages(id)
            if (response.data)
                setMessages(response.data)
        }


        let intervalId: NodeJS.Timer | null = null;
        if (context.matchId != null) {
            fetchMatchLocal(context.matchId);
            fetchChatLocal(context.matchId);

            intervalId = setInterval(() => {
                if (context.matchId != null) {
                    fetchMatchLocal(context.matchId);
                    fetchChatLocal(context.matchId);
                }
            }, 30000);
        }

        return () => {
            if (intervalId != null)
                clearInterval(intervalId);
        }
    }, [context.matchId, context.editorCode])

    if (context.matchId == null)
        return renderNoMatch();

    return (
        <Box {...swipeHanlder} sx={{ ...(chatDrawerExpanded && { height: { xs: "calc(50vh - 64px)", md: "100%" } }), overflow: "auto", m: -2, p: 2 }}>
            {match != null && <WebHookUtil match={match} onGameUpdated={game => onGameUpdated(game, match)} onMatchUpdated={onMatchUpdated} onAddChatMessage={onAddChatMessage} />}
            {/* This is a quick fix to allow swiping on on outside the component */}
            <Box {...swipeHanlder} className="test" position="absolute" top={"10%"} bottom={0} left={0} right={0} zIndex={-10} />

            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered variant="fullWidth" sx={{ mb: 4, ...(chatDrawerExpanded && {}) }}>
                <Tab label={t("LiveView.settings")} />
                <Tab label={t("LiveView.live")} />
                <Tab label={t("LiveView.lineup")} />
            </Tabs>

            <Box display={activeTab === 0 ? "block" : "none"}>{renderSettings()}</Box>
            <Box display={activeTab === 1 ? "block" : "none"}>{renderLive()}</Box>
            <Box display={activeTab === 2 ? "block" : "none"}>{renderLinup()}</Box>

            {match && <ShareButton matchId={match.id} />}


            {match != null &&
                <ChatDrawer
                    match={match}
                    expanded={chatDrawerExpanded}
                    onExpanded={onChatDrawerExpanded}
                    messages={messages}
                    badgeCounter={badgeCounter}
                />
            }
        </Box>

    );

    function renderSettings() {
        return <MatchSettings match={match} editorCode={editorCode} onMatchChanged={match => setMatch(match)} />;
    }

    function renderLinup() {
        return <GameReport games={match != null ? match.games : null} editorCode={editorCode} matchState={match != null ? match.state : "NOT_STARTED"} />;
    }

    function renderLive() {
        return (
            <Stack direction="column" gap={spacingNormal}>
                <ErrorMessage msg={errorMsg} centered />
                {match == null ? <Skeleton sx={{ height: { xs: "212px", sm: "200px" } }} variant="rectangular" />
                    : <React.Fragment><Card>
                        <CardContent>
                            <MatchScore match={match} />
                        </CardContent>
                    </Card>

                        {match.state === "NOT_STARTED" && renderNotStarted(match)}
                    </React.Fragment>
                }


                {reversedGames.filter(game => game.state === "LIVE").map(game =>
                    <GameLiveScore key={game.id} game={game} editButton={() => editorCode && match && <GameLiveEdit matchId={match.id} game={game} messages={messages} editorCode={editorCode} />} />
                )}
                {reversedGames.filter(game => game.state === "FINISHED").map(game =>
                    <GameLiveScore key={game.id} game={game} editButton={() => editorCode && match && <GameLiveEdit matchId={match.id} game={game} messages={messages} editorCode={editorCode} />} />

                )}
            </Stack>
        );
    }

    function renderNotStarted(match: Match) {

        let matchDate = new Date(match.startDate);
        let today = new Date();


        let startDate: string | null = null;
        if (today.toDateString !== matchDate.toDateString) {
            startDate = matchDate.toLocaleDateString();
        }

        let startTime = matchDate.toLocaleTimeString();

        return (
            <Card>
                <CardContent>
                    <Stack sx={{ textAlign: "center", gap: 2 }}>
                        <Typography variant="h3">{t("LiveView.notStartedText")}</Typography>

                        {startDate && <Typography variant="h2">{startDate}</Typography>}
                        {startTime && <Typography variant="h2" color="primary" fontWeight="bold">{startTime}</Typography>}
                    </Stack>
                </CardContent>
            </Card>
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

    function onChatDrawerExpanded(expanded: boolean) {
        setChatDrawerExpanded(expanded);
        if (!expanded)
            setBadgeCounter(0);

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

    function onAddChatMessage(message: ChatMessage) {
        let copy = [...messages];
        copy.push(message);
        sortChatMessages(copy);
        setMessages(copy);
        if (!chatDrawerExpanded)
            setBadgeCounter(badgeCounter + 1);
    }
}

export default LiveView;