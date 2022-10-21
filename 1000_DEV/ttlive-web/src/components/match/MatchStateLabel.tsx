import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

export interface MatchStateLabelProps {
    state: "NOT_STARTED" | "LIVE" | "FINISHED"
    sx?: any
}

const MatchStateLabel = ({ sx, state }: MatchStateLabelProps) => {


    const [t] = useTranslation();

    return (
        <Box sx={{
            opacity: getOpacity(),
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid",
            borderColor: getColor(),
            borderRadius: "10px",
            paddingLeft: "10px",
            paddingRight:
                "10px",
            ...sx
        }}>
            {state === "LIVE" && <Box sx={{ height: "10px", width: "10px", backgroundColor:"red", borderRadius: "50%", display: "inline-block" }} />}
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
                return ;
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
                return t("MatchStateLabel.notStarted");
            default:
                console.error(`Invalid matchStateLabel = '${state}. Must be 'LIVE', 'FINISHED', 'NOT_STARTED`);
        }
    }
}

export default MatchStateLabel;