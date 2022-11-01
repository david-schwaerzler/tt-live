import { Doubles } from "./Doubles";
import { GameSet } from "./GameSet";
import { Player } from "./Player";

export interface Game {
    id: number;
    gameNumber: number;
    doubles: boolean;
    sets: Array<GameSet>;
    homeSets: number;
    guestSets: number;
    state: "NOT_STARTED" | "LIVE" | "FINISHED"
    modifiedAt: string;

    homePlayer: Player;
    guestPlayer: Player;
    homeDoubles: Doubles;
    guestDoubles: Doubles;
}
