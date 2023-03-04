import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { Game } from "../../../../rest/data/Game";
import { Match } from "../../../../rest/data/Match";
import MatchScore from "../../../common/components/match/MatchScore";
import { spacingNormal } from "../../../common/utils/StyleVars";
import GameLiveScore from "../game_report/edit/GameLiveScore";

const LiveTab = ({ match, games }: { match: Match | null, games: Array<Game> }) => {

    const [t] = useTranslation();
    return (
        <Stack direction="column" gap={spacingNormal}>
            {match == null ? <Skeleton sx={{ height: { xs: "212px", sm: "200px" } }} variant="rectangular" />
                : <React.Fragment><Card>
                    <CardContent>
                        <MatchScore
                            homeClub={match.homeTeam.club}
                            guestClub={match.guestTeam.club}
                            homeNumber={match.homeTeam.number}
                            guestNumber={match.guestTeam.number}
                            homeTeamScore={match.homeTeamScore}
                            guestTeamScore={match.guestTeamScore}
                        />
                    </CardContent>
                </Card>

                    {match.state === "NOT_STARTED" && renderNotStarted(match)}
                </React.Fragment>
            }

            {games.filter(game => game.state === "LIVE").map(game =>
                <GameLiveScore key={game.id} game={game} />
            )}
            {games.filter(game => game.state === "FINISHED").map(game =>
                <GameLiveScore key={game.id} game={game} />
            )}
        </Stack>
    );

    function renderNotStarted(match: Match) {

        let matchDate = new Date(match.startDate);
        let today = new Date();


        let startDate: string | null = null;
        if (today.toDateString !== matchDate.toDateString) {
            startDate = matchDate.toLocaleDateString();
        }

        let startTime = matchDate.toLocaleTimeString();

        return (
            <Card>
                <CardContent>
                    <Stack sx={{ textAlign: "center", gap: 2 }}>
                        <Typography variant="h3">{t("LiveView.notStartedText")}</Typography>

                        {startDate && <Typography variant="h2">{startDate}</Typography>}
                        {startTime && <Typography variant="h2" color="primary" fontWeight="bold">{startTime}</Typography>}
                    </Stack>
                </CardContent>
            </Card>
        );
    }
};

export default React.memo(LiveTab);