import { Badge, BadgeProps, Box, Drawer, Paper, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { createRef, useEffect } from "react";
import { ChatMessage } from "../../rest/data/ChatMessage";
import { Match } from "../../rest/data/Match";
import ExpandButton from "../utils/ExpandButton";
import ChatAction from "./ChatActions";
import ChatMessageList from "./ChatMessageList";

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

    useEffect(() => {
        if (chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages.length, chatRef]);

    return (
        <React.Fragment>
            <Paper sx={{ position: "fixed", cursor: "pointer", width: "100%", left: 0, right: 0, bottom: 0 }} elevation={5}>
                <Box sx={{ display: isBig || expanded ? "none" : "flex", justifyContent: "center" }} onClick={() => onExpanded(!expanded)}>
                    <StyledBadge color="primary" badgeContent={badgeCounter} >
                        <ExpandButton expanded={!expanded} />
                    </StyledBadge>
                </Box>
            </Paper>

            <Drawer
                anchor={isBig ? "right" : "bottom"}
                open={expanded}
                onClose={() => { }}
                variant={isBig ? "permanent" : "persistent"}
                PaperProps={{ sx: { transition: "height ease-in 0.1s", bottom: 0, height: { xs: "50vh", md: expanded ? "70vh" : "30vh" }, position: "fixed", top: "auto", width: { xs: "auto", md: "25em" }, right: 0, }, elevation: 5 }}
                ModalProps={{ keepMounted: true }}

            >
                <Box sx={{ cursor: "pointer", width: "100%", display: { xs: "block", md: "block" } }} onClick={() => onExpanded(!expanded)}>
                    <ExpandButton expanded={!expanded} />
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

export default ChatDrawer;