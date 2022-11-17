import { Config } from "../../components/utils/Config";
import { Match, RequestMatch, sortMatch } from "../data/Match";
import { RequestLineup } from "../data/RequestLineup";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

type MatchResponse = ApiResponse<Match>;
type MatchesReponse = ApiResponse<Array<Match>>;

export async function postMatch(requestMatch: RequestMatch): Promise<MatchResponse> {
    try {
        let response = await fetch(`${Config.REST_URL}/match`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestMatch)
        });
        if (!response.ok) {
            console.log(`Error creating match from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let match: Match = await response.json();
        return returnData(sortMatch(match));

    } catch (error) {
        console.log(`Error creating match on Server: ${error}`)
        return returnError(`${error}`);
    }
}
export async function fetchMatches(): Promise<MatchesReponse> {
    try {
        let response = await fetch(`${Config.REST_URL}/match`);
        if (!response.ok) {
            console.log(`Error fetching matches from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let matches: Array<Match> = await response.json();
        matches = matches.map(m => sortMatch(m));
        return returnData(matches);

    } catch (error) {
        console.log(`Error fetching matches on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchMatch(id: number): Promise<MatchResponse> {
    try {
        let response = await fetch(`${Config.REST_URL}/match/${id}`);
        if (!response.ok) {
            console.log(`Error fetching match with id = ${id} from the Server: ${response.status} `)
            return returnError(response.status.toString());
        }

        let match: Match = await response.json();

        return returnData(sortMatch(match));

    } catch (error) {
        console.log(`Error fetching match with id = ${id} from Server: ${error} `)
        return returnError(`${error} `);
    }

}

export async function fetchValidateErrorCode(id: number, editorCode: string) {
    try {
        let response = await fetch(`${Config.REST_URL}/match/${id}/validate?editorCode=${editorCode}`);
        if (!response.ok) {
            console.log(`Error checking editorCode for match with id=${id} from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let valid: { valid: boolean } = await response.json();
        return returnData(valid.valid);

    } catch (error) {
        console.log(`Error checking editorCode for match with id=${id} from Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function putLineup(id: number, editorCode: string, requestLineup: RequestLineup): Promise<MatchResponse> {
    try {
        let response = await fetch(`${Config.REST_URL}/match/${id}/lineup?editorCode=${editorCode}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestLineup)
        });
        if (!response.ok) {
            console.log(`Error updating lineup on the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let match: Match = await response.json();       
        return returnData(sortMatch(match));

    } catch (error) {
        console.log(`Error updating lineup on Server: ${error}`)
        return returnError(`${error}`);
    }
}
