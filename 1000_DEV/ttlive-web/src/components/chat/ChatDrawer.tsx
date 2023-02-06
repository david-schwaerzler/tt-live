import { Badge, BadgeProps, Box, Drawer, Paper, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { createRef, useEffect, useState } from "react";
import { ChatMessage } from "../../rest/data/ChatMessage";
import { Match } from "../../rest/data/Match";
import ExpandButton from "../utils/ExpandButton";
import ChatAction from "./ChatActions";
import ChatMessageList from "./ChatMessageList";
import GroupIcon from '@mui/icons-material/Group';
import { fetchLiveCount } from "../../rest/api/ChatApi";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 5,
        top: 10,
        height: "16px",
        minWidth: "16px",
        padding: '0 0px',
    },
}));

export interface ChatDrawerProps {
    match: Match;
    onExpanded: (expanded: boolean) => void;
    expanded: boolean;
    messages: Array<ChatMessage>;
    badgeCounter: number;
    isEditor: boolean;
}

const ChatDrawer = ({ match, expanded, isEditor, messages, badgeCounter, onExpanded }: ChatDrawerProps) => {

    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('md'));
    const chatRef = createRef<HTMLUListElement>();

    const [liveCount, setLiveCount] = useState<number>(0);

    useEffect(() => {
        async function fetchLiveCountLocal(matchId: number) {
            let response = await fetchLiveCount(matchId);
            if (response.data != null) {
                // This client is connected, therefore the count should be 1.
                // It can occure that the count is 0 when the fetch call is executed before the websocket connection
                let count = response.data === 0 ? 1 : response.data;
                setLiveCount(count);
            }
        }
        fetchLiveCountLocal(match.id);

        const intervalId = setInterval(() => {
            fetchLiveCountLocal(match.id)
        }, 1000 * 30);
        return () => clearInterval(intervalId)
    }, [match.id]);

    useEffect(() => {
        if (chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages.length, chatRef]);

    return (
        <React.Fragment>
            <Paper sx={{ position: "fixed", cursor: "pointer", width: "100%", left: 0, right: 0, bottom: 0 }} elevation={5}>
                <Box sx={{ display: isBig || expanded ? "none" : "grid", width: "100%" }} onClick={() => onExpanded(!expanded)}>
                    <StyledBadge color="primary" badgeContent={badgeCounter} sx={{ gridRow: 1, gridColumn: 1, alignSelf: "center", justifySelf: "center" }}>
                        <ExpandButton expanded={!expanded} />
                    </StyledBadge>
                    <Badge sx={{ alignSelf: "center", justifySelf: "end", gridRow: 1, gridColumn: 1, mr: 2, opacity: 0.5 }} badgeContent={liveCount}>
                        <GroupIcon />
                    </Badge>
                </Box>
            </Paper>

            <Drawer
                anchor={isBig ? "right" : "bottom"}
                open={expanded}
                onClose={() => { }}
                variant={isBig ? "permanent" : "persistent"}
                PaperProps={{ sx: { transition: "height ease-in 0.1s", bottom: 0, height: { xs: "50vh", md: expanded ? "50vh" : "10vh" }, position: "fixed", top: "auto", width: { xs: "auto", md: "25em" }, right: 0, }, elevation: 5 }}
                ModalProps={{ keepMounted: true }}
            >

                <Box sx={{ display: "grid", width: "100%", cursor: "pointer" }} onClick={() => onExpanded(!expanded)}>
                    <Box sx={{ gridRow: 1, gridColumn: 1, alignSelf: "center", justifySelf: "center" }}>
                        <ExpandButton expanded={!expanded} />
                    </Box>
                    <Badge sx={{ alignSelf: "center", justifySelf: "end", gridRow: 1, gridColumn: 1, mr: 2, opacity: 0.5 }} badgeContent={liveCount}>
                        <GroupIcon />
                    </Badge>
                </Box>


                <ChatMessageList ref={chatRef} messages={messages} />
                <ChatAction matchId={match.id} onScrollEvent={onScrollEvent} isEditor={isEditor} />
            </Drawer>
        </React.Fragment >
    )
    function onScrollEvent() {
        if (isBig === false) {
            setTimeout(() => {
                if (chatRef.current)
                    chatRef.current.scrollTop = chatRef.current.scrollHeight
            }, 100);
        }
    }
}

export default React.memo(ChatDrawer);