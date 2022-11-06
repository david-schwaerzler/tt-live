import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MatchTable from "../components/match/MatchTable";
import ErrorMessage from "../components/utils/ErrorMessage";
import { spacingLarge, spacingNormal } from "../components/utils/StyleVars";

const LiveSearch = () => {

    const [t] = useTranslation();
    const [errorMsg, setErrorMsg] = useState<string>("");

    return (
        <Box>
            <ErrorMessage msg={errorMsg} centered sx={{ paddingBottom: spacingNormal }} />
            <Typography variant="h6" sx={{ textAlign: "center", paddingBottom: spacingLarge }}>
                {t("LiveSearch.headline")}
            </Typography>

           <MatchTable onError={msg => setErrorMsg(msg)} onFetched={() => setErrorMsg("")} fetchDelay={1000*60}/>

        </Box>
    )

}

export default LiveSearch;