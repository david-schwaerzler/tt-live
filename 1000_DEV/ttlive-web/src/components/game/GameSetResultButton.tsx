import { Button, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, Radio, Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { putGameSet } from "../../rest/api/GameApi";
import { Game } from "../../rest/data/Game";
import { GameSet } from "../../rest/data/GameSet";
import { RequestGameSet } from "../../rest/data/RequestGameSet";
import LoadingButton from "../utils/LoadingButton";

export interface GameSetResultButtonProps {
    disabled: boolean
    won: boolean;
    isHome: boolean;
    editorCode: string;
    set: GameSet
    game: Game;
    onError: (msg: string) => void;
}

const GameSetResultButton = ({ disabled, won, set, game, isHome, editorCode, onError }: GameSetResultButtonProps) => {

    const [show, setShow] = useState<boolean>(false);
    const [selectedNumber, setSelectedNumber] = useState<number>(() => {
        if (set.homeScore === 0 && set.guestScore === 0) {
            return 6;
        }
        return isHome ? set.guestScore : set.homeScore;
    });
    const [isHomeState, setHomeState] = useState<boolean>(isHome);
    const [otherScore, setOtherScore] = useState<number>(11);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setHomeState(!isHome)
    }, [isHome]);

    useEffect(() => {
        if (selectedNumber > 9)
            setOtherScore(selectedNumber + 2);
        else {
            setOtherScore(11);
        }
    }, [selectedNumber])

    useEffect(() => {
        if (show) {
            if (set.homeScore === 0 && set.guestScore === 0) {
                setSelectedNumber(6);
                return;
            }

            setSelectedNumber(isHome ? set.guestScore : set.homeScore);
        }
    }, [show, isHome, set.guestScore, set.homeScore])

    const [t] = useTranslation();

    let buttonScore = isHome ? set.homeScore : set.guestScore;

    return (
        <Box sx={{}}>
            <Button disabled={disabled} variant="outlined" sx={{ pt: "3px", pb: "3px", pl: "0px", pr: "0px", minWidth: "95%" }} onClick={() => setShow(true)}>
                {disabled ? <Typography fontSize="0.8rem" >-</Typography> :
                    won
                        ? <Typography fontSize="0.8rem" sx={{ fontWeight: "bold" }}>{buttonScore === -1 ? "?" : buttonScore}</Typography>
                        : <Typography fontSize="0.8rem">{buttonScore === -1 ? "?" : buttonScore}</Typography>
                }
            </Button>
            <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="md" PaperProps={{ sx: { position: "fixed", top: theme => theme.spacing(5) } }} >
                <DialogTitle>Set backup account</DialogTitle>
                <DialogContent sx={{ mt: 1 }}>
                    <Stack gap={2}>
                        <Grid container rowSpacing={2}>
                            <Grid item xs={6} textAlign="center"><Typography fontSize={{ xs: game.doubles ? "0.9rem" : "1rem", sm: "2rem" }}>{renderPlayer(true)}</Typography></Grid>
                            <Grid item xs={6} textAlign="center"><Typography fontSize={{ xs: game.doubles ? "0.9rem" : "1rem", sm: "2rem" }}>{renderPlayer(false)}</Typography></Grid>
                            <Grid item xs={6} textAlign="center">
                                {isHomeState
                                    ? <Typography fontSize="2rem" fontWeight="bold">{otherScore}</Typography>
                                    : renderInput()
                                }
                            </Grid>
                            <Grid item xs={6} textAlign="center">
                                {isHomeState
                                    ? renderInput()
                                    : <Typography fontSize="2rem" fontWeight="bold">{otherScore}</Typography>
                                }
                            </Grid>
                        </Grid>

                        <Stack direction="row" gap={2} alignItems="center">
                            <Slider min={0} max={11} value={selectedNumber} onChange={(e, value) => setSelectedNumber(value as number)} sx={{ mr: 2 }} />
                            <FormControlLabel value="female" control={<Radio checked={isHomeState} onClick={() => setHomeState(!isHomeState)} />} label="Heim?" />
                        </Stack>
                        <LoadingButton loading={isLoading} variant="outlined" onClick={() => onNumberSelected()}>{t("Common.ok")}</LoadingButton>
                    </Stack>

                </DialogContent>
            </Dialog>
        </Box >
    );

    function renderInput() {
        const onChange = (e: any) => {
            let number = parseInt(e.target.value)
            if (isNaN(number))
                setSelectedNumber(-1)
            else
                setSelectedNumber(number)
        }
        return <TextField autoFocus value={selectedNumber === -1 ? "" : selectedNumber} onChange={onChange} type="number" />;
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
        let guestScore = isHomeState ? selectedNumber : otherScore ;

        let requestGameSet: RequestGameSet = {
            number: set.number,
            homeScore: homeScore,
            guestScore: guestScore
        }

        setLoading(true);
        let response = await putGameSet(game.id, editorCode, requestGameSet);
        if (response.data != null) {
            //onUpdate(response.data)
        } else {
            onError("Error while performing puGameSet request");
        }
        setLoading(false);
        setShow(false);
    }

}

export default GameSetResultButton;