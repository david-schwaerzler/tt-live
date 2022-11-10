import { Button, Card, CardContent, Paper, TextField } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useTranslation } from "react-i18next";
import { spacingNormal } from "../utils/StyleVars";

export interface RegisterFormprops {

}

const RegisterForm = () => {

    const [t] = useTranslation();

    return (
        <Container>
            <Card sx={{ minHeight: { sm: "500px" }, display: "flex" }}>
                <CardContent>
                    <Stack direction="column" sx={{ flexGrow: 1, justifyContent: { xs: "flex-start", sm: "center" }, alignItems: "center" }} spacing={spacingNormal}>
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
                </CardContent>
            </Card>
        </Container>
    )
}


export default RegisterForm;