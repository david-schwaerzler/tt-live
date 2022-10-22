import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'
import { AppContext } from "../AppContext";
import MenuLoginForm from "../components/login/MenuLoginForm";


const padding = { xs: "0.25em", md: "2em" }
const MenuBar = () => {

    const [t] = useTranslation();
    const context = useContext(AppContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" sx={{ minWidth: "fit-content", mr: padding }}>
                    TT-Live
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: padding }} />
                <Box sx={{ flexGrow: 1, display: 'flex', gap: padding }} >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            sx={{ color: 'white', display: 'block' }}
                        >
                            {t('MenuBar.home')}
                        </Button>
                    </Link>
                    <Link to="/live_search" style={{ textDecoration: 'none' }}>
                        <Button
                            sx={{ color: 'white', display: 'block' }}
                        >
                            {t('MenuBar.games')}
                        </Button>
                    </Link>
                    {context.matchId != null &&
                        <Link to="/live" style={{ textDecoration: 'none' }}>
                            <Button
                                sx={{ color: 'white', display: 'block' }}
                            >
                                {t('MenuBar.live')}
                            </Button>
                        </Link>
                    }

                </Box>
                <MenuLoginForm padding={padding} />
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;