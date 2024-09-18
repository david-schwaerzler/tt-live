export type AccountFilterType = "CLUB" | "LEAGUE" | "MATCH_STATE" | "REGION" | "CONTEST";

export function isAccountFilterType (type: string): type is AccountFilterType {
    return ["CLUB", "LEAGUE", "MATCH_STATE", "REGION", "CONTEST"].includes(type);
  }

export interface AccountFilter {
    id : number,
    type: AccountFilterType;
    value: string;
}

export interface RequestAccountFilter {
    type: AccountFilterType;
    value: string;
}