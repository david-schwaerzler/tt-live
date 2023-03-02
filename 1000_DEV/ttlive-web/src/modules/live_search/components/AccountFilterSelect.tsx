import { InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../AppContext";
import { fetchAccountFilterSets } from "../../../rest/api/AccountFilterApi";
import { AccountFilterSet } from "../../../rest/data/AccountFilterSet";
import { MatchFilterOptions } from "./MatchFilterOptions";

const AccountFilterSelect = () => {

    const [filterSets, setFilterSets] = useState<Array<AccountFilterSet>>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    const isAuthenticated = useIsAuthenticated();
    const context = useContext(AppContext);
    const [t] = useTranslation();

    const dataFetched = useRef<boolean>(false);
    useEffect(() => {
        async function fetch() {
            setLoading(true);
            setError("");
            let response = await fetchAccountFilterSets();
            if (response.data != null)
                setFilterSets(response.data);
            else
                setError("Common.errorHttp");
            setLoading(false);
        }

        if (isAuthenticated() && dataFetched.current === false) {
            dataFetched.current = true;
            fetch();
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (context.matchFilter != null && context.matchFilter.isCustom === true)
            setSelectedId(null);
    }, [context]);


    if (!isAuthenticated())
        return null;


    let selectedValue = filterSets.find(fs => fs.id === selectedId)?.id ?? -1;

    return (
        <React.Fragment>
            <InputLabel id="select-contest">{t('ContestSelect.contest')}</InputLabel>
            <Select
                id="select-filterSet"
                labelId="select-filterSet"
                label={t("AccountFilterSelect.label")}

                value={selectedValue}
                onChange={e => onSelected(e.target.value)}>

                <MenuItem value={-1}>{loading ? t("Common.loading") : "--"}</MenuItem>

                {(error !== "" && loading === false) && <MenuItem value={-1}>{t("Common.errorHttp")}</MenuItem>}
                {filterSets.map(fs =>
                    <MenuItem key={fs.id} value={fs.id}>{fs.name}</MenuItem>
                )}
            </Select>
        </React.Fragment>
    );

    function onSelected(value: string | number) {
        let id = typeof value === "string" ? parseInt(value) : value;
        if (id === -1) {
            setSelectedId(null);
            context.setMatchFilter({ isCustom: false })
        } else {
            setSelectedId(id);
            let fs = filterSets.find(fs => fs.id === id);
            if (fs != null)
                context.setMatchFilter(createFilter(fs));
        }
    }

    function createFilter(fs: AccountFilterSet): MatchFilterOptions {

        let filterOptions: MatchFilterOptions = {
            clubs: [],
            contests: [],
            leagues: [],
            regions: [],
            states: [],
            isCustom: false
        };

        for (let filter of fs.filters) {
            switch (filter.type) {
                case "CLUB":
                    filterOptions.clubs?.push(filter.value);
                    break;
                case "CONTEST":
                    filterOptions.contests?.push(filter.value);
                    break;
                case "LEAGUE":
                    filterOptions.leagues?.push(filter.value);
                    break;
                case "MATCH_STATE":
                    if (filter.value === "NOT_STARTED" || filter.value === "FINISHED" || filter.value === "LIVE")
                        filterOptions.states?.push(filter.value);
                    break;
                case "REGION":
                    filterOptions.regions?.push(filter.value);
                    break;
            }
        }

        return filterOptions;
    }
};

export default AccountFilterSelect;