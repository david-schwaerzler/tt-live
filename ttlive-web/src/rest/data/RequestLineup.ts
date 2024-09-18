import { RequestDouble } from "./Doubles";
import { RequestPlayer } from "./Player";

export interface RequestLineup {
    players: Array<RequestPlayer>;
    doubles: Array<RequestDouble>;
}