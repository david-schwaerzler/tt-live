import React from "react";

export interface AppContextProps {
    code: string;
    editorCode: string;

    setCode: (code: string) => void;
    setEditorCode: (editorCode: string) => void;
}

export const AppContext = React.createContext<AppContextProps>({
    code: "",
    editorCode: "",
    setEditorCode: editorCode => {},
    setCode: code => {}
});