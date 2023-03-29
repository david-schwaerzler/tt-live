import axios from "axios";
import { createRefresh } from "react-auth-kit";
import { Config } from "../../modules/common/utils/Config";
import { LoginResponse, RequestLogin, RequestRefreshToken } from "../data/Account";
import { ApiResponse, returnData, returnError } from "./ApiResponse";

export type LoginResponseResponse = ApiResponse<LoginResponse>;


export async function postLogin(requestLogin: RequestLogin): Promise<LoginResponseResponse> {
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

export const tokenRefreshApi = createRefresh({
    interval: Config.TOKEN_REFRESH_INTERVAL,
    refreshApiCallback: ({ authToken,
        authTokenExpireAt,
        refreshToken,
        refreshTokenExpiresAt,
        authUserState }) => {        
        let requestData: RequestRefreshToken = { refreshToken: refreshToken == null ? "" : refreshToken };
        return axios.put("/login", requestData)
            .then(response => {
                if (response.status !== 200)
                    return { isSuccess: false, newAuthToken: "" };
                else {
                    let data: LoginResponse = response.data;
                    if (data.token == null) {
                        console.error("Server response error. Server returned no token after requesting a refresh")
                        return { isSuccess: false, newAuthToken: "" };
                    }
                    return {
                        isSuccess: true,
                        newAuthToken: data.token,
                        newAuthTokenExpireIn: data.tokenValidity / 60,
                        newAuthUserState: data.account
                    };
                }
            }).catch(e => {
                console.error("Error refreshing token: " + e);
                return { isSuccess: false, newAuthToken: "" }
            })

    }
});