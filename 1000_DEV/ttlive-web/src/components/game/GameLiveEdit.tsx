import { Dialog, IconButton } from "@mui/material";
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { Game } from "../../rest/data/Game";

export interface GameLiveEditProps {
    game: Game;
}

const GameLiveEdit = ({ game }: GameLiveEditProps) => {

    const [show, setShow] = useState<boolean>(false);

    return (
        <React.Fragment>
            <IconButton>
                <EditIcon />
            </IconButton>
            <Dialog
                fullScreen
                open={show}
                onClose={() => setShow(false)}>

                adasdasda
            </Dialog>
        </React.Fragment>
    );
}

export default GameLiveEdit;