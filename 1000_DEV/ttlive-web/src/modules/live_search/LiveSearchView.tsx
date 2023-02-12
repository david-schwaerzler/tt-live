import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import MatchTable from "./components/MatchTable";
import { useTrackPage } from "../common/hooks/useTrackerProvider";

const LiveSearch = () => {

    const [t] = useTranslation();
    useTrackPage("LiveSearch", "/live_search");


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