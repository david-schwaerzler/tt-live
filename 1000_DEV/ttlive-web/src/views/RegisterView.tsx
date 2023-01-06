import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoadingButton from "../components/utils/LoadingButton";
import { fetchIsUsernameTaken, postAccount } from "../rest/api/AccountApi";
import { RequestAccount } from "../rest/data/Account";

export interface RegisterViewProps {

}

enum Errors {
    GENERAL,
    USERNAME,
    PASSWORD,
    EMAIL
}

const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const RegisterView = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [errorMsgs, setErrorMsg] = useState<Array<string>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isRegistered, setRegistered] = useState<boolean>(false);
    const [t] = useTranslation();

    const updateError = useCallback((errorMsgs: Array<string>, index: number, msg: string) => {
        let copy = [...errorMsgs];
        copy[index] = msg;
        setErrorMsg(copy);
    }, []);
    return (
        <Card sx={{ margin: "auto", maxWidth: "30em" }}>
            {isRegistered ? successView() : registerForm()}
        </Card>
    );

    function successView() {
        return (
            <CardContent>
                <Typography>{t("RegisterView.registeredTitle")}</Typography>
                <Typography mt={1}>{t("RegisterView.registeredText")}</Typography>
                <Link to="/login" >
                    <Button variant="outlined" sx={{ mt: 2 }}>
                        {t("RegisterView.toLogin")}
                    </Button>
                </Link>
            </CardContent>
        );
    }

    function registerForm() {
        return (
            <CardContent>
                <Typography variant="h6" textAlign="center">{t("RegisterView.title")}</Typography>
                <Box mt={3} display="flex" alignItems="center" justifyContent="center" width="100%">
                    <Stack direction="column" gap={2} >
                        <TextField
                            variant="outlined"
                            label={t("RegisterView.username")}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            error={errorMsgs[Errors.USERNAME] != null && errorMsgs[Errors.USERNAME] !== ""}
                            helperText={errorMsgs[Errors.USERNAME]}                            
                        />
                        <TextField
                            variant="outlined"
                            label={t("RegisterView.password")}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            error={errorMsgs[Errors.PASSWORD] != null && errorMsgs[Errors.PASSWORD] !== ""}
                            helperText={errorMsgs[Errors.PASSWORD]}
                            type="password"
                        />
                        <TextField
                            variant="outlined"
                            label={t("RegisterView.passwordConfirm")}
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                            error={errorMsgs[Errors.PASSWORD] != null && errorMsgs[Errors.PASSWORD] !== ""}
                            helperText={errorMsgs[Errors.PASSWORD]}
                            type="password"
                            
                        />
                        <TextField
                            variant="outlined"
                            label={t("RegisterView.email")}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            error={errorMsgs[Errors.EMAIL] != null && errorMsgs[Errors.EMAIL] !== ""}
                            helperText={errorMsgs[Errors.EMAIL]}
                        />
                        <Box display="inline">
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                onClick={onRegister}                               
                            >
                                {t("RegisterView.register")}
                            </LoadingButton>
                        </Box>

                    </Stack>
                </Box>

            </CardContent>
        );
    }

    async function onRegister() {
        let errorMsgs: Array<string> = [];
        setErrorMsg([]);

        if (username === "") {
            updateError(errorMsgs, Errors.USERNAME, t("RegisterView.errorUsernameEmpty"));
            return;
        }
        const isTaken = await fetchIsUsernameTaken(username);
        if (isTaken.data == null) {
            updateError(errorMsgs, Errors.GENERAL, t("RegisterView.errorPost"));
            return;
        }
        if (isTaken.data === true) {
            updateError(errorMsgs, Errors.USERNAME, t("RegisterView.errorUernameTaken"));
            return;
        }

        if (password === "" || passwordConfirm === "") {
            updateError(errorMsgs, Errors.PASSWORD, t("RegisterView.errorPasswordsEmpty"));
            return;
        }

        if (password !== passwordConfirm) {
            updateError(errorMsgs, Errors.PASSWORD, t("RegisterView.errorPasswordNotEqual"));
            return;
        }

        if (email === "") {
            updateError(errorMsgs, Errors.EMAIL, t("RegisterView.errorEmailEmpty"));
            return;
        }

        if (EMAIL_REGEX.test(String(email).toLowerCase()) === false) {
            updateError(errorMsgs, Errors.EMAIL, t("RegisterView.errorEmailValidation"));
            return;
        }


        let requestAccount: RequestAccount = {
            username: username,
            password: password,
            email: email
        };

        setLoading(true)
        let response = await postAccount(requestAccount);
        if (response.data != null) {
            setRegistered(true);
        } else {
            updateError(errorMsgs, Errors.GENERAL, t("RegisterView.errorPost"));
        }
        setLoading(false);
    }
}

export default RegisterView;