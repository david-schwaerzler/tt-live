import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SxProps } from "@mui/material"
import { useTranslation } from "react-i18next";

export interface ContestSelectProps {
    contest: "MEN" | "WOMEN" | null ,
    onChanged: (contest: "MEN" | "WOMEN" ) => void;
    error: string | null;
    onError: (error: string) => void;
    sx?: SxProps
}

const ContestSelect = ({ contest, error, sx, onChanged, onError }: ContestSelectProps) => {
    const [t] = useTranslation();

    return (
        <FormControl sx={sx} error={error != null && error !== ""}>
            <InputLabel id="select-contest">{t('ContestSelect.contest')}</InputLabel>
            <Select
                id="select-contest"
                labelId="select-contest"
                label={t('ContestSelect.contest')}
                value={contest ?? ""}
                onChange={e => (e.target.value === "MEN" || e.target.value === "WOMEN") && onChanged(e.target.value)}>
                <MenuItem value="WOMEN">{t('ContestSelect.contestWomen')}</MenuItem>
                <MenuItem value="MEN">{t('ContestSelect.contestMen')}</MenuItem>
            </Select>
            <FormHelperText>
                {error}
            </FormHelperText>
        </FormControl>
    )
}

export default ContestSelect;