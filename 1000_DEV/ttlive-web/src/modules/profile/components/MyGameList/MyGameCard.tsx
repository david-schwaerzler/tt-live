import { Card, CardContent, Box, CardActions, Typography, Stack } from "@mui/material";
import { SimpleMatch } from "../../../../rest/data/Match";
import ToGameButton from "../../../common/components/buttons/ToGameButton";
import StatisticsButton from "./StatisticsButton";
import dayjs from "dayjs";
import { useMemo } from "react";
import React from "react";
import MyGameDeleteButton from "./MyGameDeleteDialog";


export interface MyGameCardProps {
    match: SimpleMatch;
    onMatchDeleted: (matchId: number) => void;
}

const MyGameCard = ({ match, onMatchDeleted }: MyGameCardProps) => {

    const date = useMemo(() => dayjs(match.startDate), [match.startDate]);
    return (
        <Card key={match.id} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }} elevation={3}>
            <CardContent>
                <Typography sx={{ float: "right" }}>{date.format("DD.MM.YY")}</Typography>
                <Stack direction="row" width="100%" fontWeight="bold" gap={{ md: 2 }} alignItems={{ xs: "flex-start", md: "center" }}>
                    <Stack direction={{ xs: "column", md: "row" }} flexGrow={1}>
                        <Typography flexGrow={1} >{match.homeClub} {match.homeNumber}</Typography>
                        <Box display={{ xs: "none", md: "block" }}>-</Box>
                        <Typography flexGrow={1} >{match.guestClub} {match.guestNumber}</Typography>
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} >
                        <Typography>{match.homeTeamScore}</Typography>
                        <Box display={{ xs: "none", md: "block" }}>:</Box>
                        <Typography>{match.guestTeamScore}</Typography>
                    </Stack>
                </Stack>

            </CardContent>
            <CardActions sx={{ pr: 2, flexGrow: 1 }}>
                <Stack direction="row" flexGrow="1" alignItems="center">
                    <MyGameDeleteButton matchId={match.id} onDeleted={() => onMatchDeleted(match.id)} />
                    <StatisticsButton match={match} />
                    <ToGameButton matchId={match.id} variant="text" />
                </Stack>
            </CardActions>
        </Card >
    );
}

export default React.memo(MyGameCard);