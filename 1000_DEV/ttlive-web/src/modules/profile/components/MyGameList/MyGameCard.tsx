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
            <CardContent sx={{ display: { xs: "block", md: "flex" }, gap: { md: 2 } }}>
                <Typography >{date.format("DD.MM.YY")}</Typography>
                <Stack direction="row" width="100%" fontWeight="bold" gap={{ md: 2 }} alignItems={{ xs: "flex-start", md: "center" }}>
                    <Stack direction={{ xs: "column", md: "row" }} flexGrow={1} gap={{ md: 1 }}>
                        <Typography flexGrow={1} >{match.homeClub} {match.homeNumber}</Typography>
                        <Box display={{ xs: "none", md: "block" }}>-</Box>
                        <Typography flexGrow={1} >{match.guestClub} {match.guestNumber}</Typography>
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} gap={{ md: 1 }}>
                        <Typography>{match.homeTeamScore}</Typography>
                        <Box display={{ xs: "none", md: "block" }}>:</Box>
                        <Typography>{match.guestTeamScore}</Typography>
                    </Stack>
                </Stack>


            </CardContent>
            <CardActions sx={{ pl: 2, pr: 2, flexGrow: 1 }}>
                <Stack direction="row-reverse" flexGrow="1" >
                    <MyGameDeleteButton matchId={match.id} onDeleted={() => onMatchDeleted(match.id)} />
                    <StatisticsButton match={match} />
                    <Box sx={{ flexGrow: { md: 0, xs: 1, display:"flex", alignItems: "center" } }}>
                        <ToGameButton matchId={match.id} variant="text" />
                    </Box>
                </Stack>
            </CardActions>
        </Card >
    );
}

export default React.memo(MyGameCard);