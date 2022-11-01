import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const StyledButton = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    })

}));


export interface ExpandButtonProps {
    expanded: boolean
}

const ExpandButton = ({ expanded }: ExpandButtonProps) => {
    return (
        <StyledButton
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
        >
            <ExpandMoreIcon />
        </StyledButton>
    )
}

export default ExpandButton;