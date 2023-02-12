import { Card, CardContent } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation, useNavigate } from "react-router";
import LoginForm from "../common/components/login/LoginForm";

export interface LoginViewProps {

}

const LoginView = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Container>
            <Card sx={{ margin: "auto", maxWidth: "30em" }}>
                <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", mt: 2 }}>
                    <LoginForm onLogin={onLogin} />
                </CardContent>
            </Card>
        </Container>
    );

    function onLogin() {
        if (location.pathname.endsWith("/login")) {
            navigate("/profile")
        } else {
            // No need to navigate. The login page has been called by the react auth kit.
            // It has been tried to access a private Route.
            // Afte login the react auth kit will handle the redirect
        }
    }
}

export default LoginView;