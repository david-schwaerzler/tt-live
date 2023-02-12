import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Match, SimpleMatch } from "../../../../rest/data/Match";
import AssessmentIcon from '@mui/icons-material/Assessment';
import React, { useState } from "react";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useBackDialogHandler } from "../../../../components/utils/useBackDialogHandler";


export interface StatisticsButtonProps {
    match: SimpleMatch;
}

const StatisticsButton = ({ match }: StatisticsButtonProps) => {

    const [show, setShow] = useState(false);

    useBackDialogHandler(show, setShow);

    return (
        <React.Fragment>
            <IconButton onClick={() => setShow(true)}>
                <AssessmentIcon color="primary" />
            </IconButton>

            <Dialog open={show} onClose={() => setShow(false)}>
                <DialogContent>
                    <EngineeringIcon color="primary" fontSize="large"/>
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}

export default StatisticsButton;