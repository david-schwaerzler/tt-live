import { useCallback, useState } from "react";

export function useErrorArrays(): [Array<string>, (key: number, msg: string) => void, () => void] {

    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);

    const updateErrors = useCallback((key: number, msg: string) => {
        setErrorMsgs(errorMsgs => {
            let tmp = [...errorMsgs];
            tmp[key] = msg;
            return tmp;
        });
    }, []);

    const clearErrors = useCallback(() => {
        setErrorMsgs([]);
    }, []);

    return [errorMsgs, updateErrors, clearErrors];
}