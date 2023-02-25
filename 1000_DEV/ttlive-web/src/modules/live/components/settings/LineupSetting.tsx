import { Button,  FormControl, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { putLineup } from "../../../../rest/api/MatchApi";
import { Doubles, RequestDouble } from "../../../../rest/data/Doubles";
import { Match } from "../../../../rest/data/Match";
import { Player, RequestPlayer } from "../../../../rest/data/Player";
import { RequestLineup } from "../../../../rest/data/RequestLineup";
import CustomAutoComplete from "../../../common/components/autocomplete/CustomAutoComplete";
import LoadingButton from "../../../common/components/buttons/LoadingButton";
import ErrorMessage from "../../../common/components/utils/ErrorMessage";

import BaseSetting from "./BaseSetting";

export interface LineupSettingProps {
    match: Match | null,
    editorCode: string,
    isHomeTeam: boolean
}

const LineupSetting = ({ match, isHomeTeam, editorCode }: LineupSettingProps) => {

    const [doubles, setDoubles] = useState<Array<Doubles>>([]);
    const [players, setPlayers] = useState<Array<Player>>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>(); const [t] = useTranslation();

    useEffect(() => {

        if (match == null) {
            setDoubles([]);
            setPlayers([]);
            return;
        }

        if (expanded === false) {
            let doubles = isHomeTeam ? match.homeDoubles.map(d => ({ ...d })) : match.guestDoubles.map(d => ({ ...d }));
            let players = isHomeTeam ? match.homePlayers.map(d => ({ ...d })) : match.guestPlayers.map(d => ({ ...d }));

            setDoubles(doubles);
            setPlayers(players);
        }

    }, [match, isHomeTeam, expanded]);

    if (match == null)
        return <Skeleton sx={{ height: { xs: "88px", sm: "88px" } }} variant="rectangular" />

    let playerNames: Array<string> = [];
    players.forEach(p => {
        if (p.name !== "" && playerNames.includes(p.name) === false)
            playerNames.push(p.name);
    });
    doubles.forEach(d => {
        if (d.player1 !== "" && playerNames.includes(d.player1) === false)
            playerNames.push(d.player1);
            if (d.player2 !== "" && playerNames.includes(d.player2) === false)
            playerNames.push(d.player2);
    })

    return (
        <BaseSetting title={isHomeTeam ? t('LineupSetting.homeTeam') : t('LineupSetting.guestTeam')} expanded={expanded} onExpandedChanged={setExpanded}>
            <Stack direction="column" sx={{ gap: 2, p: 2 }}>
                <ErrorMessage msg={errorMsg} />

                <Typography variant="h6" width="100%">
                    {t("LineupSetting.player")}:
                    <Button sx={{ float: "right" }} onClick={() => onResetPlayers(match)}>reset</Button>
                </Typography>
                {players.map((player, index) => (
                    <FormControl key={player.id}>
                        <TextField key={player.id} sx={{ minWidth: "100px" }}
                            label={t("LineupSetting.player") + " " + player.position}
                            variant="outlined"
                            value={player.name}
                            onChange={e => updatePlayer(index, e.target.value)}
                            autoComplete="off"
                        />
                    </FormControl>
                ))}

                <Typography variant="h6" width="100%">
                    {t("LineupSetting.double")}:
                    <Button sx={{ float: "right" }} onClick={() => onResetDoubles(match)}>reset</Button>
                </Typography>
                {doubles.map((double, index) => (
                    <Stack gap={1} key={double.id}>
                        <FormControl>
                            <CustomAutoComplete<string>
                                value={double.player1}
                                onChange={name => updateDoubles(index, name ?? "", double.player2)}
                                options={playerNames}
                                label={t('LineupSetting.double') + " " + double.position + " - " + t('LineupSetting.player') + " 1"}
                                onCreateType={name => name}
                                accessor={name => name}
                            />
                        </FormControl>
                        <FormControl>
                            <CustomAutoComplete<string>
                                value={double.player2}
                                onChange={name => updateDoubles(index, double.player1, name ?? "")}
                                options={playerNames}
                                label={t('LineupSetting.double') + " " + double.position + " - " + t('LineupSetting.player') + " 2"}
                                onCreateType={name => name}
                                accessor={name => name}
                            />
                        </FormControl>
                    </Stack>
                ))}

                <LoadingButton loading={loading} variant="outlined" onClick={() => onSave(match)}>Save</LoadingButton>
            </Stack>
        </BaseSetting>
    );

    function updatePlayer(index: number, newName: string) {
        let tmp = [...players];
        let copy = { ...tmp[index], name: newName };
        tmp[index] = copy;
        setPlayers(tmp);
    }
    function updateDoubles(index: number, player1: string, player2: string) {
        let tmp = [...doubles];
        let copy = { ...tmp[index], player1: player1, player2: player2 };
        tmp[index] = copy;
        setDoubles(tmp);
    }

    function onResetDoubles(match: Match) {
        let doubles = isHomeTeam ? match.homeDoubles.map(d => ({ ...d })) : match.guestDoubles.map(d => ({ ...d }));
        setDoubles(doubles);
    }
    function onResetPlayers(match: Match) {
        let players = isHomeTeam ? match.homePlayers.map(d => ({ ...d })) : match.guestPlayers.map(d => ({ ...d }));
        setPlayers(players)
    }

    async function onSave(match: Match) {

        let requestLineUp: RequestLineup = {
            doubles: doubles.map<RequestDouble>(d => ({ id: d.id, player1: d.player1.trim(), player2: d.player2.trim() })),
            players: players.map<RequestPlayer>(p => ({ id: p.id, name: p.name.trim() }))
        };
        setLoading(true);
        let response = await putLineup(match.id, editorCode, requestLineUp);
        if (response.data != null) {
            setExpanded(false);
        } else {
            setErrorMsg(t("LineupSetting.player"));
        }
        setLoading(false);
    }
}

export default LineupSetting;