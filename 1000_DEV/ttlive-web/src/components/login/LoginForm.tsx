import { Box, Button, Card, CardContent, Paper, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";
import { spacingNormal } from "../utils/StyleVars";

export interface LoginFormProps {

}

const LoginForm = () => {

    const [t] = useTranslation();

    return (
        <Container>
            <Card sx={{ minHeight: { sm: "500px" }, display: "flex" }}>
                <CardContent>
                    <Stack direction="column" sx={{ flexGrow: 1, justifyContent: { xs: "flex-start", sm: "center" }, alignItems: "center" }} spacing={spacingNormal}>
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
                </CardContent>
            </Card>
        </Container>
    );

}

export default LoginForm;