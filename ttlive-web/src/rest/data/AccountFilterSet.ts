import { AccountFilter } from "./AccountFilter";

export interface AccountFilterSet {
    id : number;
    name: string;
    active : boolean;
    default: boolean;
    filters: Array<AccountFilter>;
}

export interface RequestAccountFilterSet {
    name: string;
    active: boolean;
    default: boolean;
}