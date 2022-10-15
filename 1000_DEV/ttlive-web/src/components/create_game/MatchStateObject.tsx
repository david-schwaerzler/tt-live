import { GameStyle } from "../../rest/GameStyle";
import { League } from "../../rest/League";
import { Region } from "../../rest/Region";
import { Team } from "../../rest/Team";
import { MatchPosition } from "./TeamPosition";

export interface MatchStateObject {
    region: Region | null;
    contest: "WOMEN" | "MEN" | null;
    league: League | null;
    gameStyle: GameStyle | null;  
    homeClub: string | null; // tmp variable used when the club is selected but not the team nr
    guestClub: string | null; // tmp variable used when the club is selected but not the team nr
    homeTeam: Team | null; 
    guestTeam: Team | null;  
    homePositions: Array<MatchPosition> | null;
    guestPositions: Array<MatchPosition> | null;
}