import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAccountMatches } from "../../rest/api/AccountApi";
import { SimpleMatch } from "../../rest/data/Match";
import MyGamesList from "./components/MyGameList/MyGamesList";

const MyGamesView = () => {

    const [matches, setMatches] = useState<Array<SimpleMatch>>([]);
    const [error, setError] = useState<string>();
    const [t] = useTranslation();

    useEffect(() => {
        async function fetch() {
            let response = await fetchAccountMatches();
            if (response.data != null)
                setMatches(response.data);
            else {
                setError(t("Common.errorHttp"));
            }            
        }

        fetch();
    }, [t]);

    return (
        <MyGamesList matches={matches} />
    );
}

export default MyGamesView;