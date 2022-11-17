import { AccountCircle } from "@mui/icons-material";
import { Box, Divider, Drawer, IconButton, List, ListItem, Paper, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../AppContext";
import { postChatMessage } from "../../rest/api/ChatApi";
import { ChatMessage, RequestChatMessage } from "../../rest/data/ChatMessage";
import { Match } from "../../rest/data/Match";
import ExpandButton from "../utils/ExpandButton";
import LoadingButton from "../utils/LoadingButton";
import ChatNameMenu from "./ChatNameMenu";

export interface ChatDrawerProps {
    match: Match;
    onExpanded: (expanded: boolean) => void;
    expanded: boolean;
    messages: Array<ChatMessage>;
}

const CHAT_USERNAME_SETTING = "chatUsername";

const ChatDrawer = ({ match, expanded, onExpanded, messages }: ChatDrawerProps) => {

    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));
    const chatRef = createRef<HTMLUListElement>();
    const userRef = createRef<HTMLButtonElement>();

    // anchor to attach the select name dialog
    const [menueAnchor, setMenueAnchor] = useState<HTMLElement | null>(null);

    const context = useContext(AppContext);
    const [t] = useTranslation();

    const onSend = useCallback(async (anchor: HTMLElement) => {
        if (inputValue.trim() === "") {
            return;
        }

        let username = context.getSetting(CHAT_USERNAME_SETTING);
        if (username == null || username === "") {
            setMenueAnchor(anchor);
            return;
        }

        let chatMessage: RequestChatMessage = {
            username: username,
            text: inputValue
        };

        setLoading(true);
        let response = await postChatMessage(match.id, chatMessage)
        if (response.data != null) {
            setInputValue("");
        }
        setLoading(false)
    }, [context, inputValue, match.id]);


    const keyHandler = useCallback((e: KeyboardEvent) => {
        if (e.code === "Enter" && userRef.current != null && isLoading === false) {
            onSend(userRef.current);
        }
    }, [onSend, userRef, isLoading]);

    useEffect(() => {
        if (expanded) {
            if (chatRef.current)
                chatRef.current.scrollTop = chatRef.current.scrollHeight;

            document.addEventListener("keydown", keyHandler);
        }

        return () => {
            document.removeEventListener("keydown", keyHandler);
        }
    }, [expanded, chatRef, keyHandler]);

    useEffect(() => {
        if (chatRef.current)
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages, chatRef]);

    useEffect(() => {
        if (menueAnchor != null)
            document.removeEventListener("keydown", keyHandler);
        else
            document.addEventListener("keydown", keyHandler);

        return () => document.removeEventListener("keydown", keyHandler)

    }, [menueAnchor, keyHandler]);

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
                PaperProps={{ sx: { bottom: 0, height: { xs: "50vh", sm: "70vh" }, position: "fixed", top: "auto", width: { xs: "auto", sm: "20vw" }, right: 0, }, elevation: 5 }}
                ModalProps={{ keepMounted: true }}

            >
                <Box sx={{ cursor: "pointer", width: "100%", display: { xs: "block", sm: "none" } }} onClick={() => onExpanded(!expanded)}>
                    <ExpandButton expanded={!expanded} />
                </Box>

                <List sx={{ overflow: "scroll" }} ref={chatRef}>
                    {messages.map((value, index) =>
                        <ListItem key={index} sx={{ overflowWrap: "anywhere", width: "100%" }}>
                            <Box>
                                <strong>{value.username}: </strong>
                                {value.text}
                            </Box>
                        </ListItem>
                    )}
                </List>
                <Divider />
                <Stack direction="row" gap={2} p={1}>
                    {/** TODO better validation for long strings (error Message)*/}
                    <TextField value={inputValue} onChange={e => setInputValue(e.target.value.substring(0, 200))} size="small" onClick={onTextFieldFocus} />

                    <LoadingButton loading={isLoading} onClick={e => onSend(e.currentTarget)} variant="outlined" size="small">
                        {t("ChatDrawer.send")}
                    </LoadingButton>
                    <ChatNameMenu anchor={menueAnchor} onClose={() => setMenueAnchor(null)} />
                    <IconButton onClick={e => setMenueAnchor(e.currentTarget)} sx={{}} ref={userRef} className="testtest">
                        <AccountCircle sx={{ color: "white" }} />
                    </IconButton>

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
}

export default ChatDrawer;