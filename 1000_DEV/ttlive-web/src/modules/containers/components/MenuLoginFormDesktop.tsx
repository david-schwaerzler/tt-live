import { Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { WhiteButton, WhiteLoadingButton, WhiteTextField } from "./MenuLoginForm";

export interface MenuLoginFormDesktopProps {
    onLogin: () => void;
    username: string;
    onUsernameChange: (username: string) => void;
    password: string;
    onPasswordChange: (password: string) => void;
}




const MenuLoginFormDesktop = ({ onLogin, username, password, onUsernameChange, onPasswordChange }: MenuLoginFormDesktopProps) => {

    const [t] = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);


    return (
        <Stack sx={{ pl: 6 }} direction="row" gap="1em">
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
                onKeyDown={(e) => e.key === "Enter" && onLoginClicked()}
            />
            <WhiteLoadingButton
                loading={loading}
                size="small"
                variant="outlined"
                onClick={onLoginClicked}>
                {t("LoginForm.login")}
            </WhiteLoadingButton>
            <Link to="/register" style={{ textDecoration: "none" }}>
                <WhiteButton size="small" sx={{ height: "100%" }} variant="outlined">
                    {t("LoginForm.register")}
                </WhiteButton>
            </Link>
        </Stack>
    );

    async function onLoginClicked() {
        setLoading(true);
        await onLogin();
        setLoading(false)
    }
}

export default MenuLoginFormDesktop;