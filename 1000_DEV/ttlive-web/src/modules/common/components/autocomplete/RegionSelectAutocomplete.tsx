import { FormControl, FormHelperText, SxProps, Autocomplete, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchRegions } from "../../../../rest/api/RegionApi";
import { Region } from "../../../../rest/data/Region";

export interface RegionAutocompleteProps {
    region: Region | string | null
    onChanged: (region: Region | null) => void;
    error: string
    onError: (error: string) => void;
    autoHighlight?: boolean;
    sx?: SxProps;
}

const RegionAutocomplete = ({ region, onChanged, sx, error, onError, autoHighlight = false }: RegionAutocompleteProps) => {

    const [regions, setRegions] = useState<Array<Region>>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    const regionsLoaded = useRef<boolean>(false);

    const [t] = useTranslation();
    useEffect(() => {
        async function fetch() {
            setLoading(true);
            let response = await fetchRegions();
            if (response.data != null) {
                setRegions(response.data);
            } else {
                onError(t("Common.errorHttp"));
            }
            setLoading(false);
        }
        if (regionsLoaded.current === false) {
            regionsLoaded.current = true;
            fetch();
        }
    }, [onError, t, regionsLoaded]);

    // if a string is provided as the region, try to find the corresponding Region object and cause an onChange
    useEffect(() => {
        if (region != null && typeof region === "string") {
            let tmp = regions.find(r => r.name === region);
            if (tmp != null)
                onChanged(tmp)
        }
    }, [region, regions, onChanged])

    let value = null;
    if (region != null) {
        if (typeof region === "string") {
            let tmp = regions.find(r => r.name === region);
            value = tmp ?? null;
        }
        else
            value = region;
    }
    return (
        <FormControl sx={sx} error={error !== ""} >
            <Autocomplete
                value={value}
                onChange={(e, value) => onChanged(value)}
                options={regions}
                getOptionLabel={option => option.name}
                renderInput={(params) => <TextField {...params} label={t('RegionAutocomplete.region')} error={false} />}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                autoHighlight={autoHighlight}
                loading={isLoading}
            />
            <FormHelperText >
                {error}
            </FormHelperText>
        </FormControl>
    );
}

export default RegionAutocomplete;