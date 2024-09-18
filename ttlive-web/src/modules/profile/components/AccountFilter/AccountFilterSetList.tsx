import { Stack, Typography, Box, Card, CardContent, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import AccountFilterAddButton from "./AccountFilterSetAddButton";
import { AccountFilterSet } from "../../../../rest/data/AccountFilterSet";
import AccountFilterCard from "./AccountFilterSetCard";

import { fetchAccountFilterSets } from "../../../../rest/api/AccountFilterApi";
import ErrorMessage from "../../../common/components/utils/ErrorMessage";


const AccountFilterSetList = () => {

    const [t] = useTranslation();
    const [filterSets, setFilterSets] = useState<Array<AccountFilterSet>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const filterSetNames = useMemo(() => filterSets.map(fs => fs.name), [filterSets]);


    useEffect(() => {
        async function fetch() {
            setError("")
            setLoading(true);
            let response = await fetchAccountFilterSets();
            if (response.data != null) {
                setFilterSets(response.data.sort((a, b) => b.id - a.id));
            } else {
                setError(t("Common.errorHttp"));
            }

            setLoading(false);
        }

        fetch();
    }, [t]);


    const onUpdated = useCallback((filterSet: AccountFilterSet) => {
        setFilterSets(filterSets => {

            let existing = filterSets.find(fs => fs.id === filterSet.id);
            if (existing == null)
                return filterSets;

            let idx = filterSets.indexOf(existing);
            let copy = [...filterSets];

            if (filterSet.default)
                copy.forEach(fs => fs.default = false);
            copy[idx] = filterSet;

            return copy;
        });
    }, []);

    const onDeleted = useCallback((filterSet: AccountFilterSet) => {
        setFilterSets(filterSets => {
            let copy = [...filterSets];
            copy = filterSets.filter(fs => fs.id !== filterSet.id);
            return copy;
        });
    }, [])

    return (
        <Box>
            <Stack direction="row" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="h4" flexGrow={1}>{t("AccountFilter.title")}</Typography>
                <Box>
                    <AccountFilterAddButton onCreate={onAddfilterSet} takenNames={filterSetNames} />
                </Box>
            </Stack>
            <Stack gap={2}>
                {filterSets.map(fs => <AccountFilterCard key={fs.id} filterSet={fs} onUpdated={onUpdated} onDeleted={onDeleted} takenNames={filterSetNames} />)}

                {loading && <Skeleton height="100px" variant="rectangular" />}
                {loading === false && (filterSets.length === 0 || error !== "") &&
                    <Card elevation={3} sx={{ paddingBottom: "0px" }}>
                        <CardContent sx={{ paddingBottom: 2 }}>
                            <ErrorMessage msg={error} />
                            {error === "" && t("AccountFilter.noFilter")}
                        </CardContent>
                    </Card>
                }
            </Stack>
        </Box>
    );

    function onAddfilterSet(filterSet: AccountFilterSet) {
        let copy = [filterSet, ...filterSets];
        setFilterSets(copy);
    }
}

export default React.memo(AccountFilterSetList);