import { AccountCircle } from "@mui/icons-material";
import { Divider, IconButton, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { createRef, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../AppContext";
import { postChatMessage } from "../../rest/api/ChatApi";
import { RequestChatMessage } from "../../rest/data/ChatMessage";
import LoadingButton from "../utils/LoadingButton";
import ChatNameMenu from "./ChatNameMenu";

export interface ChatActionProps {
    matchId: number;
    onTextFieldFocused: () => void;
    isEditor: boolean;
}

const CHAT_USERNAME_SETTING = "chatUsername";

const ChatAction = ({ matchId, isEditor, onTextFieldFocused }: ChatActionProps) => {

    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));

    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    // anchor to attach the select name dialog
    const [menueAnchor, setMenueAnchor] = useState<HTMLElement | null>(null);


    const userRef = createRef<HTMLButtonElement>();
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
            text: inputValue,
            editor: isEditor
        };

        setLoading(true);
        let response = await postChatMessage(matchId, chatMessage)
        if (response.data != null) {
            setInputValue("");
        }
        setLoading(false)
    }, [context, inputValue, matchId, isEditor]);

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
            <Stack direction="row" gap={2} p={1}>
                {/** TODO better validation for long strings (error Message)*/}
                <TextField
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value.substring(0, 200))}
                    size="small"
                    onClick={onTextFieldFocused}
                    autoComplete="off"
                    maxRows={isBig ? 3 : 2}
                    multiline
                    sx={{ minWidth: "unset", flexGrow: 1, }}
                    onKeyDown={onKeyDown}
                />

                <LoadingButton loading={isLoading} onClick={e => onSend(e.currentTarget)} variant="outlined" size="small">
                    {t("ChatDrawer.send")}
                </LoadingButton>
                <ChatNameMenu anchor={menueAnchor} onClose={() => setMenueAnchor(null)} />
                <IconButton onClick={e => setMenueAnchor(e.currentTarget)} sx={{}} ref={userRef} className="testtest">
                    <AccountCircle sx={{ color: theme => theme.palette.primary.main }} />
                </IconButton>
            </Stack>
        </React.Fragment>
    );

    function onKeyDown(e: React.KeyboardEvent) {
        if (e.code === "Enter" && !e.shiftKey) {
            e.preventDefault();
        }
    }

}

export default ChatAction;