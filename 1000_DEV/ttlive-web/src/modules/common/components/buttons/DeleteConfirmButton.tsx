import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorMessage from "../utils/ErrorMessage";
import LoadingButton from "./LoadingButton";


export interface DeleteConfirmButtonProps {
    onDelete: () => Promise<string | null>;
    content: React.ReactNode | string;
}

const DeleteConfirmButton = ({ content, onDelete }: DeleteConfirmButtonProps) => {


    const [isLoading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [t] = useTranslation();

    useEffect(() => {
        if(show){
            setError("");
        }
    }, [show])

    return (
        <React.Fragment>
            <IconButton onClick={e => setShow(true)}>
                <DeleteIcon color="primary" />
            </IconButton>


            <Dialog open={show} onClose={() => setShow(false)}>
                <DialogTitle>{t("DeleteConfirmButton.title")}</DialogTitle>
                <DialogContent>
                    <ErrorMessage msg={error} sx={{mb: 2}} />
                    {content}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShow(false)}>{t("Common.cancel")}</Button>
                    <LoadingButton loading={isLoading} onClick={onDeleteLocal}>{t("Common.delete")}</LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );

    async function onDeleteLocal() {
        setLoading(true);
        let error = await onDelete();
        setLoading(false);

        if (error != null && error !== "") {
            setError(error);
        } else {
            setShow(false);
        }
    }

}

export default DeleteConfirmButton;