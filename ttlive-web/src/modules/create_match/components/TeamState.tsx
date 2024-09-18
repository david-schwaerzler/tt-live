import { FormControl, FormHelperText, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { spacingNormal } from "../../common/utils/StyleVars";
import { Team } from "../../../rest/data/Team";
import { MatchStateObject } from "./MatchStateObject";
import { StateProps } from "./StateProps";
import ClubSelector from "../../common/components/autocomplete/ClubSelector";
import TeamNumberSelector from "../../common/components/autocomplete/TeamNumberSelector";
import ErrorMessage from "../../common/components/utils/ErrorMessage";
import { Config } from "../../common/utils/Config";

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
                updateError(ERROR_GENERAL, t("Common.errorHttp"));
                return;
            }

            let teams: Array<Team> = await response.json();
            setTeams(teams);
        } catch (error) {
            console.log(`Error fetching teams. error: "${error}"`)
            updateError(ERROR_GENERAL, t("Common.errorHttp"))
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

            <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
                {isHomeTeam ? t('CreateGameView.stepHomeTeam') : t('CreateGameView.stepGuestTeam')}
            </Typography>
            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingNormal }} />
            <Stack sx={{ flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: spacingNormal }} justifyContent="space-evenly" >
                <FormControl sx={{width: "200px"}}>
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
                <FormControl sx={{ minWidth: "200px" }}>
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