import { Grid } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

interface GameReportPlayerCellProps {
    player1: string;
    player2?: string | null;
    won: boolean;
}
const GameReportPlayerCell = ({ player1, player2, won }: GameReportPlayerCellProps) => {

    const [t] = useTranslation();

    return (
        <Grid
            sx={{
                textAlign: "left",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
                fontSize: "0.9rem",
                fontWeight: won ? 500 : "normal",
                pr: 1                
            }}
            item
            xs={5}>
            {player1 === ""
                ? <i>{t("GameReport.noPlayer")}</i>
                : player1
            }
            {player2 != null && (player2 === ""
                ? <React.Fragment><br /><i>{t("GameReport.noPlayer")}</i> </React.Fragment >
                : <React.Fragment><br />{player2}</React.Fragment>
            )}
        </Grid>
    )
};

export default React.memo(GameReportPlayerCell);