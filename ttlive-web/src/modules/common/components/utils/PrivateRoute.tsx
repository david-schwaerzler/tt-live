import { Box } from "@mui/material";
import { useIsAuthenticated } from "react-auth-kit";
import { Navigate } from "react-router";

export interface PrivateRouteProps {
    children: JSX.Element,
    login: string
}

const PrivateRoute = ({ children, login }: PrivateRouteProps) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? children : <Box><Navigate to={login} /></Box>;
};

export default PrivateRoute;
