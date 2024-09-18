import { Button, styled, TextField } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../common/components/buttons/LoadingButton";
import { LoginErrors, useLogin } from "../../common/hooks/useLogin";

export interface MenuLoginFormProps {
    isBig: boolean
}

const MenuLoginFormDesktop = React.lazy(() => import("./MenuLoginFormDesktop"));
const MenuLoginFormMobile = React.lazy(() => import("./MenuLoginFormMobile"));


const MenuLoginForm = ({ isBig }: MenuLoginFormProps) => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const login = useLogin();

    const onLogin = useCallback(async () => {

        const redirectError = (type: LoginErrors, error: string) => navigate(`/login?error=${error}&username=${username}&type=${type}`);
        const status = await login(username, password);
        if(status.error != null){
            setPassword("");
            redirectError(status.error, status.errorMsg);
        }
      
    }, [navigate, password, username, login]);


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