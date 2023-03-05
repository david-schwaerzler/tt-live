import { MatchState } from "../../../rest/data/Match";

export interface MatchFilterOptions {
    regions?: Array<string> ,
    leagues?: Array<string>,
    clubs?: Array<string>,
    contests?: Array<string>,
    states?: Array<MatchState>,
    isCustom?: boolean,
    setId? : number
};