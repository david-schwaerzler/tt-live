import axios from "axios";
import { ChatMessage, LiveCount, RequestChatMessage, sortChatMessages } from "../data/ChatMessage";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type ChatMessageResponse = ApiResponse<ChatMessage>;
export type ChatMessagesResponse = ApiResponse<Array<ChatMessage>>;
export type LiveCountResponse = ApiResponse<number>;


export async function postChatMessage(matchId: number, requestMessage: RequestChatMessage) : Promise<ChatMessageResponse>{

    try {
        let response = await axios.post(`/chat/${matchId}`, requestMessage);
        if (response.status !== 200) {
            console.log(`Error creating chatMessage from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data);

    } catch (error) {
        console.log(`Error creating chatMessage on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchChatMessages(matchId: number): Promise<ChatMessagesResponse> {
    try {
        let response = await axios.get(`/chat/${matchId}`);
        if (response.status !== 200) {
            console.log(`Error fetching chatMessages from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        sortChatMessages(response.data)
        return returnData(response.data);

    } catch (error) {
        console.log(`Error fetching chatMessages on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchLiveCount(matchId: number) : Promise<LiveCountResponse>{
    try {
        let response = await axios.get(`/chat/${matchId}/livecount`);
        if (response.status !== 200) {
            console.log(`Error fetching liveCount from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let liveCount : LiveCount = response.data;
        return returnData(liveCount.count);

    } catch (error) {
        console.log(`Error fetching liveCount on Server: ${error}`)
        return returnError(`${error}`);
    }
}