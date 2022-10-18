import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import MatchTable from "../components/match/MatchTable";
import ErrorMessage from "../components/utils/ErrorMessage";
import { spacingLarge, spacingNormal } from "../components/utils/StyleVars";
import { fetchMatches } from "../rest/api/MatchApi";
import { Match } from "../rest/data/Match";

export interface LiveSearchView {

}

const LiveSearch = ({ }: LiveSearchView) => {

    const [t] = useTranslation();
    const ref = useRef(false);
    const [matches, setMatches] = useState<Array<Match>>([]);
    const [errorMsg, setErrorMsg] = useState<string>("");

    return (
        <Box>
            <ErrorMessage msg={errorMsg} centered sx={{ paddingBottom: spacingNormal }} />
            <Typography variant="h6" sx={{ textAlign: "center", paddingBottom: spacingLarge }}>
                {t("LiveSearch.headline")}
            </Typography>

           <MatchTable onError={msg => setErrorMsg(msg)} onFetched={() => setErrorMsg("")} fetchDelay={10000}/>

        </Box>
    )

}

export default LiveSearch;