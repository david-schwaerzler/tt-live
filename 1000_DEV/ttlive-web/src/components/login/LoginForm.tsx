import { Box, Button, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { postLogin } from "../../rest/api/AccountApi";
import { Account, RequestLogin } from "../../rest/data/Account";
import ErrorMessage from "../utils/ErrorMessage";
import LoadingButton from "../utils/LoadingButton";
import { useSignIn } from 'react-auth-kit'

export interface LoginFormProps {
    showRegister?: boolean;
    onLogin: (account: Account) => void;
}

export enum LoginErrors {
    GENERAL,
    USERNAME,
    PASSWORD
};

const LoginForm = ({ onLogin, showRegister = true }: LoginFormProps) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const signIn = useSignIn();
    const location = useLocation();

    const [t] = useTranslation();

    const updateError = useCallback((errorMsgs: Array<string>, index: number, msg: string) => {
        let copy = [...errorMsgs];
        copy[index] = msg;
        setErrorMsgs(copy);
    }, [])

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let username = params.get("username");
        let type = params.get("type");
        let error = params.get("error");

        if (username != null)
            setUsername(username);

        if (type != null && error != null) {
            let errors = [];
            errors[parseInt(type)] = t(error);
            setErrorMsgs(errors);
        }
    }, [location.search, t])

    const onLoginCallback = useCallback(async () => {
        let errorMsgs: Array<string> = [];
        setErrorMsgs(errorMsgs);
        if (username === "") {
            updateError(errorMsgs, LoginErrors.USERNAME, t("LoginForm.errorUsernameEmpty"));
            return;
        }
        if (password === "") {
            updateError(errorMsgs, LoginErrors.PASSWORD, t("LoginForm.errorPasswordEmpty"));
            return;
        }

        let requestLogin: RequestLogin = {
            username: username,
            password: password
        };

        setLoading(true);
        let response = await postLogin(requestLogin);
        if (response.data != null) {
            switch (response.data.status) {
                case "USERNAME_INVALID":
                    updateError(errorMsgs, LoginErrors.USERNAME, t("LoginForm.errorWrongUsername"));
                    break;
                case "PASSWORD_INVALID":
                    updateError(errorMsgs, LoginErrors.PASSWORD, t("LoginForm.errorWrongPassword"));
                    break;
                case "NOT_AUTHENTICATED":
                    updateError(errorMsgs, LoginErrors.GENERAL, t("LoginForm.errorNotAuthenticated"));
                    break;
                case "SUCCESS":
                    if (response.data.token == null) {
                        console.error(`Login success but no token was provided.`);
                        updateError(errorMsgs, LoginErrors.GENERAL, t("LoginForm.errorPost"));
                    } else {
                        if (signIn(
                            {
                                token: response.data.token,
                                expiresIn: 1,
                                tokenType: "Bearer",
                                authState: response.data.account
                            })) {
                            onLogin(response.data.account);
                        } else {
                            console.error(`Error login in. Error from react auth kit`);
                            updateError(errorMsgs, LoginErrors.GENERAL, t("LoginForm.errorPost"));
                        }
                    }

                    break;
                default:
                    console.error(`Login returned unknown status. Status=${response.data.status}`);
                    updateError(errorMsgs, LoginErrors.GENERAL, t("LoginForm.errorPost"));
                    break;
            }
        } else {
            updateError(errorMsgs, LoginErrors.GENERAL, t("LoginForm.errorPost"));
        }
        setLoading(false);
        setPassword("");
    }, [updateError, password, signIn, username, t, onLogin]);


    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === "Enter") {
                event.preventDefault();
                onLoginCallback();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [onLoginCallback]);



    return (

        <Stack direction="column" gap={2}  >
            <ErrorMessage msg={errorMsgs[LoginErrors.GENERAL]} />
            <TextField
                label={t("LoginForm.username")}
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value)}
                error={errorMsgs[LoginErrors.USERNAME] != null && errorMsgs[LoginErrors.USERNAME] !== ""}
                helperText={errorMsgs[LoginErrors.USERNAME]}
                sx={{maxWidth: "250px"}}
            />
            <TextField
                label={t("LoginForm.password")}
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errorMsgs[LoginErrors.PASSWORD] != null && errorMsgs[LoginErrors.PASSWORD] !== ""}
                helperText={errorMsgs[LoginErrors.PASSWORD]}
                type="password"
                sx={{maxWidth: "250px"}}
            />
            <Box >
                <Box display="inline-block">
                    <LoadingButton loading={isLoading} variant="outlined" onClick={onLoginCallback}>{t("LoginForm.login")}</LoadingButton>
                </Box>
                {showRegister &&
                    <Link to="/register" style={{  textDecoration: "none"}}>
                        <Button variant="outlined" sx={{ ml: 1 }}>
                            {t("LoginForm.register")}
                        </Button>
                    </Link>
                }
            </Box>
        </Stack>

    );
}

export default LoginForm;
