export interface Doubles {
    id: number;
    position: number;
    homeTeam: boolean;
    player1: string;
    player2: string;
    state: "NOT_STARTED" | "LIVE" | "FINISHED";
}