import styled from "@emotion/styled";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo } from "react";
import { useAuthUser } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { Account } from "../../../rest/data/Account";
import { StateProps } from "./StateProps";

const BoldGrid = styled(Grid)({
    fontWeight: "bold",
})

type Entry = { key: string, value: string | null | undefined };

const SummaryState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {

    const [t] = useTranslation();
    const authUser = useAuthUser();

    let values: Array<Entry> = useMemo(() => {
        let account = authUser() as Account | null;
        let values: Array<Entry> = [];
        values.push({ key: t("SummaryState.region"), value: matchStateObject.region?.name });
        values.push({ key: t("SummaryState.contest"), value: matchStateObject.contest === "MEN" ? t("RegionState.contestMen") : t("RegionState.contestWomen") });
        values.push({ key: t("SummaryState.league"), value: matchStateObject.league?.name });
        values.push({ key: t("SummaryState.gameStyle"), value: matchStateObject.gameStyle?.name });
        values.push({ key: t("SummaryState.homeTeam"), value: matchStateObject.homeTeam?.club + " " + matchStateObject.homeTeam?.number });
        values.push({ key: t("SummaryState.guestTeam"), value: matchStateObject.guestTeam?.club + " " + matchStateObject.guestTeam?.number });
        values.push({ key: t("SummaryState.startDate"), value: matchStateObject.startDate?.format("YYYY-MM-DD HH:mm") });
        values.push({ key: t("SummaryState.visibility"), value: matchStateObject.visibility === "PRIVATE" ? t("MatchVisibility.private") : t("MatchVisibility.public") });
        values.push({ key: t("SummaryState.account"), value: account?.username ?? t("SummaryState.noAccount") });
        return values;
    }, [matchStateObject, authUser, t])

    return (
        <Box sx={{ width: "100%", margin: "auto" }}>

            <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
                {t('CreateGameView.stepSummary')}
            </Typography>


            {values.map((value, index) => (
                <Grid key={index} container direction={{ xs: "column", sm: "row" }} sx={{ pb: 2, display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", textAlign: "left" }}>
                    <BoldGrid item xs={6} md={5} sx={{ textAlign: "right" }}>{value.key}</BoldGrid>
                    <Grid item xs={6} md={5} sx={{ textAlign: "left" }}>{value.value}</Grid>
                </Grid>
            ))}
        </Box>
    )

}

export default SummaryState;


