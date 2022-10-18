import { Config } from "../../components/utils/Config";
import { Match, RequestMatch } from "../data/Match";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

type MatchResponse = ApiResponse<Match>;
type MatchesReponse = ApiResponse<Array<Match>>;

export async function postMatch(requestMatch: RequestMatch) : Promise<MatchResponse>{
    try {
        let response = await fetch(Config.REST_URL + "/match", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestMatch)
        });
        if (!response.ok) {
            console.log(`Error creating match on Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let match : Match = await response.json();
        return returnData(match);

    } catch (error) {
        console.log(`Error creating match on Server: ${error}`)
        return returnError(`${error}`);
    }
}



export async function fetchMatches() : Promise<MatchesReponse>{
    try {
        let response = await fetch(Config.REST_URL + "/match");
        if (!response.ok) {
            console.log(`Error fetching matches on Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let match : Array<Match> = await response.json();
        return returnData(match);

    } catch (error) {
        console.log(`Error fetching matches on Server: ${error}`)
        return returnError(`${error}`);
    }

}

