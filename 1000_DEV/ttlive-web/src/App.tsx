
import { HomeView } from './views/HomeView';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CreateGameView from './views/CreateGameView';
import React from 'react';
import MainView from './containers/MainView';
import LoginView from './views/LoginView';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={renderContent(<HomeView />)} />
                    <Route path="create" element={renderContent(<CreateGameView />)} />
                    <Route path="login" element={renderContent(<LoginView />)} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );

    function renderContent(content: React.ReactNode) {
        return <MainView content={content} />
    }
}

export default App;
