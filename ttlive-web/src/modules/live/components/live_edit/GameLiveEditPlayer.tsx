import { Box, Typography } from "@mui/material";
import { Stack, SxProps } from "@mui/system";
import React from "react";

export interface GameLiveEditPlayerProps {
    player1: string;
    player2?: string | null;
    sets: number
    sx?: SxProps;
}

const GameLiveEditPlayer = ({ player1, player2, sets, sx }: GameLiveEditPlayerProps) => {


    return (
        <Stack sx={sx}>
            <Box sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" }, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }} textAlign="center">
                {player1}
                {player2 != null && <React.Fragment><br />{player2}</React.Fragment>}
            </Box>
            <Typography flex="1 1 0" fontSize="1.5rem" fontWeight="bold" textAlign="center">{sets}</Typography>
        </Stack>
    )

}

export default React.memo(GameLiveEditPlayer);