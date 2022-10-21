import { Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GameStyle } from "../../rest/data/GameStyle";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";
import { MatchPosition } from "./MatchPosition";

export interface LineUpFormProps {
    gameStyle: GameStyle
}

const LineUpForm = ({ gameStyle }: LineUpFormProps) => {

    const [doubles, setDoubles] = useState<Array<MatchPosition>>([]);
    const [singles, setSingles] = useState<Array<MatchPosition>>([]);

    useEffect(() => {
        if (gameStyle == null) {
            //updateError(ERROR_GENERAL, "LineUpForm.errorGameState");
            return;
        }

        let doubles: Array<MatchPosition> = [];
        let singles: Array<MatchPosition> = [];
        for (let i = 0; i < gameStyle.numDoubles; i++) {
            doubles.push({ isDouble: true, player1: "", player2: "", position: i + 1 });
        }
        for (let i = 0; i < gameStyle.numPlayers; i++) {
            singles.push({ isDouble: false, player1: "", player2: "", position: i + 1 });
        }
        setDoubles(doubles);
        setSingles(singles);

    },[gameStyle.numPlayers, gameStyle.numDoubles]);

    const [t] = useTranslation();
    return (
        <Box>
            <Typography variant="h5" sx={{ textAlign: "center", padding: spacingNormal }}>
                {t('TeamState.lineup')}
            </Typography>

            <Stack direction="column" sx={{ justifyContent: "space-evenly", alignContent: "center", paddingTop: spacingNormal, gap: spacingSmall }}>
                {doubles.map((value) => (
                    <Stack key={value.position} direction="row" sx={{ justifyContent: "center", gap: spacingNormal }}>
                        <TextField label={t('TeamState.double') + " " + value.position + " - " + t('TeamState.player') + " 1"} variant="outlined" />
                        <TextField label={t('TeamState.double') + " " + value.position + " - " + t('TeamState.player') + " 2"} variant="outlined" />
                    </Stack>
                ))}
                {singles.map((value) => (
                    <TextField key={value.position} sx={{ minWidth: "200px", alignSelf: "center" }} label={t("TeamState.player") + " " + value.position} variant="outlined" />
                ))}
            </Stack>
        </Box>
    );

}

export default LineUpForm;