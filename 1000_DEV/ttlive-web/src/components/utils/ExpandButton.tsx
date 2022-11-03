import { Button, IconButton, styled } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/system";


const StyledButton = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    opacity: "1"
}));

const StyledDiv = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
    margin: "0",
    "&:hover": {
        background: `${theme.palette.primary.main}0C`,
    }
}));

export interface ExpandButtonProps {
    expanded: boolean
}

const ExpandButton = ({ expanded }: ExpandButtonProps) => {
    return (
        <StyledDiv>
            <StyledButton
                expand={expanded}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon sx={{opacity: 1}}/>
            </StyledButton>
        </StyledDiv>
    )
}

export default ExpandButton;