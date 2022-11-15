import { CircularProgress, Radio, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { putGameSet } from "../../rest/api/GameApi";
import { Game } from "../../rest/data/Game";
import { RequestGameSet } from "../../rest/data/RequestGameSet";

export interface GameSetResultRadioProps {
    disabled: boolean;
    selected: boolean;
    isHome: boolean;
    editorCode: string;
    onError: (msg: string) => void;
    onUpdate: (game: Game) => void;
    setNumber: number
    gameId: number
}

const GameSetResultRadio = ({ disabled, selected, isHome, editorCode, setNumber, gameId, onError, onUpdate }: GameSetResultRadioProps) => {

    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));
    const [isLoading, setLoading] = useState(false);


    if (isLoading) {
        return <CircularProgress sx={{ mt: "6px" }} size={isBig ? 20 : 16} color="primary" />
    }

    return (
        <Radio
            disabled={disabled}
            size={isBig ? "medium" : "small"}
            sx={{ p: "0px", mt: "-3px" }}
            color="primary"
            name="radio-button-demo"
            checked={selected} onClick={() => onRadioClicked(isHome, !selected)}
        />
    );

    async function onRadioClicked(isHome: boolean, selected: boolean) {       

        let homeScore = 0;
        let guestScore = 0;
        if (selected) {
            homeScore = isHome ? 11 : -1;
            guestScore = !isHome ? 11 : -1;
        }

        let requestGameSet: RequestGameSet = {
            number: setNumber,
            homeScore: homeScore,
            guestScore: guestScore
        }

        setLoading(true);
        let response = await putGameSet(gameId, editorCode, requestGameSet);
        if (response.data != null) {
            onUpdate(response.data)
        } else {
            onError("Error while performing puGameSet request");
        }
        setLoading(false);
    }
}

export default GameSetResultRadio;