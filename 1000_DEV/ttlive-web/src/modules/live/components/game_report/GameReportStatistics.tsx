import { Card, CardContent, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Game } from "../../../../rest/data/Game";
import { useMatchStatistics } from "../../../common/hooks/useMatchStatistics";
import { useBackDialogHandler } from "../../../common/hooks/useBackDialogHandler";

export interface GameResportStatisticsProps {
    games: Array<Game>;
}

const GameResportStatistics = ({ games }: GameResportStatisticsProps) => {


    const statistics = useMatchStatistics(games);

    const [t] = useTranslation();
    return (
        <Card>
            <CardContent>
                <Typography pb={2} variant="h5" >{t("GameReport.statistics")}</Typography>

                <Stack direction="row" justifyContent="space-around" flexWrap="wrap" rowGap={2} columnGap={4}>
                    <StatisticsCard
                        title={t("GameReport.sets")}
                        value={statistics.sets.homeValue + " : " + statistics.sets.guestValue}
                        tooltip={<Trans i18nKey="GameReport.setsTooltip" />}
                    />

                    <StatisticsCard
                        title={t("GameReport.points")}
                        value={statistics.points.homeValue + " : " + statistics.points.guestValue}
                        tooltip={<Trans i18nKey="GameReport.pointsTooltip" />}
                    />

                    <StatisticsCard
                        title={t("GameReport.lastSets")}
                        value={statistics.lastSet.homeValue + " : " + statistics.lastSet.guestValue}
                        tooltip={<Trans i18nKey="GameReport.lastSetsTooltip" />}
                    />

                    <StatisticsCard
                        title={t("GameReport.closeSets")}
                        value={statistics.closeSets.homeValue + " : " + statistics.closeSets.guestValue}
                        tooltip={<Trans i18nKey="GameReport.closeSetsTooltip" />}
                    />
                    <StatisticsCard
                        title={t("GameReport.comebacks")}
                        value={statistics.comeback.homeValue + " : " + statistics.comeback.guestValue}
                        tooltip={<Trans i18nKey="GameReport.comebackTooltips" />}
                    />

                </Stack>
            </CardContent>
        </Card>
    )
}

interface StatisticsCardProps {
    title: string;
    value: string;
    tooltip: string | React.ReactNode;
}

const StatisticsCard = ({ title, value, tooltip }: StatisticsCardProps) => {

    const [open, setOpen] = useState<boolean>(false);;
    useBackDialogHandler(open, show => setOpen(show));

    return <React.Fragment>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle >{title}</DialogTitle>
            <DialogContent sx={{ whiteSpace: "pre-wrap" }}>
                {tooltip}
            </DialogContent>
        </Dialog>
        <Box onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
            <Typography fontWeight="bold" textAlign="center">{title}</Typography>
            <Typography textAlign="center">{value}</Typography>
        </Box>
    </React.Fragment>

};

export default React.memo(GameResportStatistics);

