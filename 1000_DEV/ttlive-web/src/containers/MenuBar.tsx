import { AppBar, Button, Divider, styled, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from "../AppContext";
import MenuLoginForm from "../components/login/MenuLoginForm";


const HoverButton = styled(Button)(({ theme }) => ({
    color: "white",
    display: "block",
    "::after": {
        content: '""',
        position: "absolute",
        transform: "scaleX(0)",
        height: "4px",
        bottom: "0px",
        right: "5px",
        left: "5px",
        borderRadius: "2px",
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary.main : "white",
        transformOrigin: "bottom center",
        transition: "transform 0.1s ease-out"
    },
    '&.current::after,&:hover::after': {
        transform: "scaleX(1)",
        transformOrigin: "bottom center"
    }

}))

const padding = { xs: 1, md: 6 };

const MenuBar = () => {

    const [t] = useTranslation();
    const context = useContext(AppContext);
    const location = useLocation();

    return (
        <AppBar position="static" elevation={2}>
            <Toolbar>
                <Typography variant="h6" color="inherit" sx={{ minWidth: "fit-content", mr: padding }}>
                    TT-Live
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mr: padding }} />
                <Box sx={{ flexGrow: 1, display: 'flex', gap: padding }} >
                    <Link to="/" style={{ textDecoration: 'none' }} tabIndex={-1}>
                        <HoverButton className={location.pathname === "/" ? "current" : ""}>
                            {t('MenuBar.home')}
                        </HoverButton>
                    </Link>
                    <Link to="/live_search" style={{ textDecoration: 'none' }} tabIndex={-1}>
                        <HoverButton className={location.pathname === "/live_search" ? "current" : ""}>
                            {t('MenuBar.games')}
                        </HoverButton>
                    </Link>
                    {context.matchId != null &&
                        <Link to="/live" style={{ textDecoration: 'none' }} tabIndex={-1}>
                            <HoverButton
                                className={location.pathname === "/live" ? "current" : ""}
                                sx={{ color: 'white', display: 'block' }}
                            >
                                {t('MenuBar.live')}
                            </HoverButton>
                        </Link>
                    }
                </Box>

                <MenuLoginForm padding={padding} />
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;