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
}

export interface Match {
    id: number;
    title: string;
    description: string;
    homeTeamScore: number;
    guestTeamScore: number;
    code: string;
    editorCode: string;
    
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