import { LinearProgress, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export interface GameLiveEditSpinnerProps {
    startTime: Date | null;
    onTimerEnd: () => void;
}

const Spinner = styled(LinearProgress)(({ theme }) => ({
    color: theme.palette.primary.main,
    ".MuiLinearProgress-bar": {
        '&[aria-valuenow="100"]': {
            transition: "none"

        }
    }

}));

const GameLiveEditSpinner = ({ startTime, onTimerEnd }: GameLiveEditSpinnerProps) => {

    const [value, setValue] = useState(100);
    const [reset, setReset] = useState(false);

    const ref = useRef(startTime);

    useEffect(() => {
        if (reset)
            return;

        const intervalId = setInterval(() => {
            if (ref.current == null) {
                clearInterval(intervalId);
                return;
            }

            let current = new Date();
            let diff = current.getTime() - ref.current.getTime();

            if (diff >= 1500) {
                onTimerEnd();
                return;
            }
            setValue(100 - diff / 10);
        }, 100)
        return () => clearInterval(intervalId);
    }, [ref, reset, onTimerEnd])

    useEffect(() => {
        if (startTime == null) {
            ref.current = null;
            return;
        }
        setReset(true);       
        setValue(100);

        setTimeout(() => {
            ref.current = new Date();
            setReset(false)
        }, 50);

    }, [startTime])


    return <Spinner
        value={value}
        variant="determinate"
        sx={[{ visibility: startTime == null ? "hidden" : "visible" }, { ".MuiLinearProgress-bar": { ...(reset && { transition: "none" }) } }]}

    />

}

export default GameLiveEditSpinner;