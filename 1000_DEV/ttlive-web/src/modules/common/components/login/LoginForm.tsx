import { Box, Button, Stack, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Account} from "../../../../rest/data/Account";
import LoadingButton from "../buttons/LoadingButton";
import ErrorMessage from "../utils/ErrorMessage";
import { LoginErrors, useLogin } from "../../hooks/useLogin";

export interface LoginFormProps {
    showRegister?: boolean;
    onLogin: (account: Account) => void;
}


const LoginForm = ({ onLogin, showRegister = true }: LoginFormProps) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const location = useLocation();

    const [t] = useTranslation();
    const login = useLogin();

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
        setLoading(true);
        let status = await login(username, password);
        if (status.account != null) {
            onLogin(status.account);
        } else if (status.error != null) {
            errorMsgs[status.error] = status.errorMsg;
        }
        setLoading(false)
        setErrorMsgs(errorMsgs);
       
        setPassword("");
    }, [username, password, login, onLogin]);


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

        <Stack gap={2} alignItems="center">
            <ErrorMessage msg={errorMsgs[LoginErrors.GENERAL]} />
            <TextField
                label={t("LoginForm.username")}
                variant="outlined"
                value={username}
                onChange={e => setUsername(e.target.value)}
                error={errorMsgs[LoginErrors.USERNAME] != null && errorMsgs[LoginErrors.USERNAME] !== ""}
                helperText={errorMsgs[LoginErrors.USERNAME]}
                sx={{ maxWidth: "250px" }}
                autoComplete="off"
            />
            <TextField
                label={t("LoginForm.password")}
                variant="outlined"
                value={password}
                onChange={e => setPassword(e.target.value)}
                error={errorMsgs[LoginErrors.PASSWORD] != null && errorMsgs[LoginErrors.PASSWORD] !== ""}
                helperText={errorMsgs[LoginErrors.PASSWORD]}
                type="password"
                autoComplete="off"
                sx={{ maxWidth: "250px" }}
            />
            <Box width="100%">
                <Box display="inline-block">
                    <LoadingButton loading={isLoading} variant="outlined" onClick={onLoginCallback}>{t("LoginForm.login")}</LoadingButton>
                </Box>
                {showRegister &&
                    <Link to="/register" style={{ textDecoration: "none" }}>
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
