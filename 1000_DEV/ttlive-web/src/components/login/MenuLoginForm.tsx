import styled from "@emotion/styled";
import { AccountCircle } from "@mui/icons-material";
import { Button, IconButton, Menu, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { spacingNormal } from "../utils/StyleVars";

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
})


const MenuLoginForm = ({ padding }: MenuLoginFormProps) => {

    const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);
    const [t] = useTranslation();
    return (
        <Box sx={{ pl: padding }}>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "1em", flexGrow: 0 }}  >
                <WhiteTextField size="small" label={t("LoginForm.username")} variant="outlined" />
                <WhiteTextField size="small" label={t("LoginForm.password")} variant="outlined" />
                <WhiteButton size="small" variant="outlined">{t("LoginForm.login")}</WhiteButton>
                <WhiteButton size="small" variant="outlined">{t("LoginForm.register")}</WhiteButton>

            </Box>
            <Box sx={{ display: { xs: "flex", sm: "none" }, flexGrow: 0 }}  >
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
                    <TextField size="small" label={t("LoginForm.username")} variant="outlined" />
                    <TextField size="small" label={t("LoginForm.password")} variant="outlined" />
                    <Box>
                        <Button size="small">{t("LoginForm.login")}</Button>
                        <Button size="small">{t("LoginForm.register")}</Button>
                    </Box>
                </Stack>
            </Menu>
        </Box >

    )
}


export default MenuLoginForm;