import { execFile } from "child_process";
import { useEffect, useRef } from "react";
import { Game } from "../../rest/data/Game";
import { Match } from "../../rest/data/Match";
import { UpdateAction } from "../../rest/data/UpdateAction";
import { Config } from "./Config";

export interface WebHookUtilProps {
    match: Match;
    onGameUpdated: (game: Game) => void;
    onMatchUpdated: (match: Match) => void;
}


const WebHookUtil = ({ match, onGameUpdated, onMatchUpdated }: WebHookUtilProps) => {
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {

        function initWs() {
            ws.current = new WebSocket(`${Config.WS_URL}/${match?.id}`);
            const wsCurrent = ws.current
            ws.current.onopen = () => console.log("Attached to websocket");
            ws.current.onclose = () => {
                console.log("Detached from websocket");
            }
            ws.current.onerror = e => {
                console.log("Error from websocket. Try to create new connection: ");
                if (ws.current)
                    ws.current.close();

                setTimeout(() => ws.current = initWs(), 10000)
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
                    console.log(action.game)
                    onGameUpdated(action.game);
                }
            }
            return ws.current;
        }
        const wsCurrent = initWs();
        return () => {
            wsCurrent.close();
        }

    }, [match.id])

    return (<div></div>);
}

export default WebHookUtil;