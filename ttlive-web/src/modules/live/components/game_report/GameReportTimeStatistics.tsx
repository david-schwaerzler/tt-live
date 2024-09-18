import { Card, CardContent, Typography, Stack } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MatchState } from "../../../../rest/data/Match";
import { StatisticsCard } from "./GameReportStatistics";

interface GameReportTimeStatisticProps {
    startDate: string | null;
    endDate: string | null;
    matchState: MatchState;
}

const GameReportTimeStatistic = ({ startDate, endDate, matchState }: GameReportTimeStatisticProps) => {

    const [t] = useTranslation();

    let dates: { startDate: string, endDate: string, duration: string } = useMemo(() => {

        let start: Dayjs | null = startDate == null ? null : dayjs(startDate);
        let end: Dayjs | null = endDate == null ? null : dayjs(endDate);


        let duration = "-";
        if (start != null && end != null) {
            let diffMin = end.diff(start, "minute");
            duration = diffMin < 0 ? "-" : `${Math.floor(diffMin / 60)}h ${diffMin % 60}min`;
        }

        return {
            startDate: start == null ? "-" : start.format("DD.MM.YY HH:mm"),
            endDate: end == null ? "-" : end.format("DD.MM.YY HH:mm"),
            duration: duration
        }
    }, [startDate, endDate])

    if (matchState !== "FINISHED")
        return null;

    return (
        <Card>
            <CardContent>
                <Typography pb={2} variant="h5" >{t("GameReport.timeStatistic")}</Typography>
                <Stack direction="row" justifyContent="space-around" flexWrap="wrap" rowGap={2} columnGap={4}>
                    <StatisticsCard
                        title={t("GameReport.startDate")}
                        value={dates.startDate}
                    />

                    <StatisticsCard
                        title={t("GameReport.endDate")}
                        value={dates.endDate}
                    />

                    <StatisticsCard
                        title={t("GameReport.duration")}
                        value={dates.duration}
                    />

                </Stack>
            </CardContent>
        </Card>
    )
}

export default GameReportTimeStatistic;