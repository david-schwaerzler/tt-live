import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { AppContext } from "../../../../AppContext";
import { fetchEditorCodes } from "../../../../rest/api/AccountApi";
import { Config } from "../../utils/Config";

const AuthUtil = () => {

    let authHeader = useAuthHeader();
    let isAuthenticated = useIsAuthenticated();
    const context = useContext(AppContext);
    const isAuthRef = useRef(isAuthenticated());

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


    useEffect(() => {
        async function fetch(){
            let response = await fetchEditorCodes();
            if(response.data != null){
                for(let code of response.data){
                    context.setEditorCode(code.matchId, code.editorCode, false);
                }
            }
                
        }

        if(isAuthenticated() && isAuthRef.current === false){
            isAuthRef.current = true;
            fetch();
        }else{
            isAuthRef.current = false;
        }
    }, [isAuthenticated, context])

    return <React.Fragment></React.Fragment>
}

export default AuthUtil;