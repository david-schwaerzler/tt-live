import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function isMatomoConsent() {
    if (Symbol.iterator in window._paq) {
        for (let entry of window._paq)
            if (entry[0] === "setConsentGiven")
                return true;
    }
    return false;
}

const CookieBanner = () => {

    const matomo = useMatomo();
    const [t] = useTranslation();
    const [show, setShow] = useState(() => {
        let consent = sessionStorage.getItem("cookie-consent");
        if (consent != null && consent === "false") { // consent will never happen here. only consent===false is stored
            return false;
        }

        consent = localStorage.getItem("cookie-consent")
        if (consent == null)
            return true;

        if (consent === "true") {
            if (isMatomoConsent() === false)
                matomo.pushInstruction("setConsentGiven", true);
            return false;
        }
    });


    if (show === false)
        return <></>;


    return (
        <Box sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1 }}>
            <Card sx={{ mb: 0, background: "#424242" }} variant="outlined" >
                <CardContent sx={{ whiteSpace: "pre-wrap" }}>
                    <Typography variant="h5" mb={2}>{t("CookieBanner.title")}</Typography>
                    <Typography flexGrow={1}>{t("CookieBanner.content")}</Typography>
                    <Stack direction={{ xs: "column", md: "row" }} gap={2} mt={2} >
                        <Button onClick={() => setConsent(true)} color="primary" variant="contained">{t("CookieBanner.accept")}</Button>
                        <Button onClick={() => setConsent(false)} variant="outlined">{t("CookieBanner.decline")}</Button>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );

    function setConsent(consent: boolean) {
        if (consent === true) {
            if (isMatomoConsent() === false)
                matomo.pushInstruction("setConsentGiven", true);
            localStorage.setItem("cookie-consent", "true");
        } else {
            sessionStorage.setItem("cookie-consent", "false");
        }
        setShow(false);
    }
}

export default CookieBanner;