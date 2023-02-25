import { useEffect } from "react";

export function useBackDialogHandler(show: boolean, setShow: (show: boolean) => void, hash: string = "dialog") {

    useEffect(() => {
        const changeListener = (ev: HashChangeEvent) => {
            if (show)
                if (ev.newURL.includes("?" + hash) === false){
                    setShow(false)
                }
        };

        if (show) {            
            if (window.location.hash.includes("?" + hash) === false){
                window.location.hash += "?" + hash;
            }

            window.addEventListener("hashchange", changeListener);
        } else {
            if(window.location.hash.includes("?" + hash) === true)
                window.location.hash = window.location.hash.replace("?" + hash, "")
        }

        return () => {
            window.removeEventListener("hashchange", changeListener);
        };
    }, [show, setShow]);
}