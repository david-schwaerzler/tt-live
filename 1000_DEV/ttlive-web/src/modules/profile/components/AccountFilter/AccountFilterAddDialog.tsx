import { Box, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { postAccountFilter } from "../../../../rest/api/AccountFilterApi";
import { AccountFilter, AccountFilterType, isAccountFilterType, RequestAccountFilter } from "../../../../rest/data/AccountFilter";
import { Region } from "../../../../rest/data/Region";
import ContestSelect from "../../../common/components/autocomplete/ContestSelect";
import RegionAutocomplete from "../../../common/components/autocomplete/RegionSelectAutocomplete";
import LoadingButton from "../../../common/components/buttons/LoadingButton";
import ErrorMessage from "../../../common/components/utils/ErrorMessage";
import { useBackDialogHandler } from "../../../common/hooks/useBackDialogHandler";
import { useErrorArrays } from "../../../common/hooks/useErrorArrays";
import { useShortcuts } from "../../../common/hooks/useShortcuts";

export interface AccountFilterAddDialogProps {
    show: boolean;
    filterSetId: number;
    onClose: () => void;
    onCreated: (filter: AccountFilter) => void;
}

const enum Errors {
    GENERAL,
    ERROR_TYPE,
    ERROR_REGION,
    ERROR_CONTEST,
    ERROR_DEFAULT
}



const AccountFilterAddDialog = ({ show, filterSetId, onClose, onCreated }: AccountFilterAddDialogProps) => {

    const [type, setType] = useState<AccountFilterType>("CLUB");
    const [value, setValue] = useState<string>("");
    const [region, setRegion] = useState<Region | null>(null);
    const [contest, setContest] = useState<"MEN" | "WOMEN" | null>(null);
    const [t] = useTranslation();
    const [loading, setLoading] = useState(false);

    const [errorMsgs, updateErrors, clearErrors] = useErrorArrays();

    useEffect(() => {
        if (show === true) {
            setType("CLUB");
            setRegion(null);
            setContest(null);
            setValue("");
            clearErrors();
        }
    }, [show, clearErrors]);

    useShortcuts(onAdd, onClose, show );
    useBackDialogHandler(show, confirm => onClose(), "addFilter");

    return (
        <Dialog open={show} onClose={onClose}>
            <DialogTitle>{t("AccountFilter.addFilterTitle")}</DialogTitle>
            <DialogContent >
                <ErrorMessage msg={errorMsgs[Errors.GENERAL]} sx={{ mb: 2 }} />
                <Stack gap={2} mt={1}>
                    <FormControl  error={errorMsgs[Errors.ERROR_TYPE] != null && errorMsgs[Errors.ERROR_TYPE] !== ""} >
                        <InputLabel id="select-type">{t('AccountFilter.type')}</InputLabel>
                        <Select
                            id="select-type"
                            labelId="select-type"
                            label={t('AccountFilter.type')}
                            value={type}
                            onChange={e => onTypeChanged(e.target.value)}>
                            <MenuItem value="CLUB">{t("AccountFilter.types.club")}</MenuItem>
                            <MenuItem value="LEAGUE">{t("AccountFilter.types.league")}</MenuItem>
                            <MenuItem value="MATCH_STATE">{t("AccountFilter.types.matchState")}</MenuItem>
                            <MenuItem value="REGION">{t("AccountFilter.types.region")}</MenuItem>
                            <MenuItem value="CONTEST">{t("AccountFilter.types.contest")}</MenuItem>
                        </Select>
                    </FormControl>


                    {type === "CLUB" && renderDefaultState(t("AccountFilter.types.club"))}
                    {type === "LEAGUE" && renderDefaultState(t("AccountFilter.types.league"))}
                    {type === "CONTEST" && renderContest()}
                    {type === "REGION" && renderRegions()}
                    {type === "MATCH_STATE" && renderMatchState()}

                    <Typography>{renderDescripton()}</Typography>

                    <Box>
                        <LoadingButton loading={loading} variant="outlined" onClick={onAdd}>{t("Common.save")}</LoadingButton>
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );

    function renderDescripton() {
        switch (type) {
            case "CLUB":
                return <Trans i18nKey="AccountFilter.types.clubDesc" />;
            case "LEAGUE":
                return <Trans i18nKey="AccountFilter.types.leagueDesc" />;
            case "MATCH_STATE":
                return <Trans i18nKey="AccountFilter.types.matchStateDesc" />;
            case "REGION":
                return <Trans i18nKey="AccountFilter.types.regionDesc" />;
            case "CONTEST":
                return <Trans i18nKey="AccountFilter.types.regionDesc" />;
        }

    }

    function onTypeChanged(type: string) {
        setRegion(null);
        setContest(null);
        setValue("");
        clearErrors();
        if (isAccountFilterType(type))
            setType(type);
    }

    function renderDefaultState(hint: string) {
        return (
            <TextField
                label={t("AccountFilter.value")}
                variant="outlined"
                onChange={e => setValue(e.target.value)}
                value={value}

                error={errorMsgs[Errors.ERROR_DEFAULT] != null && errorMsgs[Errors.ERROR_DEFAULT] !== ""}
                helperText={errorMsgs[Errors.ERROR_DEFAULT]}
                autoComplete="off"
            />
        )
    }

    function renderRegions() {
        return (
            <RegionAutocomplete
                onChanged={setRegion}
                region={region}
                onError={msg => updateErrors(Errors.ERROR_REGION, msg)}
                error={errorMsgs[Errors.ERROR_REGION]}
            />
        );
    }

    function renderContest() {
        return (
            <ContestSelect
                contest={contest}
                onChanged={setContest}
                error={errorMsgs[Errors.ERROR_CONTEST]}
                onError={msg => updateErrors(Errors.ERROR_CONTEST, msg)}
            />
        );
    }

    function renderMatchState() {
        return (
            <FormControl sx={{ width: "200px" }} error={errorMsgs[Errors.ERROR_DEFAULT] != null && errorMsgs[Errors.ERROR_DEFAULT] !== ""} >
                <InputLabel id="select-state">{t('AccountFilter.types.matchState')}</InputLabel>
                <Select
                    id="select-state"
                    labelId="select-state"
                    label={t('AccountFilter.types.matchState')}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                >
                    <MenuItem value="LIVE">{t('AccountFilter.stateLive')}</MenuItem>
                    <MenuItem value="NOT_STARTED">{t('AccountFilter.stateUpcoming')}</MenuItem>
                    <MenuItem value="FINISHED">{t('AccountFilter.stateFinished')}</MenuItem>
                </Select>
                <FormHelperText>{errorMsgs[Errors.ERROR_DEFAULT]}</FormHelperText>
            </FormControl>
        )
    }

    async function onAdd() {

        let requestFilter: RequestAccountFilter;
        switch (type) {
            case "CLUB":
            case "LEAGUE":
            case "MATCH_STATE":
                if (value === "") {
                    updateErrors(Errors.ERROR_DEFAULT, t("AccountFilter.errorEmptyValue"));
                    return;
                }
                requestFilter = { type: type, value: value };
                break;
            case "REGION":
                if (region == null) {
                    updateErrors(Errors.ERROR_DEFAULT, t("AccountFilter.errorEmptyValue"));
                    return;
                }
                requestFilter = { type: type, value: region.name }
                break;
            case "CONTEST":
                if (contest !== "MEN" && contest !== "WOMEN") {
                    updateErrors(Errors.ERROR_CONTEST, t("AccountFilter.errorEmptyValue"));
                    console.log("error")
                    return;
                }
                requestFilter = { type: type, value: contest }
                break;


            default:
                throw Error("Unknown type of AccountFilter");
        }

        setLoading(true);
        let response = await postAccountFilter(filterSetId, requestFilter);
        if (response.data != null) {
            onCreated(response.data);
            onClose();
        } else {
            updateErrors(Errors.GENERAL, t("Common.errorHttp"));
        }
        setLoading(false);
    }

}

export default AccountFilterAddDialog;