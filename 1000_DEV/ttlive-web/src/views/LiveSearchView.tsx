import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import MatchTable from "../components/match/MatchTable";

const LiveSearch = () => {

    const [t] = useTranslation();

    return (
        <Box>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
                {t("LiveSearch.headline")}
            </Typography>

           <MatchTable fetchDelay={1000*30}/>
        </Box>
    )

}

export default LiveSearch;