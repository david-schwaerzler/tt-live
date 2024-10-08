import { Match } from "./Match";

export interface Account {
	id: number;
	username: string;
	password: string;
	role: string;
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

export interface RequestLogin {
	username: string;
	password: string;
}

export interface LoginResponse {
	status: "USERNAME_INVALID" | "PASSWORD_INVALID" | "NOT_AUTHENTICATED" | "SUCCESS";
	account: Account;
	token: string | null;
	tokenValidity: number;
	refreshToken: string;
	refreshTokenValidity: number;
}

export interface RequestRefreshToken {
	refreshToken: string;
}