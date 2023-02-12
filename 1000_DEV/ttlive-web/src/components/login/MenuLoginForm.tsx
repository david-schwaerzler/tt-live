import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { Button, styled, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../rest/api/LoginApi";
import { LoginResponse, RequestLogin } from "../../rest/data/Account";
import LoadingButton from "../utils/LoadingButton";
import { LoginErrors } from "./LoginForm";

export interface MenuLoginFormProps {
    isBig: boolean
}

const MenuLoginFormDesktop = React.lazy(() => import("./MenuLoginFormDesktop"));
const MenuLoginFormMobile = React.lazy(() => import("./MenuLoginFormMobile"));


const MenuLoginForm = ({ isBig }: MenuLoginFormProps) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const signIn = useSignIn();
    const { trackEvent } = useMatomo();

    const onLogin = useCallback(async () => {

        const redirectError = (type: LoginErrors, error: string) => navigate(`/login?error=${error}&username=${username}&type=${type}`);

        if (username === "") {
            redirectError(LoginErrors.USERNAME, "LoginForm.errorUsernameEmpty");
            setPassword("");
            return;
        }
        if (password === "") {
            redirectError(LoginErrors.PASSWORD, "LoginForm.errorPasswordEmpty");
            setPassword("");
            return;
        }

        let requestLogin: RequestLogin = {
            username: username,
            password: password
        };

        let response = await postLogin(requestLogin);
        if (response.data != null) {
            switch (response.data.status) {
                case "USERNAME_INVALID":
                    redirectError(LoginErrors.USERNAME, "LoginForm.errorWrongUsername");
                    break;
                case "PASSWORD_INVALID":
                    redirectError(LoginErrors.GENERAL, "LoginForm.errorNotAuthenticated");
                    break;
                case "SUCCESS":
                    let data: LoginResponse = response.data
                    if (data.token == null) {
                        console.error(`Login success but no token was provided.`);
                        redirectError(LoginErrors.GENERAL, "LoginForm.errorPost");
                    } else {
                        if (signIn(
                            {
                                token: data.token,
                                expiresIn: data.tokenValidity / 60,
                                refreshToken: data.refreshToken,
                                refreshTokenExpireIn: data.refreshTokenValidity / 60,
                                tokenType: "Bearer",
                                authState: response.data.account
                            }) === false) {
                            console.error(`Error login in. Error from react auth kit`);
                            redirectError(LoginErrors.GENERAL, "LoginForm.errorPost");
                        }
                        trackEvent({ category: "login", action: "login" })
                    }
                    break;
                default:
                    console.error(`Login returned unknown status. Status=${response.data.status}`);
                    redirectError(LoginErrors.GENERAL, "LoginForm.errorPost");
                    break;
            }
        } else {
            redirectError(LoginErrors.GENERAL, "LoginForm.errorPost");
        }
        setPassword("");
    }, [navigate, password, signIn, username, trackEvent]);


    return isBig
        ? <MenuLoginFormDesktop
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onLogin={onLogin} />
        : <MenuLoginFormMobile
            username={username}
            password={password}
            onUsernameChange={setUsername}
            onPasswordChange={setPassword}
            onLogin={onLogin} />


}


export const WhiteTextField = styled(TextField)({

    "& .MuiFormLabel-root": {
        color: "white",
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "white",
    },
    "& label.Mui-focused": {
        color: "white",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "white",
        },
        "&.Mui-focused fieldset": {
            borderColor: "white",
        },
    },
});


export const WhiteButton = styled(Button)({
    color: "white",
    borderColor: "white",
    "&:hover": {
        borderColor: "white"
    }
});

export const WhiteLoadingButton = styled(LoadingButton)({
    color: "white",
    borderColor: "white",
    "&:hover": {
        borderColor: "white"
    }
});


export default React.memo(MenuLoginForm);