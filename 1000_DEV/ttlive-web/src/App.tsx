
import MenuBar from './containers/MenuBar';
import { HomeView } from './views/HomeView';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import CreateGameView from './views/CreateGameView';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <MenuBar />
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="create" element={<CreateGameView />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
