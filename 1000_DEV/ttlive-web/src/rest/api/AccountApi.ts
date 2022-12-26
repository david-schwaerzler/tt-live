import { Config } from "../../components/utils/Config";
import { Account, RequestAccount } from "../data/Account";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type AccountResponse = ApiResponse<Account>;

export async function postAccount(requestAccount: RequestAccount): Promise<AccountResponse> {
    try {
        let response = await fetch(`${Config.REST_URL}/login/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestAccount)
        });
        if (!response.ok) {
            console.log(`Error creating account from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let account: Account = await response.json();
        return returnData(account);

    } catch (error) {
        console.log(`Error creating conact on Server: ${error}`)
        return returnError(`${error}`);
    }
}

export async function fetchIsUsernameTaken(username: string): Promise<ApiResponse<boolean>> {
    try {
        let response = await fetch(`${Config.REST_URL}/login/isTaken?username=${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            console.log(`Error fetching isUsernameTaken from the Server: ${response.status}`)
            return returnError(response.status.toString());
        }

        let isTaken: boolean = await response.json();
        return returnData(isTaken)

    } catch (error) {
        console.log(`Error fetching isUsernameTaken from the Server: ${error}`)
        return returnError(`${error}`);
    }
}