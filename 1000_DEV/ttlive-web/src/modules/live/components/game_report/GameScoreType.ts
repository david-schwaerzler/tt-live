import { Game } from "../../../../rest/data/Game";

export type GameType = "DOUBLES" | "SINGLES" | "FINISH_DOUBLES";
export type GameScoreType = Game & { homeTeamScore: number, guestTeamScore: number};