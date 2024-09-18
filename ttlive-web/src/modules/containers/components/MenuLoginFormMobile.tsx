import { AccountCircle } from "@mui/icons-material";
import { Button, IconButton, Menu, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoadingButton from "../../common/components/buttons/LoadingButton";
import { WhiteTextField } from "./MenuLoginForm";

export interface MenuLoginFormMobileProps {
    onLogin: () => Promise<any>;
    username: string;
    onUsernameChange: (username: string) => void;
    password: string;
    onPasswordChange: (password: string) => void;
}

const MenuLoginFormMobile = ({ onLogin, username, password, onUsernameChange, onPasswordChange }: MenuLoginFormMobileProps) => {

    const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);
    const [t] = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <React.Fragment>

            <IconButton onClick={e => setLoginAnchor(e.currentTarget)} sx={{ p: 0, mr: 2 }}>
                <AccountCircle sx={{ color: "white" }} />
            </IconButton>

            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={loginAnchor}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}                
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={loginAnchor != null}
                onClose={() => setLoginAnchor(null)}>
                <Stack p={2} pb={0} spacing={2}>

                    <WhiteTextField
                        size="small"
                        label={t("LoginForm.username")}
                        variant="outlined"
                        onChange={e => onUsernameChange(e.target.value)}
                        value={username}
                    />
                    <WhiteTextField
                        size="small"
                        label={t("LoginForm.password")}
                        variant="outlined"
                        onChange={e => onPasswordChange(e.target.value)}
                        value={password}
                        type="password"
                    />

                    <Box>
                        <LoadingButton loading={loading} sx={{ display: "inline-grid" }} size="small" onClick={onLoginClicked}>{t("LoginForm.login")}</LoadingButton>
                        <Link to="/register" style={{ textDecoration: "none" }} onClick={() => setLoginAnchor(null)}>
                            <Button size="small">{t("LoginForm.register")}</Button>
                        </Link>
                    </Box>
                </Stack>
            </Menu>
        </React.Fragment>
    );

    async function onLoginClicked() {
        setLoading(true);
        setLoginAnchor(null);
        await onLogin();
        setLoading(false)
    }
}


export default MenuLoginFormMobile;