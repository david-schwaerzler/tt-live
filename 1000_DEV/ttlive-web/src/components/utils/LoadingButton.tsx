import { Button, ButtonProps, styled } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";


const StyledButton = styled(Button)(({ theme }) => ({
    ":disabled": {
        
    }
}));

export interface LoadinButtonProps extends ButtonProps {
    loading: boolean;
}

const LoadingButton = ({ loading, ...rest }: LoadinButtonProps) => {
    return <StyledButton {...rest} disabled={loading ? true : rest.disabled} sx={{ display: "grid", ...rest.sx }}>
        <Box visibility={loading ? "hidden" : "visible"} gridRow={1} gridColumn={1} display="flex" alignContent="center" alignItems="center">{rest.children}</Box>
        <Box visibility={loading ? "visible" : "hidden"} display="flex" gridRow={1} gridColumn={1} alignContent="center" alignItems="center">
            <CircularProgress size={24} color="primary" />
        </Box>
    </StyledButton>
}

export default LoadingButton;