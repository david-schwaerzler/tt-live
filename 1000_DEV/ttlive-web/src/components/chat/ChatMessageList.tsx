import { List, ListItem, ListProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import { ChatMessage } from "../../rest/data/ChatMessage";

export interface ChatMessageListProps extends ListProps {
    messages: Array<ChatMessage>;
}

const CHAT_USERNAME_SETTING = "chatUsername";


const ChatMessageList = React.forwardRef<HTMLUListElement, ChatMessageListProps>(({ messages, ...rest }, ref) => {

    const [stateMessages, setStateMessages] = useState<Array<ChatMessage>>([]);
    const context = useContext(AppContext);

    let username = context.getSetting(CHAT_USERNAME_SETTING);

    useEffect(() => {
        let lastMessage: ChatMessage | null = null;
        let stateMessages = [];

        for (let message of messages) {

            if (lastMessage == null) {
                lastMessage = message;
                continue;
            }

            if (message.username === lastMessage.username) {
                lastMessage.text = lastMessage.text + "\n" + message.text;
            } else {
                let copy = { ...message };
                stateMessages.push(copy);
                lastMessage = copy;
            }
        }

        setStateMessages(stateMessages);

    }, [messages]);

    return (
        <List sx={{ overflowX: "hidden", overflowY: "scroll", flexGrow: 1, ...rest.sx }} ref={ref} >
            {stateMessages.map((value, index) =>
                <ListItem key={index} sx={{ overflowWrap: "anywhere", width: "100%", pb: 0.5, pt: 0.5 }}>
                    <Box width="100%">
                        <Typography sx={{ fontWeight: "bold", ...(value.editor && { color: theme => theme.palette.primary.main }), display: "inline", mr: "10px" , lineHeight: 1}} >
                            {value.username}:
                        </Typography>
                        <Typography sx={{ ...(username === value.username && { fontWeight: "bold" }), display: "inline", mr: "10px", lineHeight: 1 }} >{value.text}</Typography>
                    </Box>
                </ListItem>
            )
            }
        </List >
    )
});

export default ChatMessageList;