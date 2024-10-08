import { SxProps, Typography } from "@mui/material";

export interface ErrorMessageProps {
    msg?: string | null;
    centered?: boolean;
    sx?: SxProps;
}

const ErrorMessage = ({ msg, centered = false, sx }: ErrorMessageProps) => {
    if (msg == null || msg === "")
        return <></>;

    let style: any = { color: "orange", fontStyle: "italic" }
    if (centered === true) {
        style.textAlign = "center";
        style.width = "100%"
    }
    style = { ...style, ...sx };
    return <Typography sx={style}>{msg}</Typography>
}

export default ErrorMessage;