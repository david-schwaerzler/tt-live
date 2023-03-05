import { Divider, InputLabel, ListItemIcon, MenuItem, Select } from "@mui/material";
import React, { useCallback } from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppContext } from "../../../AppContext";
import { fetchAccountFilterSets } from "../../../rest/api/AccountFilterApi";
import { AccountFilterSet } from "../../../rest/data/AccountFilterSet";
import { MatchFilterOptions } from "./MatchFilterOptions";
import AddIcon from '@mui/icons-material/Add';


function createFilter(fs: AccountFilterSet): MatchFilterOptions {

    let filterOptions: MatchFilterOptions = {
        clubs: [],
        contests: [],
        leagues: [],
        regions: [],
        states: [],
        isCustom: false,
        setId: fs.id
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

const AccountFilterSelect = () => {

    const [filterSets, setFilterSets] = useState<Array<AccountFilterSet>>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);

    const isAuthenticated = useIsAuthenticated();
    const context = useContext(AppContext);
    const [t] = useTranslation();

    const dataFetched = useRef<boolean>(false);


    const onSelected = useCallback((value: string | number) => {
        let id = typeof value === "string" ? parseInt(value) : value;
        if (id === -1) {
            setSelectedId(null);
            context.setMatchFilter({ isCustom: false, setId: -1 })
        } else {
            setSelectedId(id);
            let fs = filterSets.find(fs => fs.id === id);
            if (fs != null)
                context.setMatchFilter(createFilter(fs));
        }
    }, [context, filterSets]);

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            setError("");
            let response = await fetchAccountFilterSets();
            if (response.data != null) {
                let isCustom = context.matchFilter.isCustom == null || context.matchFilter.isCustom === false;

                let filterSets = response.data.filter(fs => fs.active === true);
                setFilterSets(filterSets);

                if (isCustom) {
                    if (context.matchFilter.setId != null) {
                        let defaultFs = filterSets.find(fs => fs.id === context.matchFilter.setId);
                        if (defaultFs != null) {
                            setSelectedId(defaultFs.id);
                        }
                    } else {
                        let defaultFs = filterSets.find(fs => fs.default === true);
                        if (defaultFs != null) {
                            setSelectedId(defaultFs.id);
                            context.setMatchFilter(createFilter(defaultFs));
                        } else {
                            setSelectedId(-1);
                        }
                    }
                }
            } else {
                setError("Common.errorHttp");
            }
            setLoading(false);
        }

        if (isAuthenticated() && dataFetched.current === false) {
            dataFetched.current = true;
            fetch();
        }
    }, [isAuthenticated, context])

    useEffect(() => {
        if (context.matchFilter != null && context.matchFilter.isCustom === true)
            setSelectedId(null);
    }, [context]);


    if (!isAuthenticated())
        return null;


    let selectedValue = filterSets.find(fs => fs.id === selectedId)?.id ?? -1;

    return (
        <React.Fragment>
            <InputLabel id="select-contest">{t('AccountFilterSelect.label')}</InputLabel>
            <Select
                id="select-filterSet"
                labelId="select-filterSet"
                label={t("AccountFilterSelect.label")}

                value={selectedValue}
                onChange={e => onSelected(e.target.value)}>

                {(error !== "" && loading === false) && <MenuItem value={-1}>{t("Common.errorHttp")}</MenuItem>}
                {error === "" &&
                    <MenuItem value={-1}>
                        {loading === true && t("Common.loading")}
                        {loading === false && (context.matchFilter.isCustom == null || context.matchFilter.isCustom === false) && t("AccountFilterSelect.allMatches")}
                        {loading === false && context.matchFilter.isCustom === true && t("AccountFilterSelect.custom")}
                    </MenuItem>}

                {filterSets.map(fs => <MenuItem key={fs.id} value={fs.id}>{fs.name}</MenuItem>)}
                <Divider />

                {(loading === false && error === "") &&
                    <Link to="/profile" style={{ textDecoration: 'none', color: "inherit" }} tabIndex={-1}>
                        <MenuItem value="-2" >
                            <ListItemIcon><AddIcon /></ListItemIcon>
                            {t("AccountFilterSelect.newFilter")}
                        </MenuItem>
                    </Link>
                }
            </Select >
        </React.Fragment >
    );
};

export default AccountFilterSelect;