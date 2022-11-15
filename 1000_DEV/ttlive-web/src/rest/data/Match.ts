import { match } from "assert";
import { Dayjs } from "dayjs";
import { Doubles } from "./Doubles";
import { Game } from "./Game";
import { GameStyle } from "./GameStyle";
import { League } from "./League";
import { Player } from "./Player";
import { Team } from "./Team";

export interface RequestMatch {
    regionId: number;
    contest : "WOMEN" | "MEN";
    gameStyleId: number;
    league: League;
    homeTeam: Team;
    guestTeam: Team;
    startDate: string;
}

export interface Match {
    id: number;
    title: string;
    description: string;
    homeTeamScore: number;
    guestTeamScore: number;
    code: string;
    editorCode: string;
    state: "NOT_STARTED" | "LIVE" | "FINISHED";
    
    startDate: string;
    createdAt: string;

    league: League;
    homeTeam: Team;
    guestTeam: Team;
    gameStyle: GameStyle;
    games: Array<Game>;
    homePlayers: Array<Player>;
    guestPlayers: Array<Player>;
    homeDoubles: Array<Doubles>;
    guestDoubles: Array<Doubles>;
}

export function sortMatch(match: Match){
    match.games = match.games.sort((a, b) => a.gameNumber - b.gameNumber);
    match.games.forEach(g => g.sets.sort((a, b) => a.number - b.number));
    match.homePlayers.sort((a, b) => a.position - b.position);
    match.guestPlayers.sort((a, b) => a.position - b.position);
    match.homeDoubles.sort((a, b) => a.position - b.position);
    match.guestDoubles.sort((a, b) => a.position - b.position);
    return match;
}