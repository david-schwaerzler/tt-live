import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import ContactForm from "../components/contact/ContactForm";

export interface HomeViewProps {

}

export function HomeView(props: HomeViewProps) {
    const [t] = useTranslation();

    return (
        <Container sx={{ width: "100%", mt: 4 }}>
            <Box m="auto">
                <Typography variant="h1"  >
                    <Trans i18nKey={"HomeView.welcomeText"} />
                </Typography>

                <Typography variant="h2" mt={6}>
                    {t("HomeView.goLiveText")}
                </Typography>
                <Box mt={2}>
                    <Link to="/create" style={{ textDecoration: "none" }}>
                        <Button sx={{ flexGrow: 0 }} variant="outlined" size="large">
                            <Typography variant="h3">
                                <b>{t("HomeView.createMatch")}</b>
                            </Typography>
                        </Button>
                    </Link>
                </Box>

                <Typography variant="h2" mt={6}>
                    {t("HomeView.goSearchText")}
                </Typography>
                <Box mt={2}>
                    <Link to="/live_search" style={{ textDecoration: "none" }}>
                        <Button sx={{ flexGrow: 0 }} variant="outlined" size="large">
                            <Typography variant="h3">
                                <b>{t("HomeView.search")}</b>
                            </Typography>
                        </Button>
                    </Link>
                </Box>
            </Box>
            <ContactForm sx={{ mt: 6 }} />
            <Box sx={{ mt: 3, color: theme => theme.palette.primary.main }}>
                <Link to={"imprint"} style={{ color: "inherit" }}>{t("HomeView.imprint")}</Link>
            </Box>
        </Container>

    );
}
