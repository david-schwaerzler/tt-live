import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

export interface HomeViewProps {

}

export function HomeView(props: HomeViewProps) {
    const [t] = useTranslation();
    return (
        <Container sx={{ height: "80vh" }}>
            <Box m="auto">
                <Typography variant="h1"  >
                    <Trans i18nKey={"HomeView.welcomeText"} />
                </Typography>

                <Typography variant="h2" mt={4}>
                    Gehe Live mit deinem Ligaspiel<br />ohne Account und in nur wenigen Klicks.
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

                <Typography variant="h2" mt={4}>
                    Oder finde ein Spiel über die Suche
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
        </Container>

    );
}
