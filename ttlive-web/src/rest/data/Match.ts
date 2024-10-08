import { Doubles } from "./Doubles";
import { Game, SimpleGame } from "./Game";
import { GameStyle } from "./GameStyle";
import { League, RequestLeague } from "./League";
import { Player } from "./Player";
import { RequestTeam, Team } from "./Team";

export type MatchState = "NOT_STARTED" | "LIVE" | "FINISHED";
export function isMatchState(str: string) : str is MatchState {
    return str === "NOT_STARTED" ||  str === "LIVE" || str === "FINISHED";
}

export type MatchVisibility = "PUBLIC" | "PRIVATE";
export function isMatchVisibility(str : string) : str is MatchVisibility {
    return str === "PUBLIC" || str === "PRIVATE";
}

export interface RequestMatch {    
    gameStyleId: number;
    league: RequestLeague;
    homeTeam: RequestTeam;
    guestTeam: RequestTeam;
    startDate: string;
    endDate: string | null;
    visibility: MatchVisibility;
}

export interface Match {
    id: number;
    title: string;
    description: string;
    homeTeamScore: number;
    guestTeamScore: number;
    code: string;
    editorCode: string;
    state: MatchState;
    visibility: MatchVisibility;
    
    accountUsername: string | null,
    accountId : number | null,

    startDate: string;
    endDate: string | null;
    createdAt: string;

    league: League;
    homeTeam: Team;
    guestTeam: Team;
    gameStyle: GameStyle;
    games: Array<Game>;
    homePlayers: Array<Player>;
    guestPlayers: Array<Player>;
    homeDoubles: Array<Doubles>;
    guestDoubles: Array<Doubles>;
}

export interface SimpleMatch {
    id: number;
    homeTeamScore : number;
	guestTeamScore : number;
	state : MatchState;
	startDate : string;
	
	league : League;
    homeClub : string;
	homeNumber : number;
	guestClub : string;
	guestNumber : number;	

    simpleGames: Array<SimpleGame> | null;    
}

export function sortMatch(match: Match){
    match.games.sort((a, b) => a.gameNumber - b.gameNumber);
    match.games.forEach(g => g.sets.sort((a, b) => a.number - b.number));
    match.homePlayers.sort((a, b) => a.position - b.position);
    match.guestPlayers.sort((a, b) => a.position - b.position);
    match.homeDoubles.sort((a, b) => a.position - b.position);
    match.guestDoubles.sort((a, b) => a.position - b.position);
    return match;
}

export function sortSimpleMatch(match: SimpleMatch){
    if(match.simpleGames != null)
        match.simpleGames.sort((a, b) => a.gameNumber - b.gameNumber);
    return match;
}
