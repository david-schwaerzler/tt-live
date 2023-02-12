import { Autocomplete, createFilterOptions, FilterOptionsState, SxProps, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";

export interface CustomAutoCompleteProps<Type> {
    value: Type | null;
    options: Array<Type>;
    label: string,
    error?: boolean,
    sx?: SxProps
    onChange: (value: Type | null) => void;
    onCreateType: (value: string) => Type;
    accessor: (value: Type) => string;
    inputValidation?: (value: string) => boolean;
}

const CustomAutoComplete = <Type,>({ value, options, label, error, sx, onChange, onCreateType, accessor, inputValidation }: CustomAutoCompleteProps<Type>) => {

    const filter = useMemo(() => createFilterOptions<Type>(), []);

    const [inputValue, setInputValue] = useState<string>("");
    const [tmpOptions, setTmpOptions] = useState<Array<Type>>([]);
    const [tmpValue, setTmpValue] = useState<Type | null>(null);
    useEffect(() => {
        let tmpOptions = [...options];

        if (tmpValue != null)
            tmpOptions.push(tmpValue);

        setTmpOptions(tmpOptions)
    }, [options, tmpValue]);


    return (
        <Autocomplete
            sx={sx}
            value={value}
            onChange={(e, value) => onValueSelected(e, value)}
            options={tmpOptions}
            inputValue={inputValue}
            onInputChange={(e, value) => onInputChange(value)}
            getOptionLabel={renderOptionLabel}
            renderInput={(params) => <TextField {...params} label={label} error={error} />}
            filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) => accessor(option) === accessor(value)}
            autoHighlight={true}
            autoSelect={tmpOptions.some(o => accessor(o) === inputValue) === false}
        />
    );

    function renderOptionLabel(option: Type) {
        let optionValue = accessor(option);

        if (tmpOptions.some(o => accessor(o) === inputValue))
            return optionValue;

        if (inputValue === optionValue)
            return `Add "${optionValue}"`;

        return optionValue;
    }

    function onInputChange(value: string) {

        if(value.startsWith("Add \""))
            return;
        if(inputValidation != null && inputValidation(value) === false)
            return;
        
        setInputValue(value)
    }

    function filterOptions(options: Array<Type>, params: FilterOptionsState<Type>) {
        const filtered = filter(options, params);
        const { inputValue } = params;

        const isExisting = options.some((option) => inputValue === accessor(option));
        if (inputValue !== '' && !isExisting) {
            let newType = onCreateType(inputValue);
            filtered.push(newType);
        }
        return filtered;
    }

    function onValueSelected(e: SyntheticEvent<Element, Event>, value: Type | null) {
        if (value) {
            if (options.includes(value))
                setTmpValue(null);
            else{
                setTmpValue(value);
                setTmpOptions([...tmpOptions, value]);
            }
        }
        onChange(value)
    }   
}

export default CustomAutoComplete;

