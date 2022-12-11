import { Config } from "../../components/utils/Config";
import { ChatMessage, LiveCount, RequestChatMessage, sortChatMessages } from "../data/ChatMessage";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type ChatMessageResponse = ApiResponse<ChatMessage>;
export type ChatMessagesResponse = ApiResponse<Array<ChatMessage>>;
export type LiveCountResponse = ApiResponse<number>;


export async function postChatMessage(matchId: number, requestMessage: RequestChatMessage) : Promise<ChatMessageResponse>{

    try {
        let response = await fetch(`${Config.REST_URL}/chat/${matchId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestMessage)
        });
        if (!response.ok) {
            console.log(`Error creating chatMessage from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let message: ChatMessage = await response.json();
        return returnData(message);

    } catch (error) {
        console.log(`Error creating chatMessage on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchChatMessages(matchId: number): Promise<ChatMessagesResponse> {
    try {
        let response = await fetch(`${Config.REST_URL}/chat/${matchId}`);
        if (!response.ok) {
            console.log(`Error fetching chatMessages from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let messages: Array<ChatMessage> = await response.json();
        sortChatMessages(messages)
        return returnData(messages);

    } catch (error) {
        console.log(`Error fetching chatMessages on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchLiveCount(matchId: number) : Promise<LiveCountResponse>{
    try {
        let response = await fetch(`${Config.REST_URL}/chat/${matchId}/livecount`);
        if (!response.ok) {
            console.log(`Error fetching liveCount from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let liveCount : LiveCount = await response.json();
        return returnData(liveCount.count);

    } catch (error) {
        console.log(`Error fetching liveCount on Server: ${error}`)
        return returnError(`${error}`);
    }
}