import { useEffect, useRef } from "react";
import { ChatMessage } from "../../../rest/data/ChatMessage";
import { Game } from "../../../rest/data/Game";
import { Match } from "../../../rest/data/Match";
import { UpdateAction } from "../../../rest/data/UpdateAction";
import { Config } from "../utils/Config";


// how often the socket is checked (in seconds)
const RETRY_TIMOUT = 10;

export function useWebHookUtil(
    match: Match | null,
    onGameUpdated: (game: Game) => void,
    onMatchUpdated: (match: Match) => void,
    onAddChatMessage: (message: ChatMessage) => void) {

    const ws = useRef<WebSocket | null>(null);



    useEffect(() => {
        function initWs() {
            ws.current = new WebSocket(`${Config.WS_URL}/${match?.id}`);

            ws.current.onopen = () => console.log("Attached to websocket");
            ws.current.onclose = () => {
                console.log("Detached from websocket");
            }
            ws.current.onerror = e => {
                console.log("Error from websocket. Try to create new connection: ");
            }
            ws.current.onmessage = (event: MessageEvent<any>) => {
                let action: UpdateAction = JSON.parse(event.data);
                if (action.action === "MATCH") {
                    if (action.match == null) {
                        console.error("Received websocket event for update match but no match was provided")
                        return;
                    }
                    onMatchUpdated(action.match);
                } else if (action.action === "GAME") {
                    if (action.game == null) {
                        console.error("Received websocket event for update game but no game was provided")
                        return;
                    }
                    onGameUpdated(action.game);
                } else if (action.action === "CHAT") {
                    if (action.chat == null) {
                        console.error("Received websocket event for update chat but no chat was provided")
                        return;
                    }
                    onAddChatMessage(action.chat);
                }
            }

            return ws.current;
        }

        if (match?.id == null)
            return;

        let wsCurrent = initWs();

        const intevalId = setInterval(() => {
            if (wsCurrent.readyState === WebSocket.CLOSED)
                wsCurrent = initWs();
        }, RETRY_TIMOUT * 1000);
        return () => {
            wsCurrent.close();
            clearInterval(intevalId);
        }

    }, [match?.id, onMatchUpdated, onGameUpdated, onAddChatMessage])


}