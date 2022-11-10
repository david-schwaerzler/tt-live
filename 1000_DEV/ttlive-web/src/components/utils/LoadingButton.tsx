import { Button, ButtonProps, styled } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";


const StyledButton = styled(Button)(({theme}) => ({
    ":disabled": {
        borderColor: theme.palette.primary.main
    }
}));

export interface LoadinButtonProps extends ButtonProps {
    loading: boolean;
}

const LoadingButton = ({ loading, ...rest }: LoadinButtonProps) => {
    return <StyledButton {...rest} disabled={loading ? true : rest.disabled} sx={{ display: "grid", ...rest.sx }}>
        <Box visibility={loading ? "hidden" : "visible"} gridRow={1} gridColumn={1}>{rest.children}</Box>
        <Box visibility={loading ? "visible" : "hidden"} display="flex" gridRow={1} gridColumn={1} margin="auto">
            <CircularProgress size={24} />
        </Box>
    </StyledButton>
}

export default LoadingButton;