export interface Game {
    id: number;
    gameNumber: number;
    homePlayerNumber: number;
    guestPlayerNumber: number;
    homePlayer: string;
    guestPlayer: string;
    isDouble: boolean;
    set1: string;
    set2: string;
    set3: string;
    set4: string;
    set5: string;
    modifiedAt: Date;    
}