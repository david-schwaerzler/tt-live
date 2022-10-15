import { GameStyle } from "../../rest/GameStyle";
import { League } from "../../rest/League";
import { Region } from "../../rest/Region";

export interface MatchStateObject {
    region: Region | null;
    contest: "WOMEN" | "MEN" | null;
    league: League | null;
    gameStyle: GameStyle | null;
}