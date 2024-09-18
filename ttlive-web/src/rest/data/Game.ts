import { Doubles } from "./Doubles";
import { GameSet } from "./GameSet";
import { MatchState } from "./Match";
import { Player } from "./Player";

export interface Game {
    id: number;
    gameNumber: number;
    doubles: boolean;
    sets: Array<GameSet>;
    homeSets: number;
    guestSets: number;
    state: MatchState;
    modifiedAt: string;

    homePlayer: Player;
    guestPlayer: Player;
    homeDoubles: Doubles;
    guestDoubles: Doubles;
}

export interface SimpleGame {
    gameNumber: number;
    homeSets: number;
    guestSets: number;
    doubles: boolean;
    homePlayer1: string;
    homePlayer2?: string;
    guestPlayer1: string;
    guestPlayer2?: string;
    state: MatchState;
}