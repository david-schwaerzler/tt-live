import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const CenteredTextField = styled(TextField)({

    textAlign: "center",
    "& .MuiFormLabel-root": {
        textAlign: "center",

        transform: "translate(-50%, 16px) scale(1)",
        left: "50%",

    },
    "& .MuiFormLabel-root[data-shrink='true']": {
        transform: "translate(-37.5%, -9px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset legend": {
            margin: "auto"
        },
    },
    "& .MuiInputBase-input": {
        textAlign: "center",
    }
});
