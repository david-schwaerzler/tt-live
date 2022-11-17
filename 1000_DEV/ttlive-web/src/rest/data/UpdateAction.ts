import { ChatMessage } from "./ChatMessage";
import { Game } from "./Game";
import { Match } from "./Match";

export interface UpdateAction {
    action : "MATCH" | "GAME" | "CHAT";
    game: Game | null;
    match: Match | null;
    chat: ChatMessage | null;
}