import axios from "axios";
import React, { useEffect } from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { Config } from "./Config";

const AuthUtil = () => {

    let authHeader = useAuthHeader();
    let isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        const id = axios.interceptors.request.use((config: any) => {
            if (isAuthenticated()) {
                config.headers["Authorization"] = authHeader();
            }          
            return config;
        });

        return () => axios.interceptors.request.eject(id);
    }, [authHeader, isAuthenticated]);

    useEffect(() => {
        axios.defaults.baseURL = Config.REST_URL;
        axios.defaults.headers.common['Content-Type'] = "application/json";
    }, []);

    return <React.Fragment></React.Fragment>
}

export default AuthUtil;