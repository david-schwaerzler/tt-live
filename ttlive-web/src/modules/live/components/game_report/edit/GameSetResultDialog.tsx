import { Box, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Radio, Slider, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { putGameSet } from "../../../../../rest/api/GameApi";
import { Game } from "../../../../../rest/data/Game";
import { GameSet } from "../../../../../rest/data/GameSet";
import { RequestGameSet } from "../../../../../rest/data/RequestGameSet";
import LoadingButton from "../../../../common/components/buttons/LoadingButton";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export interface GameSetResultDialogProps {
    set: GameSet;
    game: Game;
    isHome: boolean;
    show: boolean;
    editorCode: string;
    onUpdate: (game: Game) => void;
    onError: (error: string) => void;
    onClose: () => void;
}

const GameSetResultDialog = ({ set, isHome, show, game, editorCode, onClose, onError, onUpdate }: GameSetResultDialogProps) => {

    const [selectedNumber, setSelectedNumber] = useState<number>(() => {
        if (set.homeScore === 0 && set.guestScore === 0) {
            return 6;
        }
        return isHome ? set.homeScore : set.guestScore;
    });
    const [isHomeState, setHomeState] = useState<boolean>(!isHome);
    const [otherScore, setOtherScore] = useState<number>(selectedNumber > 9 ? selectedNumber + 2 : 11);
    const [isLoading, setLoading] = useState(false);
    const [isUnset, setUnset] = useState(false);
    const [t] = useTranslation();

    useEffect(() => {
        setHomeState(!isHome)
    }, [isHome, show]);

    useEffect(() => {
        setOtherScore(selectedNumber > 9 ? selectedNumber + 2 : 11);
        setUnset(false)
    }, [selectedNumber])

    useEffect(() => {
        if (show) {
            if (set.homeScore === 0 && set.guestScore === 0) {
                setSelectedNumber(6);
                return;
            }
            setSelectedNumber(isHome ? set.homeScore : set.guestScore);
        }
    }, [show, isHome, set.guestScore, set.homeScore])

    return (
        <Dialog open={show} onClose={() => onClose()} fullWidth maxWidth="md" PaperProps={{ sx: { position: "fixed", top: theme => theme.spacing(5) } }}>
            <DialogTitle sx={{display: "flex", alignItems: "center"}}>
                <Box flexGrow="1">
                    {t("GameSetResult.title")}
                </Box>
                <FormControlLabel sx={{ float: "right" }} value="reset" control={<Radio checked={isUnset} onClick={() => setUnset(!isUnset)} />} label={t("GameSetResult.unset")} />
            </DialogTitle>

            <DialogContent sx={{ mt: 1 }}>
                <Stack gap={2}>
                    <Grid container rowSpacing={2} columnSpacing={1}>
                        <Grid item xs={6} textAlign="center"><Typography fontSize={{ xs: game.doubles ? "0.9rem" : "1rem", sm: "2rem" }}>{renderPlayer(true)}</Typography></Grid>
                        <Grid item xs={6} textAlign="center"><Typography fontSize={{ xs: game.doubles ? "0.9rem" : "1rem", sm: "2rem" }}>{renderPlayer(false)}</Typography></Grid>

                        <Grid item xs={1} />
                        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
                            {isHomeState
                                ? <Typography fontSize="2rem" fontWeight="bold">{isUnset ? 0 : otherScore}</Typography>
                                : renderInput()
                            }
                        </Grid>
                        <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                            <IconButton onClick={() => setHomeState(!isHomeState)}>
                                <SwapHorizIcon color="primary" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={4} display="flex" justifyContent="center" alignItems="center" textAlign="center">
                            {isHomeState
                                ? renderInput()
                                : <Box >
                                    <Typography fontSize="2rem" fontWeight="bold" m="auto">{isUnset ? 0 : otherScore}</Typography>
                                </Box>
                            }
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>

                    <Slider min={0} max={11} value={isUnset ? 0 : selectedNumber} onChange={(e, value) => setSelectedNumber(value as number)} sx={{ mr: 2 }} />

                    <LoadingButton loading={isLoading} variant="outlined" onClick={() => onNumberSelected()}>{t("Common.ok")}</LoadingButton>
                </Stack>

            </DialogContent>
        </Dialog>
    );

    function renderInput() {
        const onChange = (e: any) => {
            let number = parseInt(e.target.value)
            if (isNaN(number))
                setSelectedNumber(-1)
            else
                setSelectedNumber(number)
        }

        return <TextField
            sx={{ width: "60px" }}
            inputProps={{ style: { textAlign: "center", fontSize: "2rem", fontWeight: "bold", padding: "5px 0px" } }}
            autoFocus
            value={isUnset ? "0" : selectedNumber === -1 ? "" : selectedNumber}
            onChange={onChange}
            type="tel"
            autoComplete="off"
        />;
    }

    function renderPlayer(isHome: boolean) {
        if (isHome) {
            if (game.doubles)
                return <React.Fragment>{game.homeDoubles.player1}<br />{game.homeDoubles.player2}</React.Fragment>;
            return <React.Fragment>{game.homePlayer.name}</React.Fragment>;
        } else {
            if (game.doubles)
                return <React.Fragment>{game.guestDoubles.player1}<br />{game.guestDoubles.player2}</React.Fragment>;
            return <React.Fragment>{game.guestPlayer.name}</React.Fragment>;
        }
    }

    async function onNumberSelected() {
        let homeScore = isHomeState ? otherScore : selectedNumber;
        let guestScore = isHomeState ? selectedNumber : otherScore;

        if (isUnset) {
            homeScore = 0;
            guestScore = 0;
        }

        let requestGameSet: RequestGameSet = {
            number: set.number,
            homeScore: homeScore,
            guestScore: guestScore
        }

        setLoading(true);
        let response = await putGameSet(game.id, editorCode, requestGameSet);
        if (response.data != null) {
            onUpdate(response.data)
        } else {
            onError("Error while performing puGameSet request");
        }
        setLoading(false);
        onClose();
    }
}

export default GameSetResultDialog;