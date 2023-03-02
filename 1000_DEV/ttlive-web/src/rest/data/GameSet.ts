import { MatchState } from "./Match";

export interface GameSet {
    number: number;
    state: MatchState;
    homeScore: number;
    guestScore: number;
}