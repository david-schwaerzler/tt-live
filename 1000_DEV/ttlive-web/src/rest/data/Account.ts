import { Match } from "./Match";

export interface Account {
    id : number;
	username: string;
    password: string;
	email: string;
	isAuthenticated: boolean;
	createdAt: string;
	modifiedAt: string;
	matches: Array<Match>;
}

export interface RequestAccount {
    username: string;
    password: string;
    email: string;
}