import { Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, Menu, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { putAccountFilterSet } from '../../../../rest/api/AccountFilterApi';
import { AccountFilterSet, RequestAccountFilterSet } from '../../../../rest/data/AccountFilterSet';
import ErrorMessage from '../../../common/components/utils/ErrorMessage';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '../../../common/components/buttons/LoadingButton';
import { useBackDialogHandler } from '../../../common/hooks/useBackDialogHandler';
import { useShortcuts } from '../../../common/hooks/useShortcuts';



export interface AccountFilterSetEditButtonProps {
    onUpdated: (filerSet: AccountFilterSet) => void;
    filterSet: AccountFilterSet
    takenNames: Array<string>;
}

const AccountFilterSetEditButton = ({ filterSet, takenNames, onUpdated }: AccountFilterSetEditButtonProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [name, setName] = useState(filterSet.name);
    const [t] = useTranslation();
    const [nameError, setNameError] = useState<string>("");
    const [generalError, setGeneralError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const hasHighlighted = useRef(false);
    const [isDefault, setDefault] = useState<boolean>(false);
    const [isActive, setActive] = useState<boolean>(false);

    useBackDialogHandler(anchor != null, () => setAnchor(null), "filterSetEdit");
    useShortcuts(onClick, () => setAnchor(null), anchor != null);

    useEffect(() => {
        if (anchor != null) {
            setNameError("");
            setGeneralError("");
            setName(filterSet.name)
            setDefault(filterSet.default);
            setActive(filterSet.active);
        } else {
            hasHighlighted.current = false;
        }
    }, [filterSet, anchor]);

    return (
        <Box>
            <IconButton color="primary" sx={{ margin: "auto" }} onClick={e => { setAnchor(e.currentTarget); }}>
                <EditIcon />
            </IconButton>

            <Menu
                sx={{ mt: "45px" }}
                id="filter-set-edit"
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


                    <FormGroup sx={{ flexDirection: "row" }}>
                        <FormControlLabel control={<Checkbox checked={isDefault} onChange={e => setDefault(!isDefault)} />} label={t("AccountFilter.checkDefault")} />
                        <FormControlLabel control={<Checkbox checked={isActive} onChange={e => setActive(!isActive)} />} label={t("AccountFilter.checkActive")} />
                    </FormGroup>
                    <Box>
                        <LoadingButton loading={isLoading} onClick={onClick} >
                            {t("Common.save")}
                        </LoadingButton>
                    </Box>
                </Stack>
            </Menu>
        </Box>
    );

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

        if(takenNames.some(n => n !== filterSet.name && n === name) === true){
            setNameError(t("AccountFilter.nameExists"))
            return;
        }

        let requestFilterSet: RequestAccountFilterSet = {
            active: isActive,
            default: isDefault,
            name: name
        };

        setLoading(true);
        let response = await putAccountFilterSet(filterSet.id, requestFilterSet);
        if (response.data != null) {
            onUpdated(response.data)
            setAnchor(null);
        } else {
            setGeneralError(t("Common.errorHttp"));
        }
        setLoading(false);
    }
}

export default AccountFilterSetEditButton;