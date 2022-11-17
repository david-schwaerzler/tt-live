import { Box, Divider, Drawer, IconButton, List, ListItem, Paper, styled, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import React, { createRef, MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchChatMessages, postChatMessage } from "../../rest/api/ChatApi";
import { ChatMessage, RequestChatMessage } from "../../rest/data/ChatMessage";
import { Match } from "../../rest/data/Match";
import ExpandButton from "../utils/ExpandButton";
import LoadingButton from "../utils/LoadingButton";

export interface ChatDrawerProps {
    match: Match;
    onExpanded: (expanded: boolean) => void;
    expanded: boolean;
    messages: Array<ChatMessage>;
}


const ChatDrawer = ({ match, expanded, onExpanded, messages }: ChatDrawerProps) => {

    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));
    const chatRef = createRef<HTMLUListElement>();


    const [t] = useTranslation();

    useEffect(() => {
        if (expanded && chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [expanded])

    useEffect(() => {
        if (chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages])


    return (
        <React.Fragment>
            <Paper sx={{ position: "fixed", cursor: "pointer", width: "100%", left: 0, right: 0, bottom: 0 }} elevation={5}>
                <Box sx={{ display: isBig || expanded ? "none" : "block" }} onClick={() => onExpanded(!expanded)}>
                    <ExpandButton expanded={!expanded} />
                </Box>
            </Paper>

            <Drawer
                anchor={isBig ? "right" : "bottom"}
                open={expanded}
                onClose={() => { }}
                variant={isBig ? "permanent" : "persistent"}
                PaperProps={{ sx: { bottom: 0, height: { xs: "50vh", sm: "70vh" }, position: "fixed", top: "auto", width: "20vw", right: 0,  }, elevation: 5 }}
                ModalProps={{ keepMounted: true }}

            >
                <Box sx={{ cursor: "pointer", width: "100%", display: { xs: "block", sm: "none" } }} onClick={() => onExpanded(!expanded)}>
                    <ExpandButton expanded={!expanded} />
                </Box>

                <List sx={{ overflow: "scroll" }} ref={chatRef}>
                    {messages.map((value, index) =>
                        <ListItem key={index} sx={{ overflowWrap: "break-word", width: "100%" }}>
                            <Box>
                                <strong>{value.username}: </strong>
                                {value.text}
                            </Box>
                        </ListItem>
                    )}
                </List>
                <Divider />
                <Stack direction="row" gap={2} p={1}>
                    <TextField value={inputValue} onChange={e => setInputValue(e.target.value)} size="small"
                        onClick={onTextFieldFocus}
                    />

                    <LoadingButton loading={isLoading} onClick={onSend} variant="outlined" size="small">
                        {t("ChatDrawer.send")}
                    </LoadingButton>

                </Stack>
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

    async function onSend() {
        if (inputValue.trim() === "") {
            return;
        }

        let chatMessage: RequestChatMessage = {
            username: "test123",
            text: inputValue
        };

        setLoading(true);
        let response = await postChatMessage(match.id, chatMessage)
        if (response.data != null) {
            setInputValue("");
        }
        setLoading(false)
    }
}

export default ChatDrawer;