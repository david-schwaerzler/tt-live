import React from "react";

export type EditorCode = { [matchId: number]: string };

export interface AppContextProps {
    matchId: number | null;
    editorCode: EditorCode;

    setMatchId: (id: number | null) => void;
    setEditorCode: (matchId: number, editorCode: string) => void;
}

export const AppContext = React.createContext<AppContextProps>({
    matchId: -1,
    editorCode: {},
    setEditorCode: (matchId, editorCode) => { },
    setMatchId: code => { }
});