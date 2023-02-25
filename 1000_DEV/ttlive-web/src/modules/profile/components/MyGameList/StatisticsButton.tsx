import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { SimpleMatch } from "../../../../rest/data/Match";
import AssessmentIcon from '@mui/icons-material/Assessment';
import React, { useState } from "react";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useBackDialogHandler } from "../../../common/hooks/useBackDialogHandler";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


export interface StatisticsButtonProps {
    match: SimpleMatch;
}

const StatisticsButton = ({ match }: StatisticsButtonProps) => {

    const [show, setShow] = useState(false);
    const [t] = useTranslation();

    useBackDialogHandler(show, setShow);

    return (
        <React.Fragment>
            <IconButton onClick={() => setShow(true)}>
                <AssessmentIcon color="primary" />
            </IconButton>

            <Dialog open={show} onClose={() => setShow(false)}>
                <DialogTitle>
                    Spiel Statistiken
                </DialogTitle>
                <DialogContent>
                    <EngineeringIcon color="primary" fontSize="large" />
                    <br />
                    Dieser Dialog ist noch nicht implementiert. <br />
                    Später sind hier Statistiken über deine Spiele zu finden. <br />
                    Wenn du Ideen hast, welche Statistiken hier interessant sein könnten, lass es mich gerne über das Kontaktformular wissen.
                    <br />
                    <br />
                    <Link to={"home"}>
                        <Button>zum Kontaktformular</Button>.
                    </Link>
                </DialogContent>

            </Dialog>
        </React.Fragment >
    );
}

export default StatisticsButton;