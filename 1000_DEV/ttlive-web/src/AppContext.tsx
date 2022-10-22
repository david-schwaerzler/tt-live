import React from "react";

export interface AppContextProps {
    matchId: number | null;
    editorCode: string;

    setMatchId: (id: number | null) => void;
    setEditorCode: (editorCode: string) => void;
}

export const AppContext = React.createContext<AppContextProps>({
    matchId: -1,
    editorCode: "",
    setEditorCode: editorCode => {},
    setMatchId: code => {}
});