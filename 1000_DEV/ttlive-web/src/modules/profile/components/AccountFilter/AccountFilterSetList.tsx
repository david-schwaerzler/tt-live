import { Stack, Typography, Box, Card, CardContent, Skeleton } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
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


    useEffect(() => {
        async function fetch() {
            setError("")
            setLoading(true);
            let response = await fetchAccountFilterSets();
            if (response.data != null) {
                setFilterSets(response.data)
            } else {
                setError(t("Common.errorHttp"));
            }

            setLoading(false);
        }

        fetch();
    }, [t]);


    const onUpdated = useCallback((filterSet: AccountFilterSet) => {
        setFilterSets(filterSets => {
            let copy = filterSets.filter(fs => fs.id !== filterSet.id);
            copy.push(filterSet);
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
                    <AccountFilterAddButton onCreate={onAddfilterSet} />
                </Box>
            </Stack>
            <Stack>
                {filterSets.map(fs => <AccountFilterCard key={fs.id} filterSet={fs} onUpdated={onUpdated} onDeleted={onDeleted} />)}

                {loading && <Skeleton height="100px" variant="rectangular" />}
                {loading === false && (filterSets.length === 0 || error !== "") &&
                    <Card elevation={3} sx={{ paddingBottom: "0px" }}>
                        <CardContent sx={{ paddingBottom: 2 }}>
                            <ErrorMessage msg={error} />
                            {error === "" && t("MyGameList.noGame")}
                        </CardContent>
                    </Card>
                }
            </Stack>
        </Box>
    );

    function onAddfilterSet(filterSet: AccountFilterSet) {
        let copy = [...filterSets];
        copy.push(filterSet);
        setFilterSets(copy);
    }



}

export default React.memo(AccountFilterSetList);