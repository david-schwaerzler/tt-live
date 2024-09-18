import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../AppContext";
import { fetchValidateErrorCode } from "../../../rest/api/MatchApi";

export function useEditorCode(matchId: number | null) {
    const context = useContext(AppContext);
    const [editorCode, setEditorCode] = useState<string | null>(null);

    useEffect(() => {
        if(matchId != null){
            let editorCode = context.editorCode[matchId]
            if (editorCode == null)
                return;
            
            fetchValidateErrorCode(matchId, editorCode).then(response => {
                if(response.data != null)
                    if(response.data)
                        setEditorCode(editorCode);

            })
        }
    }, [matchId, context.editorCode])

    return editorCode;
}