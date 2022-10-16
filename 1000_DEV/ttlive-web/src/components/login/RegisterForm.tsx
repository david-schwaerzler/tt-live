import { Button, Paper, TextField } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { spacingNormal } from "../utils/StyleVars";

export interface RegisterFormprops {

}

const RegisterForm = () => {

    const [t] = useTranslation();

    return (
        <Container>
            <Paper sx={{ minHeight: { md: "500px" }, display: "flex", padding: spacingNormal }}>
                <Stack direction="column" sx={{ flexGrow: 1, justifyContent: { xs: "flex-start", md: "center" }, alignItems: "center" }} spacing={spacingNormal}>
                    <Box>
                        <TextField label={t("RegisterForm.username")} variant="outlined" />
                    </Box>
                    <Box>
                        <TextField label={t("RegisterForm.email")} variant="outlined" />
                    </Box>
                    <Box>
                        <TextField label={t("RegisterForm.confirmEmail")} variant="outlined" />
                    </Box>
                    <Box>
                        <TextField label={t("RegisterForm.password")} variant="outlined" />
                    </Box>                    
                    <Box>
                        <Button>{t("RegisterForm.register")}</Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    )
}


export default RegisterForm;