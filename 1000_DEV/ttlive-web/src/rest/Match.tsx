import { GameStyle } from "./GameStyle";
import { League } from "./League";
import { Team } from "./Team";

export interface RequestMatch {
    regionId: number;
    contest : "WOMEN" | "MEN";
    gameStyleId: number;
    league: League;
    homeTeam: Team;
    guestTeam: Team;
}