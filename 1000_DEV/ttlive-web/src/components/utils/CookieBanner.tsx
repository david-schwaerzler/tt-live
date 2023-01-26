import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CookieBanner = () => {

    const [t] = useTranslation();

    const [show, setShow] = useState(true);
    useEffect(() => {
        let consent = localStorage.getItem("cookie-consent")

        if (consent == null)
            return;

        if (consent === "true") 
            setShow(false)        
    }, []);

    if (show === false)
        return <></>;

    return (
        <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
            <Card sx={{ mb: 0, background: "#424242"}} variant="outlined" >
                <CardContent>
                    <Typography variant="h5" mb={2}>{t("CookieBanner.title")}</Typography>
                    <Stack direction={{xs: "column", md: "row"}} gap={2}>
                        <Typography flexGrow={1}>{t("CookieBanner.content")}</Typography>
                        <Button onClick={() => setConsent(true)} color="primary" variant="contained">{t("CookieBanner.accept")}</Button>
                        <Button onClick={() => setConsent(false)}  variant="outlined">{t("CookieBanner.decline")}</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );

    function setConsent(consent: boolean) {
        if (consent === true) {
            localStorage.setItem("cookie-consent", "true");
        }

        setShow(false);
    }
}

export default CookieBanner;