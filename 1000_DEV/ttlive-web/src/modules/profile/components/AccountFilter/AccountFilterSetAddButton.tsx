import AddIcon from '@mui/icons-material/Add';
import { FormControl, IconButton, Menu, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { postAccountFilterSet } from '../../../../rest/api/AccountFilterApi';
import { AccountFilterSet, RequestAccountFilterSet } from '../../../../rest/data/AccountFilterSet';
import LoadingButton from '../../../common/components/buttons/LoadingButton';
import ErrorMessage from '../../../common/components/utils/ErrorMessage';
import { useBackDialogHandler } from '../../../common/hooks/useBackDialogHandler';
import { useShortcuts } from '../../../common/hooks/useShortcuts';
import { WhiteTextField } from '../../../containers/components/MenuLoginForm';


export interface AccountFilterSetAddButtonProps {
    onCreate: (filerSet: AccountFilterSet) => void;
}

const AccountFilterSetAddButton = ({ onCreate }: AccountFilterSetAddButtonProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [name, setName] = useState("");
    const [t] = useTranslation();
    const [nameError, setNameError] = useState<string>("");
    const [generalError, setGeneralError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const hasHighlighted = useRef(false);

    useBackDialogHandler(anchor != null, () => setAnchor(null), "filterSetAdd");
    useShortcuts(onClick, () => setAnchor(null), anchor != null);

    useEffect(() => {
        if (anchor != null) {
            setNameError("");
            setGeneralError("");
            setName("");
        } else {
            hasHighlighted.current = false;
        }
    }, [anchor]);

    return (
        <React.Fragment>
            <IconButton color="primary" sx={{ margin: "auto" }} onClick={e => setAnchor(e.currentTarget)}>
                <AddIcon fontSize="large" />
            </IconButton>

            <Menu
                sx={{ mt: "45px" }}
                id="filter-set-add"
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
             
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={anchor != null}
                onClose={() => setAnchor(null)}>

                <Stack p={2} pb={0} gap={2}>
                    <ErrorMessage msg={generalError} />
                    <FormControl sx={{ maxWidth: "300px" }}>
                        <TextField
                            inputRef={ref => ref != null && hasHighlighted.current === false && onHighlight(ref)}
                            size="small"
                            label={t("AccountFilter.filterSetName")}
                            variant="outlined"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            error={nameError !== ""}
                            helperText={nameError}
                            autoComplete="off"
                        />
                    </FormControl>

                    <Box>
                        <LoadingButton loading={isLoading} onClick={onClick} >
                            {t("Common.create")}
                        </LoadingButton>
                    </Box>
                </Stack>
            </Menu>


        </React.Fragment>
    )

    function onHighlight(ref: HTMLDivElement) {
        hasHighlighted.current = true;
        setTimeout(() => ref.focus(), 100);
    }

    async function onClick() {

        setNameError("");
        setGeneralError("");

        if (name === "") {
            setNameError(t("AccountFilter.emptyName"));
            return;
        }

        let requestFilterSet: RequestAccountFilterSet = {
            active: true,
            default: false,
            name: name
        };

        setLoading(true);
        let response = await postAccountFilterSet(requestFilterSet);
        if (response.data != null) {
            onCreate(response.data)
            setAnchor(null);
        } else {
            setGeneralError(t("Common.errorHttp"));
        }
        setLoading(false);
    }
}

export default AccountFilterSetAddButton;