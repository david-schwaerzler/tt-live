import { Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface MatchStateLabelProps {
    state: "NOT_STARTED" | "LIVE" | "FINISHED";
    sx?: SxProps;
    variant?: "normal" | "border";
    startDate?: string;
}

const MatchStateLabel = ({ sx, state, variant = "normal", startDate }: MatchStateLabelProps) => {
    const [t] = useTranslation();

    const [time, setTime] = useState<string | null>(null);
    useEffect(() => {
        setTime(dayjs(startDate).format("HH:mm"));
    }, [startDate])

    return (
        <Box sx={{
            opacity: getOpacity(),
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            border: variant === "border" ? "2px solid" : "hidden",
            borderColor: getColor(),
            borderRadius: "10px",
            paddingLeft: "10px",
            paddingRight:
                "10px",
            ...sx
        }}>
            {state === "LIVE" && <Box sx={{ height: "10px", width: "10px", backgroundColor: "red", borderRadius: "50%", display: "inline-block" }} />}
            {state === "LIVE" && <Box>&nbsp;</Box>}
            <Typography component="div" >
                <b>{renderText()}</b>
            </Typography>
        </Box >
    )

    function getColor() {
        switch (state) {
            case "LIVE":
                return "red";
            case "FINISHED":
                return "grey";
            case "NOT_STARTED":
                return "green";
            default:
                console.error(`Invalid matchStateLabel = '${state}. Must be 'LIVE', 'FINISHED', 'NOT_STARTED`);
        }
    }

    function getOpacity() {
        switch (state) {
            case "LIVE":
                return 1;
            case "FINISHED":
                return 0.5;
            case "NOT_STARTED":
                return;
            default:
                console.error(`Invalid matchStateLabel = '${state}. Must be 'LIVE', 'FINISHED', 'NOT_STARTED`);
        }
    }

    function renderText() {
        switch (state) {
            case "LIVE":
                return t("MatchStateLabel.live");
            case "FINISHED":
                return t("MatchStateLabel.finished");
            case "NOT_STARTED":
                return time == null ? t("MatchStateLabel.notStarted") : time;
            default:
                console.error(`Invalid matchStateLabel = '${state}. Must be 'LIVE', 'FINISHED', 'NOT_STARTED`);
        }
    }
}

export default MatchStateLabel;