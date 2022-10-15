import styled from "@emotion/styled";
import { AccountCircle } from "@mui/icons-material";
import { Button, IconButton, Menu, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface LoginFormProps {
    /* Resposive padding for the Toolbar */
    padding: any
}

const SmallTextField = styled(TextField)({
    margin: "auto",

    "& .MuiFormLabel-root": {
       // transform: "translate(14px, 5px) scale(1);",
    },
    "& .MuiFormLabel-root.Mui-focused": {
       // transform: "translate(14px, -9px) scale(0.75);",
    },
    input: {
        padding: "5px"
    }
});

const WhiteTextField = styled(SmallTextField)({

    "& .MuiFormLabel-root": {
        color: "white",
        transform: "translate(14px, 5px) scale(1);",
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "white",
        transform: "translate(14px, -9px) scale(0.75);",
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
    paddingTop: "4px",
    paddingBottom: "4px",
    borderColor: "white",
    "&:hover": {
        borderColor: "white"
    }
})


const LoginForm = (props: LoginFormProps) => {

    const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);
    const [t] = useTranslation();
    return (
        <Box sx={{ pl: props.padding }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1em", flexGrow: 0 }}  >
                <WhiteTextField label={t("LoginForm.username")} variant="outlined" />
                <WhiteTextField label={t("LoginForm.password")} variant="outlined" />
                <WhiteButton variant="outlined">{t("LoginForm.login")}</WhiteButton>
                <WhiteButton variant="outlined">{t("LoginForm.register")}</WhiteButton>

            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 0 }}  >
                <IconButton onClick={e => setLoginAnchor(e.currentTarget)} sx={{ p: 0 }}>
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
                <Stack direction="column" sx={{padding: "0px 10px 10px 10px"}} spacing="10px">
                    <SmallTextField label={t("LoginForm.username")} sx={{ pt: "10px" }} inputProps={{ style: { padding: "5px" } }} variant="outlined" />
                    <SmallTextField label={t("LoginForm.password")} sx={{ pt: "10px" }} inputProps={{ style: { padding: "5px" } }} variant="outlined" />
                    <Box>
                        <Button>{t("LoginForm.login")}</Button>
                        <Button>{t("LoginForm.register")}</Button>
                    </Box>
                </Stack>
            </Menu>
        </Box >

    )
}


export default LoginForm;