import { Button, Dialog, DialogContent, DialogTitle, Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
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
    onUpdate: (game: Game) => void;
    onError: (msg: string) => void;
}

const GameSetResultButton = ({ disabled, won, set, game, isHome, editorCode, onUpdate, onError }: GameSetResultButtonProps) => {

    const [show, setShow] = useState<boolean>(false);
    const [selectedNumber, setSelectedNumber] = useState<number>(() => {
        if (set.homeScore === 0 && set.guestScore === 0)
            return 6;

        return isHome ? set.guestScore : set.homeScore

    });
    const [isLoading, setLoading] = useState(false);

    const [t] = useTranslation();

    let score = isHome ? set.homeScore : set.guestScore;

    return (
        <Box sx={{}}>
            <Button disabled={disabled} variant="outlined" sx={{ pt: "3px", pb: "3px", pl: "0px", pr: "0px", minWidth: "95%" }} onClick={() => setShow(true)}>
                {disabled ? <Typography fontSize="0.8rem" >-</Typography> :
                    won
                        ? <Typography fontSize="0.8rem" sx={{ fontWeight: "bold" }}>{score === -1 ? "?" : score}</Typography>
                        : <Typography fontSize="0.8rem">{score === -1 ? "?" : score}</Typography>
                }
            </Button>
            <Dialog open={show} onClose={() => setShow(false)} PaperProps={{sx: {position: "fixed", top: theme => theme.spacing(10)}}}>
                <DialogTitle>Set backup account</DialogTitle>
                <DialogContent >
                    <Stack>
                        <TextField autoFocus value={selectedNumber} onChange={e => setSelectedNumber(parseInt(e.target.value))} type="number" />
                        <Slider min={0} max={11} value={selectedNumber} onChange={(e, value) => setSelectedNumber(value as number)}></Slider>
                        <LoadingButton loading={isLoading} variant="outlined" onClick={() => onNumberSelected()}>{t("Common.ok")}</LoadingButton>
                    </Stack>

                </DialogContent>
            </Dialog>
        </Box >
    );

    async function onNumberSelected() {
        let homeScore = isHome ? selectedNumber > 9 ? selectedNumber + 2 : 11 : selectedNumber;
        let guestScore = !isHome ? selectedNumber > 9 ? selectedNumber + 2 : 11 : selectedNumber;

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