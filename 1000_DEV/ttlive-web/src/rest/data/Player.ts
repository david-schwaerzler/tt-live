export interface Player {
    id: number;
    name: string;
    position : number;
	homeTeam : boolean;	
}

export interface RequestPlayer {
    id: number;
    name: string;
}