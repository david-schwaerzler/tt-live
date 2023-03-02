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
import AccountFilterSetDeleteButton from "./AccountFilterSetDeleteButton";

export interface AccountFilterSetCardProps {
    filterSet: AccountFilterSet;
    onUpdated: (updatedFilter: AccountFilterSet) => void;
    onDeleted: (updatedFilter: AccountFilterSet) => void;
}

const AccountFilterSetCard = ({ filterSet, onUpdated, onDeleted }: AccountFilterSetCardProps) => {

    const [t] = useTranslation();
    const [showAddFilter, setShowAddFilter] = useState(false);

    return (
        <React.Fragment>
            <AccountFilterAddDialog onClose={() => setShowAddFilter(false)} onCreated={onFilterCreated} show={showAddFilter} filterSetId={filterSet.id} />
            <Card elevation={3}>
                <CardHeader title={
                    <Stack gap={1} direction="row" alignItems="top" flexWrap="nowrap">
                        <Typography fontSize="1.5rem" sx={{ overflowWrap: "anywhere" }}>
                            {filterSet.name}
                        </Typography>
                        <AccountFilterSetEditButton filterSet={filterSet} onUpdated={onUpdated} />
                        <Box flexGrow={1} />
                        <Box>
                            <AccountFilterSetDeleteButton onDelete={() => onDeleted(filterSet)} filterSetId={filterSet.id} />
                        </Box>
                    </Stack>
                } />
                <CardContent >
                    <Stack direction="row" gap={1} flexWrap="wrap">
                        {filterSet.filters.map(f => <AccountFilterChip key={f.id} filter={f} filterSetId={filterSet.id} onDeleted={onFilterDeleted} />)}
                    </Stack>

                    <IconButton sx={{ mt: 1, pb: 0 }} size="small" onClick={() => setShowAddFilter(true)}>
                        <AddIcon color="primary" />
                        {filterSet.filters.length === 0 && <Typography>{t("AccountFilter.addFilter")}</Typography>}
                    </IconButton>
                </CardContent>
            </Card>
        </React.Fragment>
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

}

export default AccountFilterSetCard;