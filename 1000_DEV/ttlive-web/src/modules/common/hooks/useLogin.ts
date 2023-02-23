import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { t } from "i18next";
import { useCallback } from "react";
import { useSignIn } from "react-auth-kit";
import { postLogin } from "../../../rest/api/LoginApi";
import { RequestLogin, LoginResponse, Account } from "../../../rest/data/Account";

export enum LoginErrors {
    GENERAL,
    USERNAME,
    PASSWORD
};

export interface LoginState {
    error: LoginErrors | null;
    account: Account | null;
    errorMsg: string
}

export function useLogin() {

    const { trackEvent } = useMatomo();
    const signIn = useSignIn();

    const onLogin: (username: string, password: string) => Promise<LoginState> = useCallback(async (username: string, password: string) => {

        if (username === "")
            return { account: null, error: LoginErrors.USERNAME, errorMsg: t("LoginForm.errorUsernameEmpty") };


        if (password === "")
            return { account: null, error: LoginErrors.PASSWORD, errorMsg: t("LoginForm.errorPasswordEmpty") };

        let requestLogin: RequestLogin = {
            username: username,
            password: password
        };

        let response = await postLogin(requestLogin);

        if (response.data == null)
            return { account: null, error: LoginErrors.GENERAL, errorMsg: t("LoginForm.errorPost") };

        switch (response.data.status) {
            case "USERNAME_INVALID":
                return { account: null, error: LoginErrors.USERNAME, errorMsg: t("LoginForm.errorWrongUsername") };
            case "PASSWORD_INVALID":
                return { account: null, error: LoginErrors.PASSWORD, errorMsg: t("LoginForm.errorWrongPassword") };
            case "NOT_AUTHENTICATED":
                return { account: null, error: LoginErrors.GENERAL, errorMsg: t("LoginForm.errorNotAuthenticated") };
            case "SUCCESS":
                let data: LoginResponse = response.data;
                if (data.token == null) {
                    console.error(`Login success but no token was provided.`);
                    return { account: null, error: LoginErrors.GENERAL, errorMsg: t("LoginForm.errorPost") };
                } else {
                    if (signIn(
                        {
                            token: data.token,
                            expiresIn: data.tokenValidity / 60,
                            refreshToken: data.refreshToken,
                            refreshTokenExpireIn: data.refreshTokenValidity / 60,
                            tokenType: "Bearer",
                            authState: response.data.account
                        })) {
                        trackEvent({ category: "login", action: "login" });                      

                        return { account: response.data.account, error: null, errorMsg: "" };
                    } else {
                        console.error(`Error login in. Error from react auth kit`);
                        return { account: null, error: LoginErrors.GENERAL, errorMsg: t("LoginForm.errorPost") };
                    }
                }
            default:
                console.error(`Login returned unknown status. Status=${response.data.status}`);
                return { account: null, error: LoginErrors.GENERAL, errorMsg: t("LoginForm.errorPost") };
        }

    }, [signIn, trackEvent]);

    return onLogin;
}