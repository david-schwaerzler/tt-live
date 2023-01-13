import styled from "@emotion/styled";
import { AccountCircle } from "@mui/icons-material";
import { Button, IconButton, Menu, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { useIsAuthenticated, useSignIn, useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../rest/api/AccountApi";
import { RequestLogin } from "../../rest/data/Account";
import LoadingButton from "../utils/LoadingButton";
import { spacingNormal } from "../utils/StyleVars";
import { LoginErrors } from "./LoginForm";

export interface MenuLoginFormProps {
    /* Resposive padding for the Toolbar */
    padding: any
}

const WhiteTextField = styled(TextField)({

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


const WhiteButton = styled(Button)({
    color: "white",
    borderColor: "white",
    "&:hover": {
        borderColor: "white"
    }
});

const WhiteLoadingButton = styled(LoadingButton)({
    color: "white",
    borderColor: "white",
    "&:hover": {
        borderColor: "white"
    }
});


const MenuLoginForm = ({ padding }: MenuLoginFormProps) => {

    const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);
    const [t] = useTranslation();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const signIn = useSignIn();
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();

    const onLogin = useCallback(async () => {

        const redirectError = (type: LoginErrors, error: string) => navigate(`/login?error=${error}&username=${username}&type=${type}`);

        if (username === "") {
            redirectError(LoginErrors.USERNAME, "LoginForm.errorUsernameEmpty");
            setLoginAnchor(null);
            setPassword("");
            return;
        }
        if (password === "") {
            redirectError(LoginErrors.PASSWORD, "LoginForm.errorPasswordEmpty");
            setLoginAnchor(null);
            setPassword("");
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
                    redirectError(LoginErrors.USERNAME, "LoginForm.errorWrongUsername");
                    break;
                case "PASSWORD_INVALID":
                    redirectError(LoginErrors.GENERAL, "LoginForm.errorNotAuthenticated");
                    break;
                case "SUCCESS":
                    if (response.data.token == null) {
                        console.error(`Login success but no token was provided.`);
                        redirectError(LoginErrors.GENERAL, "LoginForm.errorPost");
                    } else {
                        if (signIn(
                            {
                                token: response.data.token,
                                expiresIn: 1,
                                tokenType: "Bearer",
                                authState: response.data.account
                            }) === false) {
                            console.error(`Error login in. Error from react auth kit`);
                            redirectError(LoginErrors.GENERAL, "LoginForm.errorPost");
                        }
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
        setLoading(false);
        setPassword("");
        setLoginAnchor(null);
    }, [navigate, password, signIn, username]);

    return (
        <Box sx={{ pl: padding }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1em", flexGrow: 0 }}  >
                {isAuthenticated() === false ?
                    <React.Fragment>
                        <WhiteTextField
                            size="small"
                            label={t("LoginForm.username")}
                            variant="outlined"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />
                        <WhiteTextField
                            size="small"
                            label={t("LoginForm.password")}
                            variant="outlined"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type="password"
                        />
                        <WhiteLoadingButton
                            loading={loading}
                            size="small"
                            variant="outlined"
                            onClick={onLogin}>
                            {t("LoginForm.login")}
                        </WhiteLoadingButton>
                        <Link to="/register" >
                            <WhiteButton size="small" sx={{ height: "100%" }} variant="outlined" onClick={() => setLoginAnchor(null)}>
                                {t("LoginForm.register")}
                            </WhiteButton>
                        </Link>
                    </React.Fragment>
                    : <WhiteButton size="small" variant="outlined" onClick={onLogout} sx={{ height: "100%", minHeight: "40px" }}>
                        {t("LoginForm.logout")}
                    </WhiteButton>}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 0 }}  >
                <IconButton onClick={e => setLoginAnchor(e.currentTarget)} sx={{ p: 0, pr: 2 }}>
                    <AccountCircle sx={{ color: "white" }} />
                </IconButton>
            </Box>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={loginAnchor}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={loginAnchor != null}
                onClose={() => setLoginAnchor(null)}>
                <Stack direction="column" sx={{ paddingTop: spacingNormal, paddingLeft: spacingNormal, paddingRight: spacingNormal }} spacing={spacingNormal}>
                    {isAuthenticated() === false ?
                        <React.Fragment>
                            <WhiteTextField
                                size="small"
                                label={t("LoginForm.username")}
                                variant="outlined"
                                onChange={e => setUsername(e.target.value)}
                                value={username}
                            />
                            <WhiteTextField
                                size="small"
                                label={t("LoginForm.password")}
                                variant="outlined"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                type="password"
                            />

                            <Box>
                                <LoadingButton loading={loading} sx={{ display: "inline-grid" }} size="small" onClick={onLogin}>{t("LoginForm.login")}</LoadingButton>
                                <Link to="/register">
                                    <Button size="small" onClick={() => setLoginAnchor(null)}>{t("LoginForm.register")}</Button>
                                </Link>
                            </Box>
                        </React.Fragment>
                        : <Button size="small" onClick={onLogout}>{t("LoginForm.logout")}</Button>}

                </Stack>
            </Menu>
        </Box >
    );

    function onLogout() {
        setLoginAnchor(null)
        if (signOut() === false) {
            console.error("Couldn't perform logout for some reason");
        }
    }
}


export default MenuLoginForm;