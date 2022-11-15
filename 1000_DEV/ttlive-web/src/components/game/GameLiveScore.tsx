import { Box, Card, CardActions, CardContent, Collapse, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import MatchStateLabel from "../match/MatchStateLabel";
import ExpandButton from "../utils/ExpandButton";
import { spacingSmall } from "../utils/StyleVars";


export interface GameLiveScoreProps {
    game: Game;
}

const NUM_DISPLAYED_SETS = 2;

// TODO Refactore this (especially the games)
const GameLiveScore = ({ game }: GameLiveScoreProps) => {

    const [expanded, setExpanded] = useState<boolean>(false);
    const [displayedSets, setDisplayedSets] = useState<Array<GameSet>>([]);
    const [hiddenSets, setHiddenSets] = useState<Array<GameSet>>([]);

    useEffect(() => {

        // need to create a copy, otherwise the sets will be in the wrong order
        let sortedSets = [...game.sets];
        sortedSets.sort((a, b) => b.number - a.number);

        let displayedSets = sortedSets.filter(s => s.state === "LIVE"); // all live sets will be displayed (should normally be only 1)
        if (displayedSets.length < NUM_DISPLAYED_SETS) {
            for (let set of sortedSets) {
                if (set.state === "FINISHED") // add the last finised set
                    displayedSets.push(set);
                if (displayedSets.length >= NUM_DISPLAYED_SETS)
                    break;
            }
        }

        let hiddenSets = sortedSets.filter(d => displayedSets.includes(d) === false && d.state !== "NOT_STARTED");

        setDisplayedSets(displayedSets);
        setHiddenSets(hiddenSets);
    }, [game.sets])


    return (
        <Card>
            <CardContent>
                {(game.state === "LIVE" || game.state === "FINISHED") &&
                    <Box width="100%" display="flex" mb={1}>
                        <MatchStateLabel sx={{ margin: "auto" }} state={game.state} variant="border" />
                    </Box>
                }
                {game.doubles ? renderDoubles(game) : renderSingles(game)}


                {displayedSets.map(value =>
                    <Grid key={value.number} container textAlign="center" justifyContent="center" sx={{ fontSize: value.state === "LIVE" ? "1.4rem" : "inherit", opacity: value.state !== "LIVE" ? 0.5 : 1 }}>
                        <Grid item xs={1}>
                            <Box fontWeight={value.homeScore > value.guestScore ? "bold" : "normal"}>{value.homeScore === -1 ? "?" : value.homeScore}</Box>
                        </Grid>
                        <Grid item xs={3}>
                            {value.state === "LIVE" ? <MatchStateLabel state={value.state} /> : <Box>Satz {value.number}</Box>}
                        </Grid>
                        <Grid item xs={1}>
                            <Box fontWeight={value.guestScore > value.homeScore ? "bold" : "normal"}>{value.guestScore === -1 ? "?" : value.guestScore}</Box>
                        </Grid>
                    </Grid>
                )}


                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {hiddenSets.map(value =>
                        <Grid key={value.number} container textAlign="center" justifyContent="center" sx={{ fontSize: value.state === "LIVE" ? "1.4rem" : "inherit", opacity: value.state !== "LIVE" ? 0.5 : 1 }}  >
                            <Grid item xs={1}>
                                <Box fontWeight={value.homeScore > value.guestScore ? "bold" : "normal"}>{value.homeScore === -1 ? "?" : value.homeScore}</Box>
                            </Grid>
                            <Grid item xs={3}>
                                {value.state === "LIVE" ? <MatchStateLabel state={value.state} /> : <Box>Satz {value.number}</Box>}
                            </Grid>
                            <Grid item xs={1}>
                                <Box fontWeight={value.guestScore > value.homeScore ? "bold" : "normal"}>{value.guestScore === -1 ? "?" : value.guestScore}</Box>
                            </Grid>
                        </Grid>
                    )}
                </Collapse>
            </CardContent>
            <CardActions>
                <Box sx={{ cursor: "pointer", width: "100%", left: 0 }} onClick={() => setExpanded(!expanded)}>
                    <ExpandButton expanded={expanded} />
                </Box>
            </CardActions>
        </Card>
    );

    function renderSingles(game: Game) {
        return (
            <Stack>
                <Grid container sx={{ justifyContent: "center", textAlign: "center", paddingBottom: spacingSmall }}>
                    <Grid item xs={6} >
                        <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{game.homePlayer.name}</Box>
                        <Box sx={{ fontSize: { xs: "2rem", sm: "3rem" }, fontWeight: "bold" }}>{game.homeSets}</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{game.guestPlayer.name}</Box>
                        <Box sx={{ fontSize: { xs: "2rem", sm: "3rem" }, fontWeight: "bold" }}>{game.guestSets}</Box>
                    </Grid>
                </Grid>

            </Stack>
        );
    }


    function renderDoubles(game: Game) {
        return (
            <Stack>
                <Grid container sx={{ justifyContent: "center", textAlign: "center", paddingBottom: spacingSmall }}>
                    <Grid item xs={6} >
                        <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{game.homeDoubles.player1}<br />{game.homeDoubles.player2}</Box>
                        <Box sx={{ fontSize: { xs: "2rem", sm: "3rem" }, fontWeight: "bold" }}>{game.homeSets}</Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{game.guestDoubles.player1}<br />{game.guestDoubles.player2}</Box>
                        <Box sx={{ fontSize: { xs: "2rem", sm: "3rem" }, fontWeight: "bold" }}>{game.guestSets}</Box>
                    </Grid>
                </Grid>

            </Stack>
        );
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

export default GameLiveScore;