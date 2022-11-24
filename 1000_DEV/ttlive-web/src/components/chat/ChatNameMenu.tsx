import { Button, Menu, Stack, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../AppContext";

export interface ChatNameMenuProps {
    anchor: HTMLElement | null;
    onClose: () => void;
}

const CHAT_USERNAME_SETTING = "chatUsername";

const ChatNameMenu = ({ onClose, anchor }: ChatNameMenuProps) => {
    const context = useContext(AppContext);

    const [username, setUsername] = useState<string>(() => {
        let username = context.getSetting(CHAT_USERNAME_SETTING);
        if (username == null)
            return "";
        return username;
    })

    const onSave = useCallback(() => {
        if (username === "")
            return;
        context.setSetting(CHAT_USERNAME_SETTING, username, true);
        onClose();

    }, [onClose, context, username]);



    useEffect(() => {
        function keyHandler(e: KeyboardEvent) {
            if (e.code === "Enter")
                setTimeout(() => onSave(), 1);
        }
        if (anchor != null) {
            document.addEventListener("keyup", keyHandler)
        } else {
            let username = context.getSetting(CHAT_USERNAME_SETTING);
            if (username != null)
                setUsername(username)
        }
        return () => {
            document.removeEventListener("keyup", keyHandler)
        }
    }, [anchor, context, onSave])

    const [t] = useTranslation();
    return <Menu
        id="name-select"
        anchorEl={anchor}
        anchorOrigin={{
            vertical: "top",
            horizontal: "left",
        }}

        transformOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        open={anchor != null}

        onClose={onClose}>
        <Stack direction="row" sx={{ paddingTop: 1, paddingLeft: 1, paddingRight: 1 }} spacing={1}>
            {/** TODO better validation for long strings (error Message)*/}
            <TextField
                size="small"
                label={t("ChatDrawer.username")}
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value.substring(0, 60))}
                autoFocus
            />
            <Button variant="outlined" size="small" onClick={onSave} >{t("ChatDrawer.save")}</Button>
        </Stack>
    </Menu>

}

export default ChatNameMenu;