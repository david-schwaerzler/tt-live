import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import MatchDeleteForm from "../../../common/components/match/MatchDeleteForm";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../../AppContext";

export interface MyGameDeleteButtonProps {
    matchId: number;
    onDeleted: () => void;
}


const MyGameDeleteButton = ({ matchId, onDeleted }: MyGameDeleteButtonProps) => {

    const [show, setShow] = useState(false);
    const [t] = useTranslation();
    const context = useContext(AppContext);

    const editorCode = useMemo(() => context.editorCode[matchId], [matchId, context.editorCode]);

    return (
        <React.Fragment>
            <IconButton onClick={() => setShow(true)}>
                <DeleteIcon color="primary" />
            </IconButton>
            <Dialog open={show} onClose={() => setShow(false)}>
                <DialogTitle>
                    {t("MyGameDeleteButton.matchDeleteTitle")}
                </DialogTitle>
                <DialogContent sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <MatchDeleteForm matchId={matchId} editorCode={editorCode} onDeleted={onDeletedLocal} />
                </DialogContent>
            </Dialog>

        </React.Fragment>
    )

    function onDeletedLocal() {
        setShow(false);
        onDeleted()
    }
}

export default MyGameDeleteButton;