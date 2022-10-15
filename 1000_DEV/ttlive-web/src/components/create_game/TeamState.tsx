import { Autocomplete, createFilterOptions, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { isNumericLiteral } from "typescript";
import { Player } from "../../rest/Player";
import { Team } from "../../rest/Team";
import { Config } from "../utils/Config";
import ErrorMessage from "../utils/ErrorMessage";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";
import { MatchStateObject } from "./MatchStateObject";
import ClubSelector from "./selectors/ClubSelector";
import TeamNumberSelector from "./selectors/TeamNumberSelector";
import { StateProps } from "./StateProps";

interface TeamStateProps extends StateProps {
    isHomeTeam: boolean;
}

const ERROR_GENERAL = 0;
const ERROR_CLUB = 1;
const ERROR_NUMBER = 2;



const TeamState = ({ matchStateObject, onUpdate, setValidate, isHomeTeam }: TeamStateProps) => {

    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const [teams, setTeams] = useState<Array<Team>>([]);

    const [players, setPlayers] = useState<Array<Player>>([]);

    const hasFetchedData = useRef(false);
    const [t] = useTranslation();

    const updateError = useCallback((code: number, msg: string) => {
        let updated = [...errorMsgs]
        updated[code] = msg;
        setErrorMsgs(updated);
    }, [errorMsgs]);

    const fetchTeams = useCallback(async () => {
        if (matchStateObject.league == null) {
            updateError(ERROR_GENERAL, t('TeamState.errorLeague'))
            return;
        }

        try {
            let response = await fetch(Config.REST_URL + "/league/" + matchStateObject.league.id + "/teams")
            if (!response.ok) {
                console.log(`Error fetching teams. status: "${response.status}"`)
                updateError(ERROR_GENERAL, t("Common.errorFetch"));
                return;
            }

            let teams: Array<Team> = await response.json();
            setTeams(teams);
        } catch (error) {
            console.log(`Error fetching teams. error: "${error}"`)
            updateError(ERROR_GENERAL, t("Common.errorFetch"))
        }
    }, [updateError, matchStateObject.league, t])

    useEffect(() => {
        function onValidate(matchStateObject: MatchStateObject) {
            if ((isHomeTeam && matchStateObject.homeClub == null) || (!isHomeTeam && matchStateObject.guestClub == null)) {
                updateError(ERROR_CLUB, t("TeamState.errorEmptyClub"));
                return false;
            }

            if ((isHomeTeam && matchStateObject.homeTeam == null) || (!isHomeTeam && matchStateObject.guestTeam == null)) {
                updateError(ERROR_NUMBER, t("TeamState.errorEmptyNumber"));
                return false;
            }

            console.log(matchStateObject)

            return true;
        }

        if (hasFetchedData.current === false) {
            setValidate(onValidate);
            fetchTeams();
            hasFetchedData.current = true;
        }

    }, [updateError, matchStateObject.league, t, fetchTeams, setValidate, isHomeTeam, matchStateObject.homeTeam, matchStateObject.guestTeam])

    return (
        <Box sx={{ width: "100%" }}>
            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingSmall }} />
            <Stack sx={{ flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-end" } }} justifyContent="space-evenly" >
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_CLUB]} centered />
                    <ClubSelector
                        isHomeTeam={isHomeTeam}
                        matchStateObject={matchStateObject}
                        teams={teams}
                        onUpdate={onUpdate}
                        updateError={msg => updateError(ERROR_CLUB, msg)}
                    />
                </Box>
                <Box sx={{ paddingTop: spacingNormal, display: { xs: "block", md: "none" } }}></Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_NUMBER]} centered />
                    <TeamNumberSelector
                        isHomeTeam={isHomeTeam}
                        matchStateObject={matchStateObject}
                        teams={teams}
                        onUpdate={onUpdate}
                        updateError={msg => updateError(ERROR_CLUB, msg)}
                    />

                </Box>
            </Stack>
        </Box>
    );


}


export default TeamState;