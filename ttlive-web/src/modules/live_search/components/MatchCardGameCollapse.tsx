import { Collapse, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchSimpleMatchGames } from "../../../rest/api/MatchApi";
import { SimpleGame } from "../../../rest/data/Game";
import { SimpleMatch } from "../../../rest/data/Match";
import GameScore from "../../common/components/match/GameScore";
import ErrorMessage from "../../common/components/utils/ErrorMessage";

export interface MatchCardGameCollapseProps {
    match: SimpleMatch;
    expanded: boolean;
    onLoadingChanged: (loading: boolean) => void;
    loading: boolean;
}

const MatchCardGameCollapse = ({ match, expanded, onLoadingChanged, loading }: MatchCardGameCollapseProps) => {

    const [t] = useTranslation();
    const [games, setGames] = useState<Array<SimpleGame>>([]);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        async function fetch() {
            setErrorMsg("");
            let response = await fetchSimpleMatchGames(match.id);
            if (response.data != null) {
                setGames(response.data);
            } else {
                setErrorMsg(response.error);
            }
            onLoadingChanged(false);
        }
        if (expanded) {
            fetch();
        }

    }, [match, expanded, onLoadingChanged]);

    const displayGames = useMemo(() => {

        let displayGames = games.filter(g => g.state === "LIVE" || g.state === "FINISHED");
        let notStartedGames = games.filter(g => g.state === "NOT_STARTED");

        if (notStartedGames.length >= 2) {
            displayGames.push(notStartedGames[0])
            displayGames.push(notStartedGames[1])
        } else if (notStartedGames.length >= 1) {
            displayGames.push(notStartedGames[1])
        }

        return displayGames
    }, [games]);



    if (errorMsg != null && errorMsg !== "") {
        return <ErrorMessage key={t("Common.errorHttp")} centered />
    }

    return (
        <React.Fragment>

            <Collapse in={expanded && !loading} timeout="auto" sx={{ minHeight: "72px", pt: 2 }} unmountOnExit>
                <Stack sx={{ gap: 2, }} >
                    {displayGames.map(simpleGame => (
                        <GameScore key={simpleGame.gameNumber} simpleGame={simpleGame} />
                    ))}
                </Stack >

            </Collapse>
        </React.Fragment>
    );
}

export default React.memo(MatchCardGameCollapse);