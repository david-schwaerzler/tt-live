export interface League {
    id : number,
    name: string,
    contest: "MEN" | "WOMEN"
    region : string;
    active: boolean;
    season: string;
}

export interface RequestLeague {
    id: number;
    name: string;
    contest: "MEN" | "WOMEN";
    regionId: number;
}