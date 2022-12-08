export interface League {
    id : number,
    name: string,
    contest: "MEN" | "WOMEN"
    region : string;
}

export interface RequestLeague {
    id: number;
    name: string;
    contest: "MEN" | "WOMEN";
    regionId: number;
}