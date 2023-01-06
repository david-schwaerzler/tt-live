import { Box, Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postLogin } from "../../rest/api/AccountApi";
import { RequestLogin } from "../../rest/data/Account";
import ErrorMessage from "../utils/ErrorMessage";
import LoadingButton from "../utils/LoadingButton";
import { useSignIn } from 'react-auth-kit'

export interface LoginFormProps {

}

export enum LoginErrors {
    GENERAL,
    USERNAME,
    PASSWORD
};

const LoginForm = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const signIn = useSignIn();

    const navigate = useNavigate()
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

        if(username != null )
            setUsername(username);

        if(type != null && error != null){
            let errors = [];
            errors[parseInt(type)] = t(error);
            setErrorMsgs(errors);
        }
    }, [location.search, t])

    const onLogin = useCallback(async () => {
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
                                tokenType: "Bearer"
                            })) {
                            if (location.pathname.endsWith("/login")) {
                                navigate("/profile")
                            } else {
                                // No need to navigate. The login page has been called by the react auth kit.
                                // It has been tried to access a private Route.
                                // Afte login the react auth kit will handle the redirect
                            }
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
    }, [updateError, location.pathname, navigate, password, signIn, username, t]);


    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.code === "Enter") {
                event.preventDefault();
                onLogin();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [onLogin]);



    return (
        <Container>
            <Card sx={{ margin: "auto", maxWidth: "30em" }}>
                <CardContent>
                    <Box mt={3} display="flex" alignItems="center" justifyContent="center" width="100%">
                        <Stack direction="column" gap={2}  >
                            <ErrorMessage msg={errorMsgs[LoginErrors.GENERAL]} />
                            <TextField
                                label={t("LoginForm.username")}
                                variant="outlined"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                error={errorMsgs[LoginErrors.USERNAME] != null && errorMsgs[LoginErrors.USERNAME] !== ""}
                                helperText={errorMsgs[LoginErrors.USERNAME]}
                            />
                            <TextField
                                label={t("LoginForm.password")}
                                variant="outlined"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                error={errorMsgs[LoginErrors.PASSWORD] != null && errorMsgs[LoginErrors.PASSWORD] !== ""}
                                helperText={errorMsgs[LoginErrors.PASSWORD]}
                                type="password"
                            />
                            <Box >
                                <Box display="inline-block">
                                    <LoadingButton loading={isLoading} variant="outlined" onClick={onLogin}>{t("LoginForm.login")}</LoadingButton>
                                </Box>
                                <Link to="/register">
                                    <Button variant="outlined" sx={{ ml: 1 }}>
                                        {t("LoginForm.register")}
                                    </Button>
                                </Link>
                            </Box>
                        </Stack>
                    </Box>

                </CardContent>
            </Card>
        </Container>
    );


}

export default LoginForm;
