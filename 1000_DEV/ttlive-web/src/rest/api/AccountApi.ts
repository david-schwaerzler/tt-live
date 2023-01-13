import axios from "axios";
import { Account, LoginResponse, RequestAccount, RequestLogin } from "../data/Account";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type AccountResponse = ApiResponse<Account>;

export async function postAccount(requestAccount: RequestAccount): Promise<AccountResponse> {
    try {
        let response = await axios.post(`/login/register`, requestAccount);
        if (response.status !== 200) {
            console.log(`Error creating account from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data);

    } catch (error) {
        console.log(`Error creating account on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchIsUsernameTaken(username: string): Promise<ApiResponse<boolean>> {
    try {
        let response = await axios.get(`/login/isTaken?username=${username}`);
        if (response.status !== 200) {
            console.log(`Error fetching isUsernameTaken from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data)

    } catch (error) {
        console.log(`Error fetching isUsernameTaken from the Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function postLogin(requestLogin: RequestLogin) : Promise<ApiResponse<LoginResponse>>{
    try {
        let response = await axios.post(`/login`, requestLogin);
        if (response.status !== 200) {
            console.log(`Error requesting Login from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data);

    } catch (error) {
        console.log(`Error requesting login on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function putConnectMatch(matchId : number, editorCode: string) : Promise<AccountResponse>{
    try {
        let response = await axios.put(`/secured/account/match/${matchId}/connect?editorCode=${editorCode}`);
        if (response.status !== 200) {
            console.log(`Error connecting match to account on the server: ${response.status}`)
            return returnError(response.status.toString());
        }

        return returnData(response.data);

    } catch (error) {
        console.log(`Error requesting login on Server: ${error}`)
        return returnError(`${error}`);
    }
}