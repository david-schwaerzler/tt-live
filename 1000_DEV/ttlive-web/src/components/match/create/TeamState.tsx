import { FormControl, FormHelperText, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Team } from "../../../rest/data/Team";
import { Config } from "../../utils/Config";
import ErrorMessage from "../../utils/ErrorMessage";
import { spacingNormal } from "../../utils/StyleVars";
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

        if (matchStateObject.league.id === -1) { // League has been created by the user
            setTeams([]);
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

            return true;
        }

        if (hasFetchedData.current === false) {
            setValidate(onValidate);
            fetchTeams();
            hasFetchedData.current = true;
        }

    }, [updateError, t, fetchTeams, setValidate, isHomeTeam, matchStateObject.homeTeam, matchStateObject.guestTeam, matchStateObject.league, matchStateObject.gameStyle])

    return (
        <Box sx={{ width: "100%" }}>

            <Typography variant="h5" sx={{ textAlign: "center", paddingBottom: spacingNormal }}>
                {isHomeTeam ? t('CreateGameView.stepHomeTeam') : t('CreateGameView.stepGuestTeam')}
            </Typography>
            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingNormal }} />
            <Stack sx={{ flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "center", md: "flex-start" },  gap: spacingNormal  }} justifyContent="space-evenly" >
                <FormControl>
                    <ClubSelector
                        isHomeTeam={isHomeTeam}
                        matchStateObject={matchStateObject}
                        teams={teams}
                        onUpdate={onUpdate}
                        updateError={msg => updateError(ERROR_CLUB, msg)}
                        error={errorMsgs[ERROR_CLUB] != null && errorMsgs[ERROR_CLUB] !== ""}
                    />
                    <FormHelperText error={errorMsgs[ERROR_CLUB] != null && errorMsgs[ERROR_CLUB] !== ""} >{errorMsgs[ERROR_CLUB]}</FormHelperText>

                </FormControl>
                <FormControl>
                    <TeamNumberSelector
                        isHomeTeam={isHomeTeam}
                        matchStateObject={matchStateObject}
                        teams={teams}
                        onUpdate={onUpdate}
                        updateError={msg => updateError(ERROR_CLUB, msg)}
                        error={errorMsgs[ERROR_NUMBER] != null && errorMsgs[ERROR_NUMBER] !== ""}
                    />
                    <FormHelperText error={errorMsgs[ERROR_NUMBER] != null && errorMsgs[ERROR_NUMBER] !== ""} >{errorMsgs[ERROR_NUMBER]}</FormHelperText>

                </FormControl>
            </Stack>


        </Box>
    );


}


export default TeamState;