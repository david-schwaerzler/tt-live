import { useCallback, useState } from "react";


function getItem<T>(key: string, initValue: T) {
    const item = localStorage.getItem(key);
    if (item == null)
        return initValue;
    let parsedItem = JSON.parse(item);
    return parsedItem;
}

export function useLocalStorage<T>(key: string, initValue: T): [value: T, setValue: (value: T, persist: boolean) => void] {

    const [value, setValue] = useState(() => getItem(key, initValue));

    const onUpdate = useCallback((value: T, persist: boolean) => {
        setValue(value);
        if (persist)
            localStorage.setItem(key, JSON.stringify(value));
    }, [key]);

    return [value, onUpdate];
}