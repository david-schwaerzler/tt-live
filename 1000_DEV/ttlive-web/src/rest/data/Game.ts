import { Doubles } from "./Doubles";
import { Player } from "./Player";

export interface Game {
    id: number;
    gameNumber: number;
    isDouble: boolean;
    set1: string;
    set2: string;
    set3: string;
    set4: string;
    set5: string;
    modifiedAt: string; 

    homePlayer: Player;
    guestPlayer: Player;
    homeDouble: Doubles;
    guesDouble: Doubles;
}