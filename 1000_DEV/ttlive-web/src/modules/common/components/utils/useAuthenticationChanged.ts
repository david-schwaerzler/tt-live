import { useEffect, useRef } from "react";
import { useIsAuthenticated } from "react-auth-kit";

export function useAuthenticationChanged(onChange: (isAuth: boolean) => void) {

    const isAuthenticated = useIsAuthenticated();
    const wasAuthenticated = useRef<boolean>(isAuthenticated());

    useEffect(() => {
        let isAuth = isAuthenticated();
        if (isAuth === true && wasAuthenticated.current === false) {
            wasAuthenticated.current = true;
            onChange(true)
        } else if (isAuth === false && wasAuthenticated.current === true) {
            wasAuthenticated.current = false;
            onChange(false);
        }
    }, [isAuthenticated, onChange])

}