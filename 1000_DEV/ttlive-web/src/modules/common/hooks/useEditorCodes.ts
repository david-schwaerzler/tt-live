import { useCallback, useMemo, useState } from "react";
import { EditorCode } from "../../../AppContext";
import { useLocalStorage } from "./useLocalStorage";

export function useEditorCodes(): [editorCode: EditorCode, onChange: (matchId: number, editorCode: string, persist: boolean) => void] {
    const [editorCodesStore, setEditorCodeStore] = useLocalStorage<EditorCode>("editorCode", {})
    const [editorCodesState, setEditorCodeState] = useState<EditorCode>({});

    const onChange = useCallback((matchId: number, editorCode: string, persist: boolean) => {

        if (editorCode === "") {
            let stateCopy = { ...editorCodesState };
            delete stateCopy[matchId];
            setEditorCodeState(stateCopy);

            let storeCopy = { ...editorCodesStore };
            delete storeCopy[matchId];
            setEditorCodeStore(storeCopy, true);
        } else {

            if (persist) {
                let storeCopy = { ...editorCodesStore };
                storeCopy[matchId] = editorCode;
                setEditorCodeStore(storeCopy, true);

            } else {
                let stateCopy = { ...editorCodesState };
                stateCopy[matchId] = editorCode;
                setEditorCodeState(stateCopy);
            }
        }
    }, [editorCodesState, editorCodesStore, setEditorCodeStore]);

    const editorCodes = useMemo(() => ({ ...editorCodesStore, ...editorCodesState }), [editorCodesState, editorCodesStore]);

    console.log({ "ec": editorCodes, "state": editorCodesState, "store": editorCodesStore });

    return [editorCodes, onChange];
}