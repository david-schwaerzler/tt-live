
import { HomeView } from './views/HomeView';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CreateGameView from './views/CreateGameView';
import React, { useMemo, useState } from 'react';
import MainView from './containers/MainView';
import LoginView from './views/LoginView';
import LiveView from './views/LiveView';
import { AppContext, AppContextProps } from './AppContext';
import LiveSearch from './views/LiveSearchView';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function App() {
    const [matchId, setMatchId] = useState<number | null>(() => {
        let matchId = localStorage.getItem("matchId");
        return matchId == null || matchId === "" ? null : parseInt(matchId);
    });
    const [editorCode, setEditorCode] = useState<string>(() => {
        let editorCode = localStorage.getItem("editorCode");
        return editorCode == null ? "" : editorCode;
    });


    const valueProvider: AppContextProps = useMemo(() => ({
        matchId: matchId,
        editorCode: editorCode,
        setMatchId: id => { localStorage.setItem("matchId", id == null ? "" : id.toString()); setMatchId(id) },
        setEditorCode: editorCode => { localStorage.setItem("editorCode", editorCode); setEditorCode(editorCode) }
    }), [matchId, setMatchId, editorCode]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>

        <div className="App">
            <AppContext.Provider value={valueProvider}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={renderContent(<HomeView />)} />
                        <Route path="create" element={renderContent(<CreateGameView />)} />
                        <Route path="login" element={renderContent(<LoginView />)} />
                        <Route path="live_search" element={renderContent(<LiveSearch />)} />
                        <Route path="live" element={renderContent(<LiveView />)} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </div>
        </LocalizationProvider>
    );

    function renderContent(content: React.ReactNode) {
        return <MainView content={content} />
    }
}

export default App;
