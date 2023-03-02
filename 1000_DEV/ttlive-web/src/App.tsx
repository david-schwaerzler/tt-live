
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import React, { Suspense, useMemo, useState } from 'react';
import MainView from './modules/containers/MainView';
import { AppContext, AppContextProps } from './AppContext';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AuthProvider } from 'react-auth-kit';
import PrivateRoute from './modules/common/components/utils/PrivateRoute';
import { tokenRefreshApi } from './rest/api/LoginApi';
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import AuthUtil from "./modules/common/components/utils/AuthUtil";
import { useLocalStorage } from "./modules/common/hooks/useLocalStorage";
import { useEditorCodes } from "./modules/common/hooks/useEditorCodes";
import { MatchFilterOptions } from "./modules/live_search/components/MatchFilterOptions";

const HomeView = React.lazy(() => import("./modules/home/HomeView"));
const LoginView = React.lazy(() => import("./modules/login/LoginView"));
const CreateGameView = React.lazy(() => import("./modules/create_match/CreateMatchView"));
const RegisterView = React.lazy(() => import("./modules/login/RegisterView"));
const LiveSearch = React.lazy(() => import("./modules/live_search/LiveSearchView"));
const LiveView = React.lazy(() => import("./modules/live/LiveView"));
const ImprintView = React.lazy(() => import("./modules/home/components/ImprintView"));
const ProfileView = React.lazy(() => import("./modules/profile/ProfileView"));

function App() {

    const [matchId, setMatchId] = useLocalStorage<number | null>("matchId", null);
    const [editorCode, setEditorCode] = useEditorCodes();
    const [matchFilter, setMatchFilter] = useState<MatchFilterOptions>({});

    const [settings, setSettings] = useState<any>(() => {
        let settingJson = localStorage.getItem("settings");
        if (settingJson == null || settingJson === "")
            return {};
        try {
            return JSON.parse(settingJson);
        } catch (e) {
            return {};
        }
    })


    const valueProvider: AppContextProps = useMemo(() => ({
        matchId: matchId,
        editorCode: editorCode,
        setMatchId: id => { setMatchId(id, true) },
        setEditorCode: setEditorCode,
        setSetting: (key, value, persist) => {
            let copy = { ...settings };
            copy[key] = value;
            setSettings(copy);

            if (persist) {
                let settingJson = localStorage.getItem("settings");
                let storedSettings: any = {};
                if (settingJson == null || settingJson === "")
                    settingJson = "{}"
                try {
                    storedSettings = JSON.parse(settingJson);
                    storedSettings[key] = value;
                    localStorage.setItem("settings", JSON.stringify(storedSettings));
                } catch (e) {
                    storedSettings[key] = value;
                    localStorage.setItem("settings", JSON.stringify(storedSettings));
                }
            }
        },
        getSetting: key => {
            return settings[key]
        },
        setMatchFilter: setMatchFilter,
        matchFilter: matchFilter
    }), [matchId, editorCode, settings, setEditorCode, setMatchId, matchFilter]);

    return (
        <React.StrictMode>
            <div className="App">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <AppContext.Provider value={valueProvider}>
                        <AuthProvider
                            authType={'cookie'}
                            authName={'_auth'}
                            cookieDomain={window.location.hostname}
                            cookieSecure={window.location.protocol === "https:"}
                            refresh={tokenRefreshApi}>

                            <AuthUtil />

                            <Suspense fallback={<LoadingSpinner />}>
                                <HashRouter>
                                    <Routes>
                                        <Route path="/" element={renderContent(<HomeView />)} />
                                        <Route path="login" element={renderContent(<LoginView />)} />
                                        <Route path="create" element={renderContent(<CreateGameView />)} />
                                        <Route path="register" element={renderContent(<RegisterView />)} />
                                        <Route path="live_search" element={renderContent(<LiveSearch />)} />
                                        <Route path="live" element={renderContent(<LiveView />)} />
                                        <Route path="imprint" element={renderContent(<ImprintView />)} />
                                        <Route path="profile" element={renderContent(<ProfileView />, true)} />
                                        <Route path="*" element={<Navigate to="/" />} />
                                    </Routes>
                                </HashRouter>
                            </Suspense>
                        </AuthProvider>
                    </AppContext.Provider>
                </LocalizationProvider>
            </div>

        </React.StrictMode >
    );

    function renderContent(content: React.ReactNode, secured: boolean = false): JSX.Element {
        if (secured)
            return <PrivateRoute login='/login'><MainView content={content} /></PrivateRoute>

        return <MainView content={content} />
    }
}

const LoadingSpinner = () => {
    return (
        <Box height="100vh" sx={{ backgroundColor: "#121212", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress sx={{ color: "#ef6c00" }} size="60px" />
        </Box>
    );
}
export default App;
