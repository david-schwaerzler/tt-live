import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from 'react-router-dom'
import LoginForm from "./LoginForm";

export interface MenuBarProps {

}

const padding = { xs: "0.5em", md: "2em" }
const MenuBar = (props: MenuBarProps) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit" sx={{minWidth: "fit-content"}}>
                    TT-Live
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: padding }} />
                <Box sx={{ flexGrow: 1, display: 'flex', gap: padding }} >
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                            onClick={() => { }}
                            sx={{ color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                    </Link>
                </Box>
                <LoginForm padding={padding} />
            </Toolbar>
        </AppBar>
    );
}

export default MenuBar;