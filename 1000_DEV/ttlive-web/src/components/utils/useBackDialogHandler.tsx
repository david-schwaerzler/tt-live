import { useCallback, useEffect } from "react";

export function useBackDialogHandler(show: boolean, setShow: (show: boolean) => void) {

    useEffect(() => {
        const changeListener = (ev: HashChangeEvent) => {
            console.log(ev.newURL)
            if (show)
                if (ev.newURL.includes("?dialog") === false)
                    setShow(false)
        };

        if (show) {
            if (window.location.hash.includes("?dialog") === false)
                window.location.hash += "?dialog";

            window.addEventListener("hashchange", changeListener);
        } else {
            if(window.location.hash.includes("?dialog") === true)
                window.location.hash = window.location.hash.replace("?dialog", "")
        }

        return () => {
            window.removeEventListener("hashchange", changeListener);
        };
    }, [show, setShow]);
}