import axios from "axios";
import { Account, RequestAccount } from "../data/Account";
import { ApiResponse, returnData, returnError } from "./ApiResponse";
import { SimpleMatchesReponse } from "./MatchApi";

export type AccountResponse = ApiResponse<Account>;

export async function postAccount(requestAccount: RequestAccount): Promise<AccountResponse> {
    try {
        let response = await axios.post(`/login/register`, requestAccount);
        return returnData(response.data);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Error creating account on Server:`, error.response?.data)
            return returnError(`${error.message}`, error.response?.status);
        }
        return returnError(`Error creating account on Server: ${error}`, - 1);
    }
}

export async function fetchIsUsernameTaken(username: string): Promise<ApiResponse<boolean>> {
    try {
        let response = await axios.get(`/login/isTaken?username=${username}`);
        return returnData(response.data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Error fetching isUsernameTaken from the Server:`, error.response?.data)
            return returnError(`${error}`, error.response?.status);
        }
        return returnError(`Error fetching isUsernameTaken from the Server: ${error}`, -1);
    }
}

export async function fetchAccountMatches(fields?: Array<string>): Promise<SimpleMatchesReponse> {
    try {
        let params = "";
        if (fields != null)
            params = "?fields=" + fields.join(",");


        let response = await axios.get(`/secured/account/match${params}`);

        return returnData(response.data)

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Error fetching account match from the Server:', error.response?.data)
            return returnError(`${error.message}`, error.response?.status);
        }
        return returnError(`Error fetching account match from the Server: ${error}`, -1);
    }
}

export async function putConnectMatch(matchId: number, editorCode: string): Promise<AccountResponse> {
    try {
        let response = await axios.put(`/secured/account/match/${matchId}/connect?editorCode=${editorCode}`);
        return returnData(response.data);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Error connecting match to account on the server', error.response?.data)
            return returnError(`${error.message}`, error.response?.status);
        }
        return returnError(`Error connecting match to account on the server: ${error}`, -1);

    }
}

export async function fetchEditorCodes(): Promise<ApiResponse<Array<{ matchId: number, editorCode: string }>>> {
    try {
        let response = await axios.get(`/secured/account/editorCode`);
        return returnData(response.data)

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Error fetching editor codes from the Server:`, error.response?.data)
            return returnError(`${error.message}`, error.status);
        }
        return returnError(`Error fetching editor codes from the Server: ${error}`, -1);
    }
}