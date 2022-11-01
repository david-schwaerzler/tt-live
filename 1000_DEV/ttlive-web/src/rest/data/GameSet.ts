export interface GameSet {
    number: number;
    state: "NOT_STARTED" | "LIVE" | "FINISHED";
    homeScore: number;
    guestScore: number;
}