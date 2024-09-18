import { useEffect } from "react";

export function useShortcuts(onEnter: (() => void) | null, onEsc: (() => void) | null, enabled: boolean) {
    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (e.code === "Enter" && onEnter != null) {
                console.log("onEnter");
                onEnter();
            } else if (e.code === "Escape" && onEsc != null) {
                console.log("onEsc");
                onEsc();
            }
        }

        // only add when enabled
        if (enabled)
            document.addEventListener("keydown", keyHandler);
        return () => {
            document.removeEventListener("keydown", keyHandler);
        }
    }, [enabled, onEnter, onEsc]);
}
