import { Doubles } from "./Doubles";
import { Player } from "./Player";

export interface Game {
    id: number;
    gameNumber: number;
    doubles: boolean;
    set1: string | null;
    set2: string | null;
    set3: string | null;
    set4: string | null;
    set5: string | null;
    homeSets: number;
    guestSets: number;
    state: "NOT_STARTED" | "LIVE" | "FINISHED"
    modifiedAt: string;

    homePlayer: Player;
    guestPlayer: Player;
    homeDoubles: Doubles;
    guestDoubles: Doubles;
}
