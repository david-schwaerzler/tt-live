import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export interface MatchStateLabelProps {
    state: "NOT_STARTED" | "LIVE" | "FINISHED";
    sx?: any;
    variant?: "normal" | "border";
    startDate?: string;
}

const MatchStateLabel = ({ sx, state, variant = "normal", startDate }: MatchStateLabelProps) => {
    const [t] = useTranslation();
    const [text, setText] = useState<string>("");
    const [opacity, setOpacity] = useState<number>(1);
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        if (state === "LIVE") {
            setText(t("MatchStateLabel.live"));
            setColor("red");
            setOpacity(1);
            return;
        } else if (state === "NOT_STARTED") {
            setColor("green");
            setOpacity(1);
        } else {
            setColor("grey");
            setOpacity(0.5);
        }


        if (startDate == null) {
            switch (state) {
                case "FINISHED":
                    setText(t("MatchStateLabel.finished"))
                    return;
                case "NOT_STARTED":
                    setText(t("MatchStateLabel.soon"))
                    return;
            }
        }

        let matchDate: Dayjs = dayjs(startDate);
        let today: Dayjs = dayjs();
        let yesterday = today.subtract(1, "days");

        if (dateEquals(matchDate, today)) {
            setText(matchDate.format("HH:mm"))
        } else if (dateEquals(matchDate, yesterday)) {
            setText(t("MatchStateLabel.yesterday"));
        } else {
            setText(matchDate.format("DD.MM.YY"));
        }
    }, [startDate, state, t])

    return (
        <Box sx={{
            opacity: opacity,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            border: variant === "border" ? "2px solid" : "hidden",
            borderColor: color,
            borderRadius: "10px",
            paddingLeft: "10px",
            paddingRight:
                "10px",
            ...sx
        }}>
            {state === "LIVE" &&
                <React.Fragment>
                    <Box
                        sx={{
                            height: "10px",
                            width: "10px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            display: "inline-block"
                        }} />
                    <Box>&nbsp;</Box>
                </React.Fragment>
            }
            <Typography component="div" >
                <b>{text}</b>
            </Typography>
        </Box >
    )

    function dateEquals(date1: Dayjs, date2: Dayjs): boolean {
        return date1.year() === date2.year()
            && date1.month() === date2.month()
            && date1.day() === date2.day();
    }
}

export default MatchStateLabel;