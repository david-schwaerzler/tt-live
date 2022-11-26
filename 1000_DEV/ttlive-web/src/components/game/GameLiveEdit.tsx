import { Box, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Typography } from "@mui/material";
import React, { createRef, useCallback, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Game } from "../../rest/data/Game";
import { ChatMessage } from "../../rest/data/ChatMessage";
import ChatMessageList from "../chat/ChatMessageList";
import ChatAction from "../chat/ChatActions";
import { spacingSmall } from "../utils/StyleVars";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GameSet } from "../../rest/data/GameSet";
import { Stack } from "@mui/system";
import LoadingButton from "../utils/LoadingButton";
import { RequestGameSet } from "../../rest/data/RequestGameSet";
import { putGameSet } from "../../rest/api/GameApi";
import GameLiveEditSpinner from "./GameLiveEditSpinner";
import { useTranslation } from "react-i18next";

export interface GameLiveEditProps {
    game: Game;
    matchId: number;
    messages: Array<ChatMessage>;
    editorCode: string;
}

const GameLiveEdit = ({ game, messages, editorCode, matchId }: GameLiveEditProps) => {

    const [show, setShow] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false);

    const chatRef = createRef<HTMLUListElement>();
    const [gameSet, setGameSet] = useState<GameSet>(game.sets[0]);

    const [startTime, setStartTime] = useState<Date | null>(null);
    const onScrollEvent = useCallback(() => {
        setTimeout(() => {
            if (chatRef.current)
                chatRef.current.scrollTop = chatRef.current.scrollHeight
        }, 100);
    }, [chatRef]);

    const [t] = useTranslation();

    useEffect(() => {
        if (!show) {
            if (game.state === "FINISHED") {
                let finishedSets = game.sets.filter(s => s.state === "FINISHED");
                setGameSet(finishedSets[finishedSets.length - 1])
                return;
            }

            for (let set of game.sets) {
                if (set.state === "LIVE" || set.state === "NOT_STARTED") {
                    setGameSet(set);
                    return;
                }
            }
            setGameSet(game.sets[game.sets.length - 1]);
        } else {
            if (startTime == null) {
                let set = game.sets[gameSet.number - 1];
                if (set.homeScore !== gameSet.homeScore || set.guestScore !== gameSet.guestScore)
                    setGameSet(game.sets[gameSet.number - 1]);
            }
        }
    }, [show, game.sets, game.state, gameSet, startTime])


    useEffect(() => {
        if (!show)
            onScrollEvent();
    }, [show, onScrollEvent])

    return (
        <React.Fragment>
            <IconButton onClick={() => setShow(true)} sx={{ mt: "auto", mb: "auto", p: 0, display: "flex", justifyContent: "right" }} disableRipple>
                <EditIcon sx={{ width: "20px", }} />
            </IconButton>
            <Dialog
                fullWidth maxWidth="md"
                open={show}
                onClose={() => setShow(false)}>
                <DialogContent sx={{ pb: 0 }}>

                    <Stack direction="row" alignItems="center">
                        <LoadingButton loading={isLoading} disabled={isSetChangeDisabled(gameSet.number - 1)} onClick={() => setGameSet(game.sets[gameSet.number - 2])}><ExpandMoreIcon sx={{ transform: "rotate(90deg)" }} /></LoadingButton>
                        <Box sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>{t("GameLiveEdit.set")} {gameSet.number}</Box>
                        <LoadingButton loading={isLoading} disabled={isSetChangeDisabled(gameSet.number + 1)} onClick={() => setGameSet(game.sets[gameSet.number])}><ExpandMoreIcon sx={{ transform: "rotate(-90deg)" }} /></LoadingButton>
                    </Stack>

                    <Grid container sx={{ justifyContent: "center", textAlign: "center", paddingBottom: spacingSmall, mt: 2 }} columnSpacing={2} rowSpacing={1} >
                        <Grid item xs={6} mb={1}>
                            <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                                {game.doubles ?
                                    <React.Fragment>{game.homeDoubles.player1}<br />{game.homeDoubles.player2}</React.Fragment>
                                    : game.homePlayer.name
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                                {game.doubles ?
                                    <React.Fragment>{game.guestDoubles.player1}<br />{game.guestDoubles.player2}</React.Fragment>
                                    : game.guestPlayer.name
                                }
                            </Box>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography fontSize="1.5rem" fontWeight="bold" textAlign="center">{game.homeSets}</Typography>

                        </Grid>

                        <Grid item xs={6} mb={2}>
                            <Typography fontSize="1.5rem" fontWeight="bold">{game.guestSets}</Typography>
                        </Grid>

                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={isChangeScoreDisabled(true, true)}
                                onClick={() => onUpdateScore(gameSet.homeScore + 1, gameSet.guestScore)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon sx={{ transform: "rotate(180deg)" }} />
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={4}>
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={isChangeScoreDisabled(true, false)}
                                onClick={() => onUpdateScore(gameSet.homeScore, gameSet.guestScore + 1)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon sx={{ transform: "rotate(180deg)" }} />
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={2} />


                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <Typography fontSize="2rem" fontWeight="bold">{gameSet.homeScore}</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography fontSize="2rem" fontWeight="bold">{gameSet.guestScore}</Typography>
                        </Grid>
                        <Grid item xs={2} />

                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={gameSet.homeScore <= 0 || isChangeScoreDisabled(false, true)}
                                onClick={() => onUpdateScore(gameSet.homeScore - 1, gameSet.guestScore)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon />
                            </LoadingButton>
                        </Grid>

                        <Grid item xs={4}>
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={gameSet.guestScore <= 0 || isChangeScoreDisabled(false, false)}
                                onClick={() => onUpdateScore(gameSet.homeScore, gameSet.guestScore - 1)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon />
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={2} />


                    </Grid>
                    <GameLiveEditSpinner startTime={startTime} onTimerEnd={() => onSendUpdate()} />
                    <Divider sx={{ mt:1 }} />
                    <ChatMessageList messages={messages} ref={chatRef} sx={{ height: "10em" }} />
                    <ChatAction matchId={matchId} onScrollEvent={onScrollEvent} isEditor={true} showAvatar={false} />
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );


    function isChangeScoreDisabled(add: boolean, isHome: boolean) {

        let homeWon = gameSet.homeScore >= 11 && gameSet.homeScore - gameSet.guestScore >= 2;
        let guestWon = gameSet.guestScore >= 11 && gameSet.guestScore - gameSet.homeScore >= 2;

        if (homeWon) {
            if (isHome && !add)
                return false;
            return true;
        }

        if (guestWon) {
            if (!isHome && !add)
                return false;
            return true;
        }
        return false;

    }
    function isSetChangeDisabled(nextSetNumber: number) {
        if (nextSetNumber > 5 || nextSetNumber < 1)
            return true;

        let nextSet = game.sets[nextSetNumber - 1];
        if (nextSet == null)
            return true;

        if (gameSet.state !== "FINISHED" && nextSet.state === "NOT_STARTED")
            return true;

        if (game.state === "FINISHED" && nextSet.state === "NOT_STARTED")
            return true;


        return false;
    }

    function onUpdateScore(homeScore: number, guestScore: number) {
        let copy = { ...gameSet, homeScore: homeScore, guestScore: guestScore };
        setGameSet(copy);
        // this causes the spinner to tick down. 
        // after the spinner finishes. the current value of the gameSet will be sent to the server
        setStartTime(new Date());
    }

    async function onSendUpdate() {      

        let homeScore = gameSet.homeScore;
        let guestScore = gameSet.guestScore;

        let requestGameSet: RequestGameSet = {
            number: gameSet.number,
            homeScore: homeScore,
            guestScore: guestScore
        };

        setLoading(true);
        let response = await putGameSet(game.id, editorCode, requestGameSet);
        if (response.data != null) {
            // when home player won or guest player won
            if (homeScore >= 11 && homeScore - guestScore >= 2) {
                // when the game has not finished after this set
                if (game.homeSets < 2) {
                    // move to the next set
                    setGameSet(game.sets[gameSet.number]);
                }
            } else if (guestScore >= 11 && guestScore - homeScore >= 2) {
                // when the game has not finished after this set
                if (game.guestSets < 2) {
                    // move to the next set
                    setGameSet(game.sets[gameSet.number]);
                }
            }
        } else {
            console.log("Error while performing puGameSet request");
        }
        setLoading(false);
        setStartTime(null);
    }
}


export default GameLiveEdit;