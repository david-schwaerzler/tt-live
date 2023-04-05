import { Alert, AlertTitle, Button, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { AppContext } from "../../AppContext";
import ShareButton from "./components/live/ShareButton";
import { spacingNormal } from "../common/utils/StyleVars";
import { useTrackPage } from "../common/hooks/useTrackerProvider";
import { fetchChatMessages } from "../../rest/api/ChatApi";
import { fetchMatch } from "../../rest/api/MatchApi";
import { ChatMessage, sortChatMessages } from "../../rest/data/ChatMessage";
import { Game } from "../../rest/data/Game";
import { Match, sortMatch } from "../../rest/data/Match";
import { Player } from "../../rest/data/Player";
import ChatDrawer from "../chat/ChatDrawer";
import { useEditorCode } from "./hooks/useEditorCode";
import { useWebHookUtil } from "../common/hooks/useWebHookUtil";

const MatchSettingsTab = React.lazy(() => import("./components/settings/MatchSettingsTab"));
const LiveTab = React.lazy(() => import("./components/live/LiveTab"));
const GameReportTab = React.lazy(() => import("./components/game_report/GameReportTab"));


const LiveView = () => {
    const [match, setMatch] = useState<Match | null>(null);
    const [activeTab, setActiveTab] = useState<number>(1);
    const [chatDrawerExpanded, setChatDrawerExpanded] = useState(false);
    const [messages, setMessages] = useState<Array<ChatMessage>>([])
    const [badgeCounter, setBadgeCounter] = useState<number>(0);
    const [isLineupComplete, setLineupComplete] = useState<boolean>(true);
    const [loadingError, setLoadingError] = useState<"" | "NOT_FOUND" | "GENERAL">("");

    const context = useContext(AppContext)
    const [t] = useTranslation();
    const [searchParams] = useSearchParams();
    const visitedPages = useRef<Set<number>>(new Set());

    const editorCode = useEditorCode(match?.id ?? null)

    useTrackPage("Live", "/live", match?.id == null ? -1 : match?.id);

    useEffect(() => { visitedPages.current.add(activeTab) }, [activeTab]);

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
                setMatch(response.data);
                setLoadingError("");
            } else {
                if (response.status === 404)
                    setLoadingError("NOT_FOUND")
                else if (match == null)
                    setLoadingError("GENERAL");
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
    }, [context.matchId])

    useEffect(() => {
        if (match?.homePlayers != null && match.guestPlayers != null && match.homeDoubles != null && match.guestDoubles != null) {
            let players: Array<Player> = [...match.homePlayers, ...match.guestPlayers];
            let doubles = [...match.homeDoubles, ...match.guestDoubles];

            let someUnset = players.some(p => p.name === "");
            someUnset = someUnset || doubles.some(d => d.player1 === "" || d.player2 === "")
            setLineupComplete(!someUnset)
        }
    }, [match?.homePlayers, match?.guestPlayers, match?.homeDoubles, match?.guestDoubles]);

    const onChatDrawerExpanded = useCallback((expanded: boolean) => {
        setChatDrawerExpanded(expanded);
        if (!expanded)
            setBadgeCounter(0);
    }, []);

    const onGameUpdated = useCallback((game: Game) => {
        setMatch(match => {
            if (match == null)
                return match;

            let matchCopy = { ...match }; // create a copy of the match        
            let gamesCopy = [...matchCopy.games];

            gamesCopy = gamesCopy.filter(g => g.id !== game.id); // remove the given game from the array
            gamesCopy.push(game); // add it to the copy
            matchCopy.games = gamesCopy // add the copies together
            sortMatch(matchCopy);
            return matchCopy;
        });
    }, []);

    const onMatchUpdated = useCallback((match: Match) => {
        setMatch(matchState => {
            sortMatch(match);
            return match;
        });
    }, []);

    const onAddChatMessage = useCallback((message: ChatMessage) => {
        if (!chatDrawerExpanded)
            setBadgeCounter(badgeCounter + 1);

        setMessages(messages => {
            let copy = [...messages];
            copy.push(message);
            sortChatMessages(copy);
            return copy;
        });
    }, [chatDrawerExpanded, badgeCounter]);

    const reversedGames = useMemo(() => {
        if (match?.games == null)
            return [];
        return [...match.games].reverse();
    }, [match?.games]);


    useWebHookUtil(match, onGameUpdated, onMatchUpdated, onAddChatMessage);

    if (context.matchId == null)
        return renderNoMatch();

    if (loadingError !== "")
        return renderLoadingError();

    return (
        <Box {...swipeHanlder} sx={{ ...(chatDrawerExpanded && { height: { xs: "calc(50vh - 64px)", md: "100%" } }), overflow: "auto", m: -2, p: 2 }}>

            {/* This is a quick fix to allow swiping on on outside the component */}
            <Box {...swipeHanlder} className="test" position="absolute" top={"10%"} bottom={0} left={0} right={0} zIndex={-10} />

            {editorCode != null && isLineupComplete === false &&
                <Alert sx={{ mb: 1, alignItems: "center" }} severity="warning" elevation={1} action={
                    <Button sx={{ mt: "2px" }} onClick={() => setActiveTab(0)} >{t("LiveView.fix")}</Button>
                }>
                    <AlertTitle sx={{ mb: 0 }}>{t("LiveView.missingLineup")}</AlertTitle>
                </Alert>
            }

            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered variant="fullWidth" sx={{ mb: 4, ...(chatDrawerExpanded && {}) }}>
                <Tab label={t("LiveView.settings")} />
                <Tab label={t("LiveView.live")} />
                <Tab label={t("LiveView.lineup")} />
            </Tabs>

            <React.Suspense>
                {(visitedPages.current.has(0) || activeTab === 0) && <Box display={activeTab === 0 ? "block" : "none"}><MatchSettingsTab match={match} editorCode={editorCode} onMatchChanged={onMatchUpdated} /></Box>}
                {(visitedPages.current.has(1) || activeTab === 1) && <Box display={activeTab === 1 ? "block" : "none"}><LiveTab match={match} games={reversedGames} /></Box>}
                {(visitedPages.current.has(2) || activeTab === 2) && <Box display={activeTab === 2 ? "block" : "none"}><GameReportTab
                    games={match != null ? match.games : null}
                    editorCode={editorCode}
                    matchState={match != null ? match.state : "NOT_STARTED"}
                    messages={messages}
                    matchId={match ? match.id : null}
                    onUpdate={onGameUpdated}
                /></Box>}
            </React.Suspense>

            {match && <ShareButton matchId={match.id} />}

            {match != null &&
                <ChatDrawer
                    match={match}
                    expanded={chatDrawerExpanded}
                    onExpanded={onChatDrawerExpanded}
                    messages={messages}
                    badgeCounter={badgeCounter}
                    isEditor={editorCode != null}
                />
            }
            {/* This is needed so that the share button will not hide some stuff*/}
            <Box height="100px" width="100%" />
        </Box>

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

    function renderLoadingError() {
        return (
            <Box >
                <Typography variant="h6" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                    {loadingError === "NOT_FOUND" ? t("LiveView.matchDeleted") : t("LiveView.errorNetwork")}
                </Typography>
                {loadingError === "NOT_FOUND" &&
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Link to="/live_search" style={{ textDecoration: 'none' }}>
                            <Button variant="outlined" sx={{ alignSelf: "center" }}>
                                {t('LiveView.search')}
                            </Button>
                        </Link>
                    </Box>
                }
            </Box>
        );
    }
}

export default LiveView;