import { Stack, Typography } from "@mui/material";
import LoadingButton from "../../../common/components/buttons/LoadingButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export interface GameLiveEditScoreProps {
    isLoading: boolean;
    score: number;
    otherScore: number;
    onUpdateScore: (score: number) => void;
}

const GameLiveEditScore = ({ isLoading, score, otherScore, onUpdateScore }: GameLiveEditScoreProps) => {

    let isWon = score >= 11 && score - otherScore >= 2;
    let isLost = otherScore >= 11 && otherScore - score >= 2;


    return (
        <Stack >
            <LoadingButton
                loading={isLoading}
                variant="outlined"
                disabled={isWon || isLost}
                onClick={() => onUpdateScore(score + 1)}
                sx={{ margin: "auto" }}
            >
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)" }} />
            </LoadingButton>
            <Typography fontSize="2rem" fontWeight="bold" flex="1 1 0" textAlign="center">{score}</Typography>
            <LoadingButton
                loading={isLoading}
                variant="outlined"
                disabled={score <= 0 || isLost}
                onClick={() => onUpdateScore(score-1)}
                sx={{ m: "auto" }}
            >
                <ExpandMoreIcon />
            </LoadingButton>
        </Stack>
    );
}

export default GameLiveEditScore;