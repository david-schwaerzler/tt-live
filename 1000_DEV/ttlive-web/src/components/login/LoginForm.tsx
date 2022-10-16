import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import { spacingNormal } from "../utils/StyleVars";

export interface LoginFormProps {

}

const LoginForm = () => {

    const [t] = useTranslation();

    return (
        <Container>
            <Paper sx={{minHeight: {md: "500px"}, display: "flex", padding: spacingNormal}}>
                <Stack direction="column" sx={{flexGrow: 1, justifyContent: {xs: "flex-start", md: "center"}, alignItems: "center"  }} spacing={spacingNormal}>
                    <Box>
                        <TextField label={t("LoginForm.username")} variant="outlined" />
                    </Box>
                    <Box>
                        <TextField label={t("LoginForm.password")} variant="outlined" />
                    </Box>
                    <Box>
                        <Button>{t("LoginForm.login")}</Button>
                        <Button>{t("LoginForm.register")}</Button>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );

}

export default LoginForm;