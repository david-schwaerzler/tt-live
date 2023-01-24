import { Dialog, DialogContent, Stack, Box, Grid, Typography, Divider, DialogActions } from "@mui/material";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import ChatAction from "../chat/ChatActions";
import ChatMessageList from "../chat/ChatMessageList";
import LoadingButton from "../utils/LoadingButton";
import { spacingSmall } from "../utils/StyleVars";
import GameLiveEditSpinner from "./GameLiveEditSpinner";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChatMessage } from "../../rest/data/ChatMessage";
import { RequestGameSet } from "../../rest/data/RequestGameSet";
import { putGameSet } from "../../rest/api/GameApi";


export interface GameLiveEditDialogProps {
    game: Game;
    show: boolean;
    matchId: number;
    messages: Array<ChatMessage>;
    editorCode: string;
    onClose: () => void;
    onUpdate: (game: Game) => void
}

const GameLiveEditDialog = ({ game, show, matchId, messages, editorCode, onClose, onUpdate }: GameLiveEditDialogProps) => {

    const [isLoading, setLoading] = useState(false);
    const [isTmp, setTmp] = useState(false);
    const chatRef = createRef<HTMLUListElement>();
    const [gameSet, setGameSet] = useState<GameSet>(() => {
        if (game.state === "FINISHED") {
            let finishedSets = game.sets.filter(s => s.state === "FINISHED");
            return finishedSets[finishedSets.length - 1];
        }

        for (let set of game.sets) {
            if (set.state === "LIVE" || set.state === "NOT_STARTED")
                return set;

        }
        return game.sets[game.sets.length - 1];
    });

    const [startTime, setStartTime] = useState<Date | null>(null);

    const onScrollEvent = useCallback(() => {
        setTimeout(() => {
            if (chatRef.current)
                chatRef.current.scrollTop = chatRef.current.scrollHeight
        }, 100);
    }, [chatRef]);

    const [t] = useTranslation();

    useEffect(() => {
        if (isTmp && startTime === null) {
            let set = game.sets[gameSet.number - 1];
            if (set.homeScore === gameSet.homeScore || set.guestScore === gameSet.guestScore)
                setTmp(false);
        }
    }, [game.sets, gameSet, isTmp, startTime])

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
            let set = game.sets[gameSet.number - 1];
            if (isTmp === false) {
                if (set.homeScore !== gameSet.homeScore || set.guestScore !== gameSet.guestScore) {
                    setGameSet(game.sets[gameSet.number - 1]);
                }
            }
        }
    }, [show, game.sets, game.state, gameSet, startTime, isTmp])


    useEffect(() => {
        if (!show)
            onScrollEvent();
    }, [show, onScrollEvent])

    return (
        <Dialog
            fullWidth maxWidth="md"
            open={show}
            onClose={onClose}
        >
            <DialogContent sx={{ pb: 0 }}>

                <Stack direction="row" alignItems="center">
                    <LoadingButton loading={isLoading} disabled={isSetChangeDisabled(gameSet.number - 1)} onClick={() => setGameSet(game.sets[gameSet.number - 2])}>
                        <ExpandMoreIcon sx={{ transform: "rotate(90deg)" }} />
                    </LoadingButton>
                    <Box sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>{t("GameLiveEdit.set")} {gameSet.number}</Box>
                    <LoadingButton loading={isLoading} disabled={isSetChangeDisabled(gameSet.number + 1)} onClick={() => setGameSet(game.sets[gameSet.number])}>
                        <ExpandMoreIcon sx={{ transform: "rotate(-90deg)" }} />
                    </LoadingButton>
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
                <Divider sx={{ mt: 1 }} />
                <ChatMessageList messages={messages} ref={chatRef} sx={{ height: "10em" }} />
                <ChatAction matchId={matchId} onScrollEvent={onScrollEvent} isEditor={true} showAvatar={false} />
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog >
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
        setTmp(true);
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
            onUpdate(response.data)
        } else {
            console.log("Error while performing puGameSet request");
        }
        setStartTime(null);
        setLoading(false);
    }
}

export default GameLiveEditDialog;