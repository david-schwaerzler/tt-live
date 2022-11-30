
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
            copy[matchId] = newCode;
            setEditorCode(copy);
            localStorage.setItem("editorCode", JSON.stringify(copy));
        },
        setSetting: (key, value, persist) => {
            let copy = {...settings};
            copy[key] = value;
            setSettings(copy);

            if(persist){
                let settingJson = localStorage.getItem("settings");
                let storedSettings : any = {};
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
        }

    }), [matchId, setMatchId, editorCode, settings]);

    return (
        <React.StrictMode>
            <LocalizationProvider dateAdapter={AdapterMoment}>

                <div className="App">
                    <AppContext.Provider value={valueProvider}>
                        <HashRouter>
                            <Routes>
                                <Route path="/" element={renderContent(<HomeView />)} />
                                <Route path="create" element={renderContent(<CreateGameView />)} />
                                <Route path="login" element={renderContent(<LoginView />)} />
                                <Route path="live_search" element={renderContent(<LiveSearch />)} />
                                <Route path="live" element={renderContent(<LiveView />)} />
                                <Route path="imprint" element={renderContent(<ImprintView />)} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </HashRouter>
                    </AppContext.Provider>
                </div>
            </LocalizationProvider>
        </React.StrictMode>
    );

    function renderContent(content: React.ReactNode) {
        return <MainView content={content} />
    }
}

export default App;
