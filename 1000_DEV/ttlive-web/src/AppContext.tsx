import React from "react";
import { MatchFilterOptions } from "./modules/live_search/components/MatchFilterOptions";

export type EditorCode = { [matchId: number]: string };

export interface AppContextProps {
    matchId: number | null;
    editorCode: EditorCode;
    matchFilter: MatchFilterOptions;

    setMatchId: (id: number | null) => void;
    setEditorCode: (matchId: number, editorCode: string, persist: boolean) => void;
    setMatchFilter: (filter: MatchFilterOptions) => void;

    setSetting: (key: string, value: string, persist: boolean) => void;
    getSetting: (key: string) => string
}

export const AppContext = React.createContext<AppContextProps>({
    matchId: -1,
    editorCode: {},
    matchFilter: {},
    setEditorCode: (matchId, editorCode, persist) => { },
    setMatchId: code => { },
    setMatchFilter: () => { },

    setSetting: () => { },
    getSetting: () => ""
});