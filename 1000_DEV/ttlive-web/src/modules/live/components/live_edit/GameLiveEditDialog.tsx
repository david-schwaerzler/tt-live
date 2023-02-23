import { Dialog, DialogContent, Stack, Box, Divider, DialogActions, IconButton } from "@mui/material";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GameLiveEditSpinner from "./GameLiveEditSpinner";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { putGameSet } from "../../../../rest/api/GameApi";
import { ChatMessage } from "../../../../rest/data/ChatMessage";
import { Game } from "../../../../rest/data/Game";
import { GameSet } from "../../../../rest/data/GameSet";
import { RequestGameSet } from "../../../../rest/data/RequestGameSet";
import ChatAction from "../../../chat/components/ChatActions";
import ChatMessageList from "../../../chat/components/ChatMessageList";
import LoadingButton from "../../../common/components/buttons/LoadingButton";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import GameLiveEditScore from "./GameLiveEditScore";
import GameLiveEditPlayer from "./GameLiveEditPlayer";

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
    const [isSwitched, setSwitched] = useState<boolean>(false);
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

                <Stack  direction={isSwitched ? "row-reverse" : "row"} mt={2}>
                    <GameLiveEditPlayer
                        sx={{ flex: "1 1 0", maxWidth: "50%" }}
                        player1={game.doubles ? game.homeDoubles.player1 : game.homePlayer.name}
                        player2={game.doubles ? game.homeDoubles.player2 : null}
                        sets={game.homeSets}
                    />

                    <GameLiveEditPlayer
                        sx={{ flex: "1 1 0", maxWidth: "50%" }}
                        player1={game.doubles ? game.guestDoubles.player1 : game.guestPlayer.name}
                        player2={game.doubles ? game.guestDoubles.player2 : null}
                        sets={game.guestSets}
                    />

                </Stack>
             
                <Stack direction={isSwitched ? "row-reverse" : "row"} mt={3} gap={1} mb={3} justifyContent="center">

                    <GameLiveEditScore
                        isLoading={isLoading}
                        score={gameSet.homeScore}
                        otherScore={gameSet.guestScore}
                        onUpdateScore={score => onUpdateScore(score, gameSet.guestScore)}
                    />

                    <Box display="flex" alignItems="center" justifyContent="center">
                        <IconButton sx={{ flexShrink: 1 }} onClick={e => setSwitched(!isSwitched)}>
                            <SwapHorizIcon color="primary" />
                        </IconButton>
                    </Box>

                    <GameLiveEditScore
                        isLoading={isLoading}
                        score={gameSet.guestScore}
                        otherScore={gameSet.homeScore}
                        onUpdateScore={score => onUpdateScore(gameSet.homeScore, score)}
                    />

                </Stack>

                <GameLiveEditSpinner startTime={startTime} onTimerEnd={() => onSendUpdate()} />
                <Divider sx={{ mt: 1 }} />
                <ChatMessageList messages={messages} ref={chatRef} sx={{ height: "10em" }} />
                <ChatAction matchId={matchId} onScrollEvent={onScrollEvent} isEditor={true} showAvatar={false} />
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog >
    );

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