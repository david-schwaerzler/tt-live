import { Badge, BadgeProps, Box, Drawer, List, ListItem, Paper, styled, useMediaQuery, useTheme } from "@mui/material";
import React, { createRef, useEffect } from "react";
import { ChatMessage } from "../../rest/data/ChatMessage";
import { Match } from "../../rest/data/Match";
import ExpandButton from "../utils/ExpandButton";
import ChatAction from "./ChatActions";

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
}

const ChatDrawer = ({ match, expanded, onExpanded, messages, badgeCounter }: ChatDrawerProps) => {

    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));
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
                PaperProps={{ sx: { bottom: 0, height: { xs: "50vh", sm: "70vh" }, position: "fixed", top: "auto", width: { xs: "auto", sm: "20vw" }, right: 0, }, elevation: 5 }}
                ModalProps={{ keepMounted: true }}

            >
                <Box sx={{ cursor: "pointer", width: "100%", display: { xs: "block", sm: "none" } }} onClick={() => onExpanded(!expanded)}>
                    <ExpandButton expanded={!expanded} />
                </Box>

                <List sx={{ overflow: "scroll", flexGrow: 1 }} ref={chatRef}>
                    {messages.map((value, index) =>
                        <ListItem key={index} sx={{ overflowWrap: "anywhere", width: "100%" }}>
                            <Box>
                                <strong>{value.username}: </strong>
                                {value.text}
                            </Box>
                        </ListItem>
                    )}
                </List>
                <ChatAction matchId={match.id} onTextFieldFocused={onTextFieldFocus} />
            </Drawer>
        </React.Fragment >
    )
    function onTextFieldFocus() {
        if (isBig === false) {
            setTimeout(() => {
                if (chatRef.current)
                    chatRef.current.scrollTop = chatRef.current.scrollHeight
            }, 100);
        }
    }
}

export default ChatDrawer;