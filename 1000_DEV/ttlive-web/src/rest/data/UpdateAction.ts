import { Game } from "./Game";
import { Match } from "./Match";

export interface UpdateAction {
    action : "MATCH" | "GAME";
    game: Game | null;
    match: Match | null;
}