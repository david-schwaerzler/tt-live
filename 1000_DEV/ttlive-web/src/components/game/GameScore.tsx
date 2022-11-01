import { Box, Typography } from "@mui/material";
import React from "react";
import { Game } from "../../rest/data/Game";
import { spacingSmall } from "../utils/StyleVars";

export interface GameScoreProps {
    game: Game;
}

const GameScore = ({ game }: GameScoreProps) => {

    return (
        <Box key={game.gameNumber} sx={{ display: "flex", justifyContent: { sm: "center" } }}>
            {game.doubles ? renderDoubles(game) : renderSingles(game)}
        </Box>
    );

    function renderSingles(game: Game) {
        return (
            <React.Fragment>
                <Typography sx={{ flex: { sm: "1 1 0" }, order: { xs: 1, sm: 1 }, textAlign: "right", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {game.homePlayer.name}
                </Typography>
                <Typography sx={{ order: { xs: 2 }, display: { sm: "none", xs: "block" } }}>
                    &nbsp;- &nbsp;
                </Typography>
                <Typography sx={{ flex: { xs: "1 0 0", sm: "1 1 0" }, order: { xs: 3 }, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                    {game.guestPlayer.name}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", textWeight: "bold", paddingRight: spacingSmall, paddingLeft: spacingSmall, order: { xs: 4, sm: 2 } }}>
                    {game.state === "NOT_STARTED" ? <b>-:-</b> : <b>{game.homeSets}:{game.guestSets}</b>}
                </Box>
            </React.Fragment >
        )
    }

    function renderDoubles(game: Game) {
        return (
            <React.Fragment>
                <Box sx={{ flexGrow: 1, display: { sm: "none" }, overflow: "hidden" }}>
                    <Typography sx={{ flexGrow: 1, order: 1, fontSize: "0.8rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "noWrap" }}>
                        {game.homeDoubles.player1}/{game.homeDoubles.player2}
                    </Typography>
                    <Typography sx={{ flexGrow: 1, order: 2, fontSize: "0.8rem", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "noWrap" }}>
                        {game.guestDoubles.player1}/{game.guestDoubles.player2}
                    </Typography>
                </Box>
                <Typography sx={{ flex: { sm: "1 1 0" }, order: 1, display: { xs: "none", sm: "block" }, textAlign: "right", }}>
                    {game.homeDoubles.player1}/{game.homeDoubles.player2}
                </Typography>
                <Typography sx={{ flex: { sm: "1 1 0" }, order: 3, display: { xs: "none", sm: "block" } }}>
                    {game.guestDoubles.player1}/{game.guestDoubles.player2}
                </Typography>
                <Typography sx={{ minWidth: "2em", display: "flex", alignItems: "center", textWeight: "bold", paddingRight: spacingSmall, paddingLeft: spacingSmall, order: { sm: 2 } }}>
                    {game.state === "NOT_STARTED" ? <b>-:-</b> : <b>{game.homeSets}:{game.guestSets}</b>}
                </Typography>
            </React.Fragment >
        )
    }
}

export default GameScore;