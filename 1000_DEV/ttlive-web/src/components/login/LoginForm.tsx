import styled from "@emotion/styled";
import { AccountCircle, Translate } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export interface LoginFormProps {
    /* Resposive padding for the Toolbar */
    padding: any
}

const SmallTextField = styled(TextField)({
    margin: "auto",

    "& .MuiFormLabel-root": {
       // transform: "translate(14px, 5px) scale(1);",
    },
    "& .MuiFormLabel-root.Mui-focused": {
       // transform: "translate(14px, -9px) scale(0.75);",
    },
    input: {
        padding: "5px"
    }
});

const WhiteTextField = styled(SmallTextField)({

    "& .MuiFormLabel-root": {
        color: "white",
        transform: "translate(14px, 5px) scale(1);",
    },
    "& .MuiFormLabel-root.Mui-focused": {
        color: "white",
        transform: "translate(14px, -9px) scale(0.75);",
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
});


const WhiteButton = styled(Button)({
    color: "white",
    paddingTop: "4px",
    paddingBottom: "4px",
    borderColor: "white",
    '&:hover': {
        borderColor: "white"
    }
})


const LoginForm = (props: LoginFormProps) => {

    const [loginAnchor, setLoginAnchor] = useState<null | HTMLElement>(null);

    return (
        <Box sx={{ pl: props.padding }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: "1em", flexGrow: 0 }}  >
                <WhiteTextField label="Username" variant="outlined" />
                <WhiteTextField label="password" variant="outlined" />
                <WhiteButton variant="outlined">Login</WhiteButton>
                <WhiteButton variant="outlined">Registrieren</WhiteButton>

            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 0 }}  >
                <IconButton onClick={e => setLoginAnchor(e.currentTarget)} sx={{ p: 0 }}>
                    <AccountCircle sx={{ color: "white" }} />
                </IconButton>
            </Box>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={loginAnchor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={loginAnchor != null}                
                onClose={() => setLoginAnchor(null)}>                
                <Stack direction="column" sx={{padding: "0px 10px 10px 10px"}} spacing="10px">
                    <SmallTextField label="Username" sx={{ pt: "10px" }} inputProps={{ style: { padding: "5px" } }} variant="outlined" />
                    <SmallTextField label="password" sx={{ pt: "10px" }} inputProps={{ style: { padding: "5px" } }} variant="outlined" />
                    <Box>
                        <Button>Login</Button>
                        <Button>Register</Button>
                    </Box>
                </Stack>


            </Menu>
        </Box >

    )
}


export default LoginForm;