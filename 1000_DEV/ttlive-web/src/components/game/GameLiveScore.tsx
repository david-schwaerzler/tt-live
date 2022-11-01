import styled from "@emotion/styled";
import { Box, Collapse, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
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

        let sortedSets = game.sets.sort((a, b) => b.number - a.number);


        let displayedSets = sortedSets.filter(s => s.state === "LIVE"); // all live sets will be displayed (should normally be only 1)
        if (displayedSets.length < NUM_DISPLAYED_SETS) {
            for (let set of sortedSets) {
                if (set.state === "FINISHED") // add the last finised set
                    displayedSets.push(set);
                if (displayedSets.length >= NUM_DISPLAYED_SETS)
                    break;
            }
        }

        let hiddenSets = sortedSets.filter(d => displayedSets.includes(d) === false);

        setDisplayedSets(displayedSets);
        setHiddenSets(hiddenSets);
    }, [game.sets])


    return (
        <Box >
            {game.doubles ? renderDoubles(game) : renderSingles(game)}
        </Box>
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

                {displayedSets.map(value =>
                    <Grid key={value.number} container textAlign="center" justifyContent="center" sx={{ fontSize: value.state == "LIVE" ? "1.4rem" : "inherit", opacity: value.state !== "LIVE" ? 0.5 : 1 }}>
                        <Grid item xs={1}>
                            <Box fontWeight={value.homeScore > value.guestScore ? "bold" : "normal"}>{value.homeScore}</Box>
                        </Grid>
                        <Grid item xs={3}>
                            {value.state === "LIVE" ? <MatchStateLabel state={value.state} /> : <Box>Satz {value.number}</Box>}
                        </Grid>
                        <Grid item xs={1}>
                            <Box fontWeight={value.guestScore > value.homeScore ? "bold" : "normal"}>{value.guestScore}</Box>
                        </Grid>
                    </Grid>
                )}


                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {hiddenSets.map(value =>
                        <Grid key={value.number} container textAlign="center" justifyContent="center" sx={{ fontSize: value.state == "LIVE" ? "1.4rem" : "inherit", opacity: value.state !== "LIVE" ? 0.5 : 1 }}  >
                            <Grid item xs={1}>
                                <Box fontWeight={value.homeScore > value.guestScore ? "bold" : "normal"}>{value.homeScore}</Box>
                            </Grid>
                            <Grid item xs={3}>
                                {value.state === "LIVE" ? <MatchStateLabel state={value.state} /> : <Box>Satz {value.number}</Box>}
                            </Grid>
                            <Grid item xs={1}>
                                <Box fontWeight={value.guestScore > value.homeScore ? "bold" : "normal"}>{value.guestScore}</Box>
                            </Grid>
                        </Grid>
                    )}
                </Collapse>

                <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center" }} onClick={() => setExpanded(!expanded)}>
                    <ExpandButton expanded={expanded} />
                </Box>

            </Stack>
        );
    }

    function renderSingles2(game: Game) {
        return (
            <React.Fragment>
                <Grid container sx={{ textAlign: "center" }}>
                    <Grid item xs={4} sx={{ textAlign: "left", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{game.homePlayer.name}</Grid>
                    <Grid item xs={1}></Grid>
                    {game.sets.map(value => renderSet2(value, true))}
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.homeSets}</Grid>
                </Grid>
                <Divider />
                <Grid container sx={{ textAlign: "center" }}>
                    <Grid item xs={4} sx={{ textAlign: "left", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{game.guestPlayer.name}</Grid>
                    <Grid item xs={1}></Grid>
                    {game.sets.map(value => renderSet2(value, false))}
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1} sx={{ fontWeight: "bold" }}>{game.guestSets}</Grid>
                </Grid>

            </React.Fragment>
        )
    }

    function renderSet2(set: GameSet, isHome: boolean) {

        if (set.state == "NOT_STARTED")
            return <Grid item xs={1} >-</Grid>


        if (isHome) {
            if (set.homeScore < set.guestScore)
                return <Grid item xs={1} sx={{ fontWeight: "bold" }}>{set.homeScore}</Grid>
            return <Grid item xs={1} >{set.homeScore}</Grid>
        } else {
            if (set.guestScore < set.homeScore)
                return <Grid item xs={1} sx={{ fontWeight: "bold" }}>{set.guestScore}</Grid>
            return <Grid item xs={1} >{set.guestScore}</Grid>
        }
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

export default GameLiveScore;