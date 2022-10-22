import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import { spacingNormal } from "../components/utils/StyleVars";

const LiveView = () => {

    const context = useContext(AppContext)
    const [t] = useTranslation();

    if (context.matchId == null)
        return renderNoMatch()
    return (
        <Box>
            <Typography variant="h1" textAlign="center">Manshi ist die beste</Typography>
        </Box>
    );


    function renderNoMatch() {
        return (
            <Box >
                <Typography variant="h6" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                    {t('LiveView.noMatch')}
                </Typography>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Link to="/live_search" style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" sx={{ alignSelf: "center" }}>
                            {t('LiveView.search')}
                        </Button>
                    </Link>
                </Box>
            </Box>
        )
    }
}

export default LiveView;