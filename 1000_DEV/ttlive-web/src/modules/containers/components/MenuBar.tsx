import { AccountCircle } from "@mui/icons-material";
import { AppBar, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from 'react-router-dom'
import { AppContext } from "../../../AppContext";
import MenuLoginForm from "./MenuLoginForm";
import Logout from '@mui/icons-material/Logout';
import { LogoIcon } from "../../common/components/utils/Icons";

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

const padding = { xs: 1, sm: 5 };

const MenuBar = () => {

    const [t] = useTranslation();
    const context = useContext(AppContext);
    const location = useLocation();
    const theme = useTheme();
    const isAuthenticated = useIsAuthenticated();
    const isBig = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <AppBar position="sticky" elevation={2} sx={{ p: 0 }}>
            <Toolbar sx={{ paddingLeft: { xs: 1, sm: 2 }, p: 0 }}>
                <Box sx={{ pr: padding }}>
                    <LogoIcon sx={{ mt: "5px" }} color={theme.palette.mode === "dark" ? theme.palette.primary.main : "#FFFFFF"} />
                </Box>
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
                                <i>{t('MenuBar.live')}</i>
                            </HoverButton>
                        </Link>
                    }

                    {isAuthenticated() && (isBig
                        ? <MenuBarDesktop />
                        : <MenuBarMobile />
                    )}
                </Box>

                {isAuthenticated() === false && <MenuLoginForm isBig={isBig} />}
            </Toolbar>
        </AppBar>
    );
}

const MenuBarMobile = () => {

    const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);
    const [t] = useTranslation();
    const signOut = useSignOut();
    const location = useLocation();

    useEffect(() => {
        setLoginAnchor(null);
    }, [location.pathname])

    useEffect(() => {
        setLoginAnchor(null);

    }, [])
    return (
        <React.Fragment>
            <Box sx={{ mr: 2, flexGrow: 1, display: "flex", justifyContent: "right", alignItems: "center" }}>
                <IconButton onClick={e => setLoginAnchor(e.currentTarget)} sx={{ p: 0 }}>
                    <AccountCircle color="primary" />
                </IconButton>
            </Box>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={loginAnchor}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={loginAnchor != null}
                onClose={() => setLoginAnchor(null)}>
                <Link to="/profile" style={{ textDecoration: 'none', color: "inherit" }} tabIndex={-1} onClick={() => setLoginAnchor(null)}>
                    <MenuItem >
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <ListItemText>
                            {t("MenuBar.myAccount")}
                        </ListItemText>
                    </MenuItem>
                </Link>
                <Divider />

                <MenuItem onClick={() => { signOut(); setLoginAnchor(null); }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>
                        {t("MenuBar.logout")}
                    </ListItemText>
                </MenuItem>
            </Menu>
        </React.Fragment >
    )
}

const MenuBarDesktop = () => {
    const [t] = useTranslation();
    const location = useLocation();
    const signOut = useSignOut();

    return (
        <React.Fragment>
            <Divider orientation="vertical" sx={{ borderRightWidth: "2px", borderColor: "white", borderRadius: "5px", borderRightStyle: "solid" }} flexItem />           
            <Link to="/profile" style={{ textDecoration: 'none', flexGrow: 1 }} tabIndex={-1}>
                <HoverButton className={location.pathname === "/profile" ? "current" : ""}>
                    {t('MenuBar.profile')}
                </HoverButton>
            </Link>

            <HoverButton onClick={() => signOut()}>
                {t('MenuBar.logout')}
            </HoverButton>
        </React.Fragment>
    )
}

export default React.memo(MenuBar);