import axios from "axios";
import { Game } from "../data/Game";
import { RequestGameSet } from "../data/RequestGameSet";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

type GameResponse = ApiResponse<Game>;

export async function putGameSet(id: number, editorCode: string, requestLineup: RequestGameSet): Promise<GameResponse> {
    try {
        let response = await axios.put(`/game/${id}/set?editorCode=${editorCode}`, requestLineup);
        if (response.status !== 200) {
            console.log(`Error updating GameSet on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(sortGame(response.data));

    } catch (error) {
        console.log(`Error updating GameSet on Server: ${error}`)
        return returnError(`${error}`);
    }
}

function sortGame(game: Game) {
    game.sets.sort((a, b) => a.number - b.number);
    return game;
}