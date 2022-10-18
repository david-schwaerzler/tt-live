import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { spacingNormal } from "../../utils/StyleVars";
import { StateProps } from "./StateProps";

const BoldGrid = styled(Grid)({
    fontWeight: "bold",
})

type Entry = { key: string, value: string | null | undefined };

const SummaryState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {

    const [t] = useTranslation();
    const [values, setValues] = useState<Array<Entry>>([]);

    useEffect(() => {

        let values: Array<Entry> = [];
        values.push({ key: t("SummaryState.region"), value: matchStateObject.region?.name });
        values.push({ key: t("SummaryState.contest"), value: matchStateObject.contest });
        values.push({ key: t("SummaryState.league"), value: matchStateObject.league?.name });
        values.push({ key: t("SummaryState.gameStyle"), value: matchStateObject.gameStyle?.name });
        values.push({ key: t("SummaryState.contest"), value: matchStateObject.contest });
        values.push({ key: t("SummaryState.homeTeam"), value: matchStateObject.homeTeam?.club + " " + matchStateObject.homeTeam?.number });
        values.push({ key: t("SummaryState.guestTeam"), value: matchStateObject.guestTeam?.club + " " + matchStateObject.guestTeam?.number });
        setValues(values);
    }, [matchStateObject, t])

    return (
        <Box sx={{ width: "100%", margin: "auto" }}>

            <Typography variant="h5" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                {t('CreateGameView.stepSummary')}
            </Typography>

            
            {values.map((value, index) => (
                <Grid key={index} container direction={{ xs: "column", md: "row" }} sx={{ paddingBottom: {...spacingNormal, md: "0"}, display:"flex", justifyContent: "space-evenly", alignItems: "flex-start" , textAlign: "left"}}>
                    <BoldGrid item xs={6} md={5} sx={{textAlign: "right"}}>{value.key}</BoldGrid>
                    <Grid item xs={6} md={5} sx={{textAlign: "left"}}>{value.value}</Grid>
                </Grid>
            ))}          
        </Box>
    )

}

export default SummaryState;


