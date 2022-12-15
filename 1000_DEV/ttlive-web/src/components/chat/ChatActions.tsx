import { AccountCircle } from "@mui/icons-material";
import { Divider, IconButton, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { postChatMessage } from "../../rest/api/ChatApi";
import { RequestChatMessage } from "../../rest/data/ChatMessage";
import ChatNameMenu from "./ChatNameMenu";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";


export interface ChatActionProps {
    matchId: number;
    onScrollEvent: () => void;
    isEditor: boolean;
    showAvatar?: boolean
}

const CHAT_USERNAME_SETTING = "chatUsername";

const ChatAction = ({ matchId, isEditor, onScrollEvent, showAvatar = true }: ChatActionProps) => {

    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));

    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    // anchor to attach the select name dialog
    const [menueAnchor, setMenueAnchor] = useState<HTMLElement | null>(null);


    const userRef = createRef<HTMLButtonElement>();
    const context = useContext(AppContext);

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
            text: inputValue,
            editor: isEditor
        };

        setLoading(true);
        let response = await postChatMessage(matchId, chatMessage)
        if (response.data != null) {
            setInputValue("");
            onScrollEvent();
        }
        setLoading(false)
    }, [context, inputValue, matchId, isEditor, onScrollEvent]);

    const keyHandler = useCallback((e: KeyboardEvent) => {
        if (e.code === "Enter" && !e.shiftKey) {
            if (userRef.current != null && isLoading === false) {
                onSend(userRef.current);
            }
        }
    }, [onSend, userRef, isLoading]);

    useEffect(() => {
        if (menueAnchor == null)
            document.addEventListener("keydown", keyHandler);

        return () => {
            document.removeEventListener("keydown", keyHandler);
        }
    }, [keyHandler, menueAnchor]);

    return (
        <React.Fragment>
            <Divider />
            <Stack direction="row" gap={1} p={1}>
                {/** TODO better validation for long strings (error Message)*/}
                <TextField
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value.substring(0, 200))}
                    size="small"
                    onClick={onScrollEvent}
                    autoComplete="off"
                    maxRows={isBig ? 3 : 2}
                    multiline
                    sx={{ minWidth: "unset", flexGrow: 1, }}
                    onKeyDown={onKeyDown}
                />

                <IconButton onClick={e => onSend(e.currentTarget)} size="small" sx={{ display: "grid" }}>
                    <Box alignSelf="center" gridRow={1} gridColumn={1}><SendIcon color="primary" sx={{ visibility: isLoading ? "hidden" : "visible", justifySelf: "center" }} /></Box>
                    <Box alignSelf="center" gridRow={1} gridColumn={1}><CircularProgress color="primary" sx={{ visibility: isLoading ? "visible" : "hidden" }} size={24} /></Box>
                </IconButton>
                <IconButton onClick={e => setMenueAnchor(e.currentTarget)} sx={{ display: showAvatar ? "inline" : "none" }} ref={userRef} size="small" >
                    <AccountCircle color="primary" />
                </IconButton>
                <ChatNameMenu anchor={menueAnchor} onClose={() => setMenueAnchor(null)} />
            </Stack>
        </React.Fragment >
    );

    function onKeyDown(e: React.KeyboardEvent) {
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
        }
    }

}

export default ChatAction;