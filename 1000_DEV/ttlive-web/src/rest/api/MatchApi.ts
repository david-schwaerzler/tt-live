import axios from "axios";
import { SimpleGame } from "../data/Game";
import { Match, RequestMatch, SimpleMatch, sortMatch, sortSimpleMatch } from "../data/Match";
import { RequestLineup } from "../data/RequestLineup";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

type MatchResponse = ApiResponse<Match>;
type MatchesReponse = ApiResponse<Array<Match>>;
export type SimpleMatchesReponse = ApiResponse<Array<SimpleMatch>>;
type SimpleGamesReponse = ApiResponse<Array<SimpleGame>>;

export async function postMatch(requestMatch: RequestMatch): Promise<MatchResponse> {
    try {
        let response = await axios.post(`/match`, requestMatch);

        if (response.status !== 200) {
            console.log(`Error creating match from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(sortMatch(response.data));

    } catch (error) {
        console.log(`Error creating match on Server: ${error}`)
        return returnError(`${error}`);
    }
}
export async function fetchMatches(): Promise<MatchesReponse> {
    try {
        let response = await axios.get(`/match`);
        if (response.status !== 200) {
            console.log(`Error fetching matches from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let matches: Array<Match> = response.data;
        matches.sort((a, b) => a.startDate === b.startDate ? 0 : a.startDate < b.startDate ? 1 : -1);
        matches = matches.map(m => sortMatch(m));
        return returnData(matches);

    } catch (error) {
        console.log(`Error fetching matches on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchSimpleMatches(): Promise<SimpleMatchesReponse> {
    try {
        let response = await axios.get(`/simple_match`);
        if (response.status !== 200) {
            console.log(`Error fetching simple matches from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let simpleMatches: Array<SimpleMatch> = response.data;
        simpleMatches.sort((a, b) => a.startDate === b.startDate ? 0 : a.startDate < b.startDate ? 1 : -1);
        simpleMatches = simpleMatches.map(m => sortSimpleMatch(m));
        return returnData(simpleMatches);

    } catch (error) {
        console.log(`Error fetching simple matches on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchSimpleMatchGames(matchId: number): Promise<SimpleGamesReponse> {
    try {
        let response = await axios.get(`/simple_match/${matchId}/games`);
        if (response.status !== 200) {
            console.log(`Error fetching games of simple match from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let simpleGames: Array<SimpleGame> = response.data;
        simpleGames.sort((a, b) => a.gameNumber - b.gameNumber);
        return returnData(simpleGames);

    } catch (error) {
        console.log(`Error fetching games of simple match on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchMatch(id: number): Promise<MatchResponse> {
    try {
        let response = await axios.get(`/match/${id}`);        
        return returnData(sortMatch(response.data));

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(`Error fetching match with id = ${id} from Server: ${error.response?.data}`)            
            return returnError(`Error fetching match with id = ${id} from Server:`, error.response?.status)
        }        
        return returnError(`Error fetching match with id = ${id} from Server: ${error}`);
    }

}

export async function fetchValidateErrorCode(id: number, editorCode: string) : Promise<ApiResponse<boolean>>{
    try {
        let response = await axios.get(`/match/${id}/validate?editorCode=${editorCode}`);
        if (response.status !== 200) {
            console.log(`Error checking editorCode for match with id=${id} from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let valid: { valid: boolean } = response.data;
        return returnData(valid.valid);

    } catch (error) {
        console.log(`Error checking editorCode for match with id=${id} from Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function putLineup(id: number, editorCode: string, requestLineup: RequestLineup): Promise<MatchResponse> {
    try {
        let response = await axios.put(`/match/${id}/lineup?editorCode=${editorCode}`, requestLineup);
        if (response.status !== 200) {
            console.log(`Error updating lineup on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(sortMatch(response.data));

    } catch (error) {
        console.log(`Error updating lineup on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function putMatch(id: number, requestMatch: RequestMatch, editorCode: string) {
    try {
        let response = await axios.put(`/match/${id}?editorCode=${editorCode}`, requestMatch);
        if (response.status !== 200) {
            console.log(`Error updating match from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(sortMatch(response.data));

    } catch (error) {
        console.log(`Error updating match on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function deleteMatch(id: number, editorCode: string) {
    try {
        let response = await axios.delete(`/match/${id}?editorCode=${editorCode}`);
        if (response.status !== 200) {
            console.log(`Error deleting match from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData({});

    } catch (error) {
        console.log(`Error deleting match on Server: ${error}`)
        return returnError(`${error}`);
    }
}