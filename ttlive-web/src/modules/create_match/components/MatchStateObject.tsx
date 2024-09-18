import { Dayjs } from "dayjs";
import { Account } from "../../../rest/data/Account";
import { GameStyle } from "../../../rest/data/GameStyle";
import { League,  } from "../../../rest/data/League";
import { MatchVisibility } from "../../../rest/data/Match";
import { Region } from "../../../rest/data/Region";
import { Team } from "../../../rest/data/Team";

export interface MatchStateObject {
    region: Region | null;
    contest: "WOMEN" | "MEN" | null;
    league: League | null;
    gameStyle: GameStyle | null;  
    homeClub: string | null; // tmp variable used when the club is selected but not the team nr
    guestClub: string | null; // tmp variable used when the club is selected but not the team nr
    homeTeam: Team | null; 
    guestTeam: Team | null;
    startDate: Dayjs | null;  
    visibility: MatchVisibility | null;
}