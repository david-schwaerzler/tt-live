import { Button, Card, CardActions, CardContent, Collapse, Divider, FormControl, Paper, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { putLineup } from "../../../rest/api/MatchApi";
import { Doubles, RequestDouble } from "../../../rest/data/Doubles";
import { Match } from "../../../rest/data/Match";
import { Player, RequestPlayer } from "../../../rest/data/Player";
import { RequestLineup } from "../../../rest/data/RequestLineup";
import ErrorMessage from "../../utils/ErrorMessage";
import ExpandButton from "../../utils/ExpandButton";
import LoadingButton from "../../utils/LoadingButton";

export interface LineupSettingProps {
    match: Match | null,
    editorCode: string,
    isHomeTeam: boolean
    onMatchChanged: (updated: Match) => void;
}

const LineupSetting = ({ match, isHomeTeam, editorCode, onMatchChanged }: LineupSettingProps) => {

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
        let doubles = isHomeTeam ? match.homeDoubles.map(d => ({ ...d })) : match.guestDoubles.map(d => ({ ...d }));
        let players = isHomeTeam ? match.homePlayers.map(d => ({ ...d })) : match.guestPlayers.map(d => ({ ...d }));

        setDoubles(doubles);
        setPlayers(players);

    }, [match, isHomeTeam]);

    if (match == null)
        return <Skeleton sx={{ height: { xs: "88px", sm: "88px" } }} variant="rectangular" />

    return (
        <Card >
            <CardContent>
                <Typography variant="h5">
                    {isHomeTeam ? t('LineupSetting.homeTeam') : t('LineupSetting.guestTeam')}
                </Typography>

                <Collapse in={expanded} timeout="auto" >
                    <Divider />
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
                                    <TextField
                                        label={t('LineupSetting.double') + " " + double.position + " - " + t('LineupSetting.player') + " 1"}
                                        variant="outlined"
                                        value={double.player1}
                                        onChange={e => updateDoubles(index, e.target.value, double.player2)} />
                                </FormControl>
                                <FormControl>
                                    <TextField label={t('LineupSetting.double') + " " + double.position + " - " + t('LineupSetting.player') + " 2"}
                                        variant="outlined"
                                        value={double.player2}
                                        onChange={e => updateDoubles(index, double.player1, e.target.value)}
                                    />
                                </FormControl>
                            </Stack>
                        ))}

                        <LoadingButton loading={loading} variant="outlined" onClick={() => onSave(match)}>Save</LoadingButton>
                    </Stack>


                </Collapse>
            </CardContent>
            <CardActions>
                <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center", width: "100%" }} onClick={() => setExpanded(!expanded)}>
                    <ExpandButton expanded={expanded} />
                </Box>
            </CardActions>
        </Card >
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
            doubles: doubles.map<RequestDouble>(d => ({ id: d.id, player1: d.player1, player2: d.player2 })),
            players: players.map<RequestPlayer>(p => ({ id: p.id, name: p.name }))
        };
        setLoading(true);
        let response = await putLineup(match.id, editorCode, requestLineUp);
        if (response.data != null) {
            onMatchChanged(response.data)
            setExpanded(false);
        } else {
            setErrorMsg(t("LineupSetting.player"));
        }
        setLoading(false);
    }
}

export default LineupSetting;