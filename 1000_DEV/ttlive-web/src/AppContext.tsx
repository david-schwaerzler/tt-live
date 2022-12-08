import React from "react";

export type EditorCode = { [matchId: number]: string };

export interface AppContextProps {
    matchId: number | null;
    editorCode: EditorCode;

    setMatchId: (id: number | null) => void;
    setEditorCode: (matchId: number, editorCode: string) => void;

    setSetting: (key: string, value: string, persist: boolean) => void;
    getSetting: (key: string) => string;

    isAuthenticated: boolean;
    doLogin: (isAuthenticated: boolean) => void;
}

export const AppContext = React.createContext<AppContextProps>({
    matchId: -1,
    editorCode: {},
    isAuthenticated: false,
    setEditorCode: (matchId, editorCode) => { },
    setMatchId: code => { },
    setSetting: () => { },
    getSetting: () => "",
    doLogin: () => {}
});