import axios from "axios";
import React, { useEffect } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Config } from "./Config";

const AuthUtil = () => {

    let authHeader = useAuthHeader();
    
    useEffect(() => {        
        axios.defaults.baseURL  = Config.REST_URL;
        axios.defaults.headers.common['Authorization'] = authHeader();
        axios.defaults.headers.common['Content-Type'] = "application/json";
        console.log("authHeader: " + authHeader())
    }, [authHeader]);

    return <React.Fragment></React.Fragment>
}

export default AuthUtil;