
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import React, { Suspense, useMemo, useState } from 'react';
import MainView from './containers/MainView';
import { AppContext, AppContextProps, EditorCode } from './AppContext';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AuthProvider } from 'react-auth-kit';
import PrivateRoute from './components/utils/PrivateRoute';
import AuthUtil from './components/utils/AuthUtil';
import { tokenRefreshApi } from './rest/api/LoginApi';

const HomeView = React.lazy(() => import("./views/HomeView"));
const LoginView = React.lazy(() => import("./views/LoginView"));
const CreateGameView = React.lazy(() => import("./views/CreateGameView"));
const RegisterView = React.lazy(() => import("./views/RegisterView"));
const LiveSearch = React.lazy(() => import("./views/LiveSearchView"));
const LiveView = React.lazy(() => import("./views/LiveView"));
const ImprintView = React.lazy(() => import("./views/ImprintView"));



function App() {

    const [matchId, setMatchId] = useState<number | null>(() => {
        let matchId = localStorage.getItem("matchId");
        return matchId == null || matchId === "" ? null : parseInt(matchId);
    });
    const [editorCode, setEditorCode] = useState<EditorCode>(() => {
        let editorCodeStr = localStorage.getItem("editorCode");
        try {
            return JSON.parse(editorCodeStr == null ? "{}" : editorCodeStr);
        } catch (e) {
            return {};
        }

    });
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
        setMatchId: id => { localStorage.setItem("matchId", id == null ? "" : id.toString()); setMatchId(id) },
        setEditorCode: (matchId, newCode) => {
            let copy = { ...editorCode };
            if (newCode === "")
                delete copy[matchId];
            else
                copy[matchId] = newCode;
            setEditorCode(copy);
            localStorage.setItem("editorCode", JSON.stringify(copy));
        },
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

    }), [matchId, editorCode, settings]);

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

                            <HashRouter>
                                <Routes>
                                    <Route path="/" element={renderContent(<HomeView />)} />
                                    <Route path="login" element={renderContent(<LoginView />)} />
                                    <Route path="create" element={renderContent(<CreateGameView />)} />
                                    <Route path="register" element={renderContent(<RegisterView />)} />
                                    <Route path="live_search" element={renderContent(<LiveSearch />)} />
                                    <Route path="live" element={renderContent(<LiveView />)} />
                                    <Route path="imprint" element={renderContent(<ImprintView />)} />

                                    <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                            </HashRouter>
                        </AuthProvider>
                    </AppContext.Provider>
                </LocalizationProvider>
            </div>

        </React.StrictMode >
    );

    // TODO Add fallback gif or image
    function renderContent(content: React.ReactNode, secured: boolean = false): JSX.Element {
        if (secured)
            return <Suspense fallback={<h1>Loading</h1>}><PrivateRoute login='/login'><MainView content={content} /></PrivateRoute></Suspense>

        return <Suspense fallback={<h1>Loading</h1>}><MainView content={content} /></Suspense>
    }

}

export default App;
