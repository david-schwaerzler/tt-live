import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { postContact } from "../../../rest/api/ContactApi";
import { RequestContact } from "../../../rest/data/Contact";
import LoadingButton from "../../common/components/buttons/LoadingButton";
import ErrorMessage from "../../common/components/utils/ErrorMessage";

export interface ContactFormProps {
    sx?: SxProps
}

enum Errors {
    GENERAL,
    TEXT,
    RECIPIENT
};

const ContactForm = ({ sx }: ContactFormProps) => {

    const [text, setText] = useState("");
    const [recipient, setrecipient] = useState("");
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const [t] = useTranslation();

    const updateErrors = useCallback((errorMsgs: Array<string>, index: number, msg: string) => {
        let copy = [...errorMsgs];
        copy[index] = msg;
        setErrorMsgs(copy);
    }, [])

    return (
        <Box sx={sx}>
            <Typography variant="h2">{t("ContactForm.header")}</Typography>

            <Typography mt={2}>{t("ContactForm.introduction")}</Typography>
            <Stack width="100%" gap={1} mt={2}>
                <ErrorMessage msg={errorMsgs[Errors.GENERAL]} />
                <FormControl>
                    <TextField
                        label={t("ContactForm.text")}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        multiline
                        rows={7}
                        autoComplete="off"
                        error={errorMsgs[Errors.TEXT] != null && errorMsgs[Errors.TEXT] !== ""}
                        helperText={errorMsgs[Errors.TEXT]}
                    />
                </FormControl>
                <FormControl >
                    <TextField
                        label={t("ContactForm.recipient")}
                        value={recipient}
                        onChange={e => setrecipient(e.target.value)}
                        autoComplete="off"
                        error={errorMsgs[Errors.RECIPIENT] != null && errorMsgs[Errors.RECIPIENT] !== ""}
                        helperText={errorMsgs[Errors.RECIPIENT]}
                    />
                </FormControl>
                <Box>
                    <LoadingButton
                        loading={isLoading}
                        variant="outlined"
                        onClick={onSubmit}
                    >
                        {t("ContactForm.submit")}
                    </LoadingButton>
                </Box>
            </Stack>
            <Dialog open={showDialog} sx={{ whiteSpace: "pre-wrap" }}>
                <DialogTitle>{t("ContactForm.confirmTitle")}</DialogTitle>
                <DialogContent>{t("ContactForm.confirmText")}</DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onDialogClosed}>
                        {t("Common.close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )

    function onDialogClosed() {
        setShowDialog(false);
        setText("");
        setrecipient("")
    }

    async function onSubmit() {
        let errorMsgs: Array<string> = [];
        setErrorMsgs([]);
        if (text.length >= 4096) {
            updateErrors(errorMsgs, Errors.TEXT, t("ContactForm.errorTextLength"));
            return;
        }
        if (text.length === 0) {
            updateErrors(errorMsgs, Errors.TEXT, t("ContactForm.errorTextEmpty"));
            return;
        }
        if (recipient.length >= 256) {
            updateErrors(errorMsgs, Errors.RECIPIENT, t("ContactForm.errorRecipientLength"));
            return;
        }

        let requestContact: RequestContact = {
            text: text,
            recipient: recipient
        };

        setLoading(true);
        let response = await postContact(requestContact);
        if (response.data != null) {
            setShowDialog(true);
        } else {
            updateErrors(errorMsgs, Errors.GENERAL, t("ContactForm.errorPost"));
        }
        setLoading(false);
    }
}

export default ContactForm;