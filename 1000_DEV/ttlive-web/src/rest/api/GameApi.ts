import { Config } from "../../components/utils/Config";
import { Game } from "../data/Game";
import { RequestGameSet } from "../data/RequestGameSet";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

type GameResponse = ApiResponse<Game>;

export async function putGameSet(id: number, editorCode: string, requestLineup: RequestGameSet): Promise<GameResponse> {
    try {
        let response = await fetch(`${Config.REST_URL}/game/${id}/set?editorCode=${editorCode}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestLineup)
        });
        if (!response.ok) {
            console.log(`Error updating GameSet on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let game: Game = await response.json();
        return returnData(sortGame(game));

    } catch (error) {
        console.log(`Error updating GameSet on Server: ${error}`)
        return returnError(`${error}`);
    }
}

function sortGame(game: Game) {
    game.sets.sort((a, b) => a.number - b.number);
    return game;
}