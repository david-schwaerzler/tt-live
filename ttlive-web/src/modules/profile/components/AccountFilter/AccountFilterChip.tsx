import { Chip, CircularProgress, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { deleteAccountFilter } from "../../../../rest/api/AccountFilterApi";
import { AccountFilter } from "../../../../rest/data/AccountFilter"
import CancelIcon from '@mui/icons-material/Cancel';

export interface AccountFilterChipProps {
    filter: AccountFilter;
    filterSetId: number
    onDeleted: (filter: AccountFilter) => void;
}

const AccountFilterChip = ({ filter, filterSetId, onDeleted }: AccountFilterChipProps) => {

    const [t] = useTranslation();
    const [isLoading, setLoading] = useState<boolean>(false);

    let onDelete = useCallback(() => {
        if (isLoading)
            return;

        setLoading(true);
        let response = deleteAccountFilter(filterSetId, filter.id);
        if (response != null) {
            onDeleted(filter);
        }
    }, [filterSetId, filter, isLoading, onDeleted])

    let chip: ReactNode = useMemo(() => {
        let color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = "primary";
        let type;
        let value = filter.value;
        switch (filter.type) {
            case "CLUB":
                type = t("AccountFilter.types.club");
                break;
            case "CONTEST":
                type = t("AccountFilter.types.contest");
                value = filter.value === "WOMEN" ? t("ContestSelect.contestWomen") : t("ContestSelect.contestMen");
                break;
            case "LEAGUE":
                type = t("AccountFilter.types.league");
                break;
            case "MATCH_STATE":
                type = t("AccountFilter.types.matchState");
                if (filter.value === "LIVE")
                    value = t('AccountFilter.stateLive');
                else if (filter.value === "NOT_STARTED")
                    value = t('AccountFilter.stateUpcoming');
                else
                    value = t("AccountFilter.stateFinished")
                break;
            case "REGION":
                type = t("AccountFilter.types.region");
                break;
        }

        return (
            <Chip onDelete={onDelete} color={color} variant="outlined" label={
                <Typography component="span">
                    {type}:&nbsp;
                    <Typography fontWeight={"bold"} color="white" component="span">
                        {value}
                    </Typography>
                </Typography>
            } deleteIcon={isLoading ? <CircularProgress size={20} /> : <CancelIcon />} />
        );
    }, [filter, isLoading, t, onDelete]);
    return chip;
}

export default AccountFilterChip;
