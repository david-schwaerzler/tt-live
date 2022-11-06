import { IconButton, styled } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from "@mui/system";


const StyledButton = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.shortest,
    }),
    width: "fit-content",
    margin: "auto",

    svg: {
        color: theme.palette.primary.main,
        transition: "color 0.1s ease"
    },

    "&:active": {
        color: theme.palette.primary.main,
    }

}));

const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    "::before": {
        content: '""',
        margin: "auto",
        display: "block",
        position: "relative",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        transformOrigin: "center",
        transition: "transform 0.1s ease-out",
        transform: "scale(0)",
        gridColumn: 1,
        gridRow: 1
    },
    '&:hover::before': {
        transform: "scale(1)",
        transformOrigin: "center",
        transitionDelay: "50ms"
    },

    '&:hover svg': {
        color: "white",
        transitionDelay: "50ms"
    },

    '&:hover': {
        background: `${theme.palette.primary.main}0C`
    }

}));


export interface ExpandButtonProps {
    expanded: boolean
}

const ExpandButton = ({ expanded }: ExpandButtonProps) => {
    return (
        <StyledBox sx={{ display: "grid" }}>
            <StyledButton
                expand={expanded}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ gridColumn: 1, gridRow: 1 }}
            >
                <ExpandMoreIcon sx={{ zIndex: 100 }} />
            </StyledButton>
        </StyledBox>
    )
}

export default ExpandButton;