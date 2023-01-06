
import { HomeView } from './views/HomeView';
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import CreateGameView from './views/CreateGameView';
import React, { useMemo, useState } from 'react';
import MainView from './containers/MainView';
import LoginView from './views/LoginView';
import LiveView from './views/LiveView';
import { AppContext, AppContextProps, EditorCode } from './AppContext';
import LiveSearch from './views/LiveSearchView';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ImprintView from './views/ImprintView';
import RegisterView from './views/RegisterView';
import { AuthProvider } from 'react-auth-kit';
import PrivateRoute from './components/utils/PrivateRoute';
;

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
    const [isAuthenticated, setAuthenticated] = useState(false);


    const valueProvider: AppContextProps = useMemo(() => ({
        matchId: matchId,
        editorCode: editorCode,
        isAuthenticated: isAuthenticated,
        setMatchId: id => { localStorage.setItem("matchId", id == null ? "" : id.toString()); setMatchId(id) },
        setEditorCode: (matchId, newCode) => {
            let copy = { ...editorCode };
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
        doLogin: isAuthenticated => setAuthenticated(isAuthenticated)

    }), [matchId, editorCode, settings, isAuthenticated]);

    return (
        <React.StrictMode>
            <div className="App">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <AppContext.Provider value={valueProvider}>
                        <AuthProvider
                            authType={'cookie'}
                            authName={'_auth'}
                            cookieDomain={window.location.hostname}
                            cookieSecure={window.location.protocol === "https:"}>

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

    function renderContent(content: React.ReactNode, secured: boolean = false): JSX.Element {
        if (secured)
            return <PrivateRoute login='/login'><MainView content={content} /></PrivateRoute>

        return <MainView content={content} />
    }

}

export default App;
