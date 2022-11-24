import { Box, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Typography } from "@mui/material";
import React, { createRef, useEffect, useState } from "react";
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

    useEffect(() => {
        if (show) {
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
        }
    }, [show, game.sets, game.state])

    return (
        <React.Fragment>
            <IconButton onClick={() => setShow(true)} sx={{ mt: "auto", mb: "auto", p: 0, display: "flex", justifyContent: "right" }}>
                <EditIcon sx={{ width: "20px", }} />
            </IconButton>
            <Dialog
                fullWidth maxWidth="md"
                open={show}
                onClose={() => setShow(false)}>
                <DialogContent sx={{ pb: 0 }}>

                    <Stack direction="row" alignItems="center">
                        <LoadingButton loading={isLoading} disabled={isSetChangeDisabled(gameSet.number - 1)} onClick={() => setGameSet(game.sets[gameSet.number - 2])}><ExpandMoreIcon sx={{ transform: "rotate(90deg)" }} /></LoadingButton>
                        <Box sx={{ flexGrow: 1, textAlign: "center" }}>Satz {gameSet.number}</Box>
                        <LoadingButton loading={isLoading} disabled={isSetChangeDisabled(gameSet.number + 1)} onClick={() => setGameSet(game.sets[gameSet.number])}><ExpandMoreIcon sx={{ transform: "rotate(-90deg)" }} /></LoadingButton>
                    </Stack>

                    <Grid container sx={{ justifyContent: "center", textAlign: "center", paddingBottom: spacingSmall, mt: 2 }} columnSpacing={2} rowSpacing={1}>
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
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={gameSet.homeScore >= 11 && gameSet.homeScore - gameSet.guestScore >= 2}
                                onClick={() => onUpdateScore(gameSet.homeScore + 1, gameSet.guestScore)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon sx={{ transform: "rotate(180deg)" }} />
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={gameSet.guestScore >= 11 && gameSet.guestScore - gameSet.homeScore >= 2}
                                onClick={() => onUpdateScore(gameSet.homeScore, gameSet.guestScore + 1)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon sx={{ transform: "rotate(180deg)" }} />
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize="2rem" fontWeight="bold">{gameSet.homeScore}</Typography>

                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize="2rem" fontWeight="bold">{gameSet.guestScore}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={gameSet.homeScore <= 0}
                                onClick={() => onUpdateScore(gameSet.homeScore - 1, gameSet.guestScore)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon />
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={6}>
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                disabled={gameSet.guestScore <= 0}
                                onClick={() => onUpdateScore(gameSet.homeScore, gameSet.guestScore - 1)}
                                sx={{ m: "auto" }}
                            >
                                <ExpandMoreIcon />
                            </LoadingButton>
                        </Grid>


                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                    <ChatMessageList messages={messages} ref={chatRef} sx={{ height: "10em" }} />
                    <ChatAction matchId={matchId} onTextFieldFocused={onTextFieldFocus} isEditor={true} />
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );

    function isSetChangeDisabled(nextSetNumber: number) {
        if (nextSetNumber > 5 || nextSetNumber < 1)
            return true;

        let nextSet = game.sets[nextSetNumber - 1];
        if (nextSet == null)
            return true;

        if (gameSet.state !== "FINISHED" && nextSet.state === "NOT_STARTED")
            return true;

        if(game.state === "FINISHED" && nextSet.state === "NOT_STARTED")
            return true;
        

        return false;
    }

    async function onUpdateScore(homeScore: number, guestScore: number) {
        let requestGameSet: RequestGameSet = {
            number: gameSet.number,
            homeScore: homeScore,
            guestScore: guestScore
        }

        setLoading(true);
        let response = await putGameSet(game.id, editorCode, requestGameSet);
        if (response.data != null) {
            //onUpdate(response.data)
        } else {
            console.log("Error while performing puGameSet request");
        }
        setLoading(false);
    }

    function onTextFieldFocus() {
        setTimeout(() => {
            if (chatRef.current)
                chatRef.current.scrollTop = chatRef.current.scrollHeight
        }, 100);
    }
}


export default GameLiveEdit;