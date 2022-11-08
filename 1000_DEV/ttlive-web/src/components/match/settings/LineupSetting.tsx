import { Collapse, Divider, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Doubles } from "../../../rest/data/Doubles";
import { Match } from "../../../rest/data/Match";
import { Player } from "../../../rest/data/Player";
import ExpandButton from "../../utils/ExpandButton";
import { spacingNormal } from "../../utils/StyleVars";

export interface LineupSettingProps {
    match: Match,
    isHomeTeam: boolean
}

const LineupSetting = ({ match, isHomeTeam }: LineupSettingProps) => {

    const [doubles, setDoubles] = useState<Array<Doubles>>([]);
    const [players, setPlayers] = useState<Array<Player>>([]);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {

        let doubles = isHomeTeam ? match.homeDoubles.map(d => ({ ...d })) : match.guestDoubles.map(d => ({ ...d }));
        let players = isHomeTeam ? match.homePlayers.map(d => ({ ...d })) : match.guestPlayers.map(d => ({ ...d }));

        setDoubles(doubles);
        setPlayers(players);

    }, [match.homePlayers, match.guestPlayers, match.homeDoubles, match.guestDoubles]);

    const [t] = useTranslation();
    return (
        <Paper elevation={1} >
            <Typography variant="h5" p={2}>
                {isHomeTeam ? t('LineupSetting.homeTeam') : t('LineupSetting.guestTeam')}
            </Typography>

            <Collapse in={expanded} timeout="auto" >
                <Divider />
                <Stack direction="column" sx={{ gap: 2, p: 2 }}>

                    <Typography variant="h6">{t("LineupSetting.singles")}:</Typography>
                    {players.map((player, index) => (

                        <TextField key={player.position} sx={{ minWidth: "100px" }}
                            label={t("LineupSetting.player") + " " + player.position}
                            variant="outlined"
                            defaultValue={player.name}
                            value={player.name}
                            onChange={e => updatePlayer(index, e.target.value)}
                        />
                    ))}

                    <Typography variant="h6" mt={2}>{t("LineupSetting.doubles")}:</Typography>
                    {doubles.map((double, index) => (
                        <Stack key={double.position} direction="row" sx={{ gap: spacingNormal }}>
                            <TextField label={t('LineupSetting.double') + " " + double.position + " - " + t('LineupSetting.player') + " 1"}
                                variant="outlined"
                                value={double.player1}
                                defaultValue={double.player1}
                                onChange={e => updateDoubles(index, e.target.value, double.player2)} />
                            <TextField label={t('LineupSetting.double') + " " + double.position + " - " + t('LineupSetting.player') + " 2"}
                                variant="outlined"
                                value={double.player1}
                                defaultValue={double.player1}
                                onChange={e => updateDoubles(index, e.target.value, double.player2)}
                            />
                        </Stack>
                    ))}

                </Stack>

            </Collapse>

            <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center" }} onClick={() => setExpanded(!expanded)}>
                <ExpandButton expanded={expanded} />
            </Box>
        </Paper >
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

}

export default LineupSetting;