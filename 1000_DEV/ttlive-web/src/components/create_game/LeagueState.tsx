import { Autocomplete, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { GameStyle } from "../../rest/GameStyle";
import { League } from "../../rest/League";
import { Config } from "../utils/Config";
import ErrorMessage from "../utils/ErrorMessage";
import { spacingNormal, spacingSmall } from "../utils/StyleVars";
import { MatchStateObject } from "./MatchStateObject";
import { StateProps } from "./StateProps";

const ERROR_GENERAL = 0;
const ERROR_LEAGUE = 1;
const ERROR_GAME_STYLE = 2;

const LeagueState = ({ matchStateObject, onUpdate, setValidate }: StateProps) => {
    const [leagues, setLeagues] = useState<Array<League>>([]);
    const [leagueInput, setLeagueInput] = useState<string>('')
    const [gameStyles, setGameStyles] = useState<Array<GameStyle>>([]);
    const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);
    const hasFetchedData = useRef(false);

    const updateError = useCallback((code: number, msg: string) => {
        let updated = [...errorMsgs]
        updated[code] = msg;
        setErrorMsgs(updated);
    }, [errorMsgs]);

    const fetchLeagues = useCallback(async () => {
        try {

            if (matchStateObject.region == null) {
                updateError(ERROR_GAME_STYLE, "Es muss zunächst ein Verband ausgewählt werden.")
                return;
            } else if (matchStateObject.contest == null) {
                updateError(ERROR_GENERAL, "Es muss zunächst eine Konkurrenz ausgewählt werden.")
                return;
            }

            let response = await fetch(Config.REST_URL + `/region/${matchStateObject.region.id}/leagues?content=${matchStateObject.contest}`)
            if (!response.ok) {
                console.log(`Error fetching leagues. status: '${response.status}'`)
                updateError(ERROR_GENERAL, `Leider kann der Server nicht erreicht werden. Bitte versuchen sie es später noch einmal`);
                return;
            }
            let leagues: Array<League> = await response.json();
            setLeagues(leagues);

        } catch (error) {
            console.log(`Error fetching leagues. error: '${error}'`)
            updateError(ERROR_GENERAL, `Leider kann der Server nicht erreicht werden. Bitte versuchen sie es später noch einmal`)
        }
    }, [updateError, matchStateObject.region, matchStateObject.contest]);

    const fetchGmeStyles = useCallback(async () => {
        try {
            let response = await fetch(Config.REST_URL + "/game_style")
            if (!response.ok) {
                console.log(`Error fetching gameStyle. status: '${response.status}'`)
                updateError(ERROR_GENERAL, `Leider kann der Server nicht erreicht werden. Bitte versuchen sie es später noch einmal`);
                return;
            }
            let gameStyles: Array<GameStyle> = await response.json();
            setGameStyles(gameStyles);
        } catch (error) {
            console.log(`Error fetching gameStyle. error: '${error}'`)
            updateError(ERROR_GENERAL, `Leider kann der Server nicht erreicht werden. Bitte versuchen sie es später noch einmal`)
        }
    }, [updateError]);


    useEffect(() => {
        function onValidate(matchStateObject: MatchStateObject) {
            if (matchStateObject.league == null) {
                updateError(ERROR_LEAGUE, "Es muss eine Liga ausgewählt werden");
                return false;
            } else if (matchStateObject.gameStyle == null) {
                updateError(ERROR_GAME_STYLE, "Es muss ein Spielsystem ausgewählt werden");
                return false;
            }

            return true;
        };

        if (hasFetchedData.current === false) {
            setErrorMsgs([])
            setValidate(onValidate);
            fetchGmeStyles();
            fetchLeagues();
            hasFetchedData.current = true;
        }
    }, [setValidate, updateError, fetchGmeStyles, fetchLeagues])

    return (
        <Box sx={{ width: "100%" }}>
            <ErrorMessage msg={errorMsgs[ERROR_GENERAL]} centered sx={{ paddingBottom: spacingSmall }} />

            <Stack sx={{ flexDirection: { xs: "column", md: "row" } }} justifyContent="space-evenly" alignItems="center" >
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_LEAGUE]} centered />
                    <Autocomplete
                        id="auto-league"
                        sx={{ minWidth: "200px", alignSelf: "center" }}
                        value={matchStateObject.league}
                        onChange={(e, value) => onLeagueSelected(value)}
                        options={leagues}
                        getOptionLabel={option => option.name}
                        inputValue={leagueInput}
                        onInputChange={(e, value) => setLeagueInput(value)}
                        renderInput={(params) => <TextField {...params} label="Liga" />}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                    />
                </Box>
                <Box sx={{ paddingTop: spacingNormal, display: { xs: "block", md: "none" } }}></Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: spacingSmall }}>
                    <ErrorMessage msg={errorMsgs[ERROR_GAME_STYLE]} centered />
                    <FormControl sx={{ minWidth: "200px", alignSelf: "center" }}  >
                        <InputLabel id="select-gameStyle">Spielsystem</InputLabel>
                        <Select
                            id="select-gameStyle"
                            labelId="select-gameStyle"
                            label="select-gameStyle"
                            value={matchStateObject.gameStyle == null || gameStyles.length === 0 ? '' : matchStateObject.gameStyle.id}
                            onChange={e => onGameStyleSelected(e.target.value)}>
                            {gameStyles.map((value, index) =>
                                <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                </Box>
            </Stack>
        </Box >
    );

    function onLeagueSelected(value: League | null) {
        let updated = { ...matchStateObject };
        updated.league = value;
        updateError(ERROR_LEAGUE, '')
        onUpdate(updated);
    }

    function onGameStyleSelected(value: string | number) {

        let gameStyle = gameStyles.filter(g => g.id === value);
        if (gameStyle.length === 0 || gameStyle.length > 1) {
            updateError(ERROR_GAME_STYLE, "Spielsystem konnte nicht ausgewählt werden");
            return;
        }
        let updated = { ...matchStateObject };
        updated.gameStyle = gameStyle[0];
        updateError(ERROR_GAME_STYLE, '')        
        onUpdate(updated);
    }
}

export default LeagueState;