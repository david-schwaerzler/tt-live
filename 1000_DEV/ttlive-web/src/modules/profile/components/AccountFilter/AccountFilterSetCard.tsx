import { Box, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AccountFilterSet } from "../../../../rest/data/AccountFilterSet";
import AddIcon from '@mui/icons-material/Add';
import { Stack } from "@mui/system";
import AccountFilterSetEditButton from "./AccountFilterSetEditButton";
import { useState } from "react";
import AccountFilterAddDialog from "./AccountFilterAddDialog";
import React from "react";
import { AccountFilter } from "../../../../rest/data/AccountFilter";
import AccountFilterChip from "./AccountFilterChip";
import DeleteConfirmButton from "../../../common/components/buttons/DeleteConfirmButton";
import { deleteAccountFilterSet } from "../../../../rest/api/AccountFilterApi";

export interface AccountFilterSetCardProps {
    filterSet: AccountFilterSet;
    takenNames: Array<string>;
    onUpdated: (updatedFilter: AccountFilterSet) => void;
    onDeleted: (updatedFilter: AccountFilterSet) => void;
}

const AccountFilterSetCard = ({ filterSet, takenNames, onUpdated, onDeleted }: AccountFilterSetCardProps) => {

    const [t] = useTranslation();
    const [showAddFilter, setShowAddFilter] = useState(false);

    return (
        <React.Fragment>
            <AccountFilterAddDialog onClose={() => setShowAddFilter(false)} onCreated={onFilterCreated} show={showAddFilter} filterSetId={filterSet.id} />
            <Card elevation={3}>
                <CardHeader title={
                    <Stack gap={1} direction="row" alignItems="top" flexWrap="nowrap">
                        <Typography
                            fontSize="1.5rem"
                            sx={{ overflowWrap: "anywhere" }}
                            fontStyle={filterSet.active === false ? "italic" : undefined}
                        >
                            {filterSet.name}
                        </Typography>
                        {filterSet.default &&
                            <Typography fontSize="0.75rem" alignSelf="center">{t("AccountFilter.defaultLabel")}</Typography>
                        }
                        <AccountFilterSetEditButton filterSet={filterSet} onUpdated={onUpdated} takenNames={takenNames} />
                        <Box flexGrow={1} />
                        <Box>
                            <DeleteConfirmButton content={t("AccountFilter.deleteConfirm")} onDelete={onFilterSetDeleted} />
                        </Box>
                    </Stack>
                } />
                <CardContent >
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {filterSet.filters.map(f => <AccountFilterChip key={f.id} filter={f} filterSetId={filterSet.id} onDeleted={onFilterDeleted} />)}
                    </Stack>

                    <IconButton sx={{ mt: filterSet.filters.length > 0 ? 1 : 0, pb: 0 }} size="small" onClick={() => setShowAddFilter(true)}>
                        <AddIcon color="primary" />
                        {filterSet.filters.length === 0 && <Typography>{t("AccountFilter.addFilter")}</Typography>}
                    </IconButton>
                </CardContent>
            </Card>
        </React.Fragment >
    );

    function onFilterCreated(filter: AccountFilter) {
        let tmp = { ...filterSet };
        tmp.filters.push(filter);
        onUpdated(tmp);
    }

    function onFilterDeleted(filter: AccountFilter) {
        let tmp = { ...filterSet };
        tmp.filters = filterSet.filters.filter(f => f.id !== filter.id);
        console.log(tmp.filters)
        onUpdated(tmp);
    }


    async function onFilterSetDeleted() {

        let response = await deleteAccountFilterSet(filterSet.id);
        if (response.data != null){
            onDeleted(filterSet)
            return null;
        }

        return t("Common.errorHttp");
    }

}

export default AccountFilterSetCard;