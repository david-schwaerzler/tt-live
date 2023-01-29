import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { SimpleGame } from "../../rest/data/Game";
import { spacingSmall } from "../utils/StyleVars";

export interface GameScoreProps {
    simpleGame: SimpleGame;
}

const GameScore = ({ simpleGame }: GameScoreProps) => {

    const [t] = useTranslation();

    return (
        <Box key={simpleGame.gameNumber} sx={{ display: "flex", justifyContent: { sm: "center" } }}>
            {simpleGame.doubles ? renderDoubles(simpleGame) : renderSingles(simpleGame)}
        </Box>
    );

    function renderSingles(simpleGame: SimpleGame) {
        return (
            <React.Fragment>
                <Typography sx={{ flex: { sm: "1 1 0" }, order: { xs: 1, sm: 1 }, textAlign: "right", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {renderPlayer(simpleGame.homePlayer1)}
                </Typography>
                <Typography sx={{ order: { xs: 2 }, display: { sm: "none", xs: "block" } }}>
                    &nbsp; - &nbsp;
                </Typography>
                <Typography sx={{ flex: { xs: "1 0 0", sm: "1 1 0" }, order: { xs: 3 }, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {renderPlayer(simpleGame.guestPlayer1)}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", textWeight: "bold", paddingRight: spacingSmall, paddingLeft: spacingSmall, order: { xs: 4, sm: 2 } }}>
                    {simpleGame.state === "NOT_STARTED" ? <b>-:-</b> : <b>{simpleGame.homeSets}:{simpleGame.guestSets}</b>}
                </Box>
            </React.Fragment >
        )
    }

    function renderDoubles(simpleGame: SimpleGame) {
        return (
            <React.Fragment>
                <Box sx={{ flexGrow: 1, display: { sm: "none" }, overflow: "hidden" }}>
                    <Typography sx={{ flexGrow: 1, order: 1, fontSize: "0.8rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "noWrap" }}>
                        {renderPlayer(simpleGame.homePlayer1)}/{renderPlayer(simpleGame.homePlayer2)}
                    </Typography>
                    <Typography sx={{ flexGrow: 1, order: 2, fontSize: "0.8rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "noWrap" }}>
                        {renderPlayer(simpleGame.guestPlayer1)}/{renderPlayer(simpleGame.guestPlayer2)}
                    </Typography>
                </Box>
                <Typography sx={{ flex: { sm: "1 1 0" }, order: 1, display: { xs: "none", sm: "block" }, textAlign: "right", }}>
                    {renderPlayer(simpleGame.homePlayer1)}/{renderPlayer(simpleGame.homePlayer2)}
                </Typography>
                <Typography sx={{ flex: { sm: "1 1 0" }, order: 3, display: { xs: "none", sm: "block" } }}>
                    {renderPlayer(simpleGame.guestPlayer1)}/{renderPlayer(simpleGame.guestPlayer2)}
                </Typography>
                <Typography sx={{ minWidth: "2em", display: "flex", alignItems: "center", textWeight: "bold", paddingRight: spacingSmall, paddingLeft: spacingSmall, order: { sm: 2 } }}>
                    {simpleGame.state === "NOT_STARTED" ? <b>-:-</b> : <b>{simpleGame.homeSets}:{simpleGame.guestSets}</b>}
                </Typography>
            </React.Fragment >
        )
    }

    function renderPlayer(player: string | undefined) {
        if (player == null || player === "") {
            return <i>{t("GameReport.noPlayer")}</i>;
        }
        return player;
    }
}

export default GameScore;