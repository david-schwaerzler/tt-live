import { List, ListItem, ListProps } from "@mui/material";
import { Box } from "@mui/system";
import React, { Ref } from "react";
import { ChatMessage } from "../../rest/data/ChatMessage";

export interface ChatMessageListProps extends ListProps {
    messages: Array<ChatMessage>;
}

const ChatMessageList = React.forwardRef<HTMLUListElement, ChatMessageListProps>(({ messages, ...rest }, ref) => {
    return (
        <List sx={{ overflowX: "hidden", overflowY: "scroll", flexGrow: 1, ...rest.sx }} ref={ref} >
            {messages.map((value, index) =>
                <ListItem key={index} sx={{ overflowWrap: "anywhere", width: "100%" }}>
                    <Box>
                        <strong>{value.username}: </strong>
                        {value.text}
                    </Box>
                </ListItem>
            )
            }
        </List >
    )
});

export default ChatMessageList;