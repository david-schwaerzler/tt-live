import { Button, SxProps } from "@mui/material"
import { useContext } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router"
import { AppContext } from "../../AppContext"

export interface ToGameButtonProps {
    sx?: SxProps;
    matchId: number;
}


const ToGameButton = ({ sx, matchId }: ToGameButtonProps) => {

    const context = useContext(AppContext);
    const navigate = useNavigate();
    const [t] = useTranslation();

    return <Button variant="outlined" sx={sx} onClick={(() => onLinkGame())}>
        {t("ToGameButton.linkGame")}
    </Button>

    function onLinkGame() {
        context.setMatchId(matchId);
        navigate("/live");
    }
}

export default ToGameButton;
