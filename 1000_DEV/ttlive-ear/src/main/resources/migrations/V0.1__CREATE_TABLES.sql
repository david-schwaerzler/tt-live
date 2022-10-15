CREATE TABLE action_log (
	id BIGSERIAL PRIMARY KEY,
	state VARCHAR(512) NOT NULL,
	caption VARCHAR(512) NOT NULL,
	message VARCHAR(4096) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE account (
	id BIGSERIAl PRIMARY KEY,
	username VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL,
	email VARCHAR(512) NOT NULL,
	isAuthenticated BOOLEAN NOT NULL,
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE region (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(64),
	description VARCHAR(1024)
);
CREATE TABLE league (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(64),
	contest VARCHAR(64),
	region_id BIGINT NOT NULL REFERENCES region(id),	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE team (
	id BIGSERIAl PRIMARY KEY,
	club VARCHAR(512) NOT NULL,
	number INTEGER NOT NULL,
	league_id BIGINT NOT NULL REFERENCES league(id),
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE player (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(512) UNIQUE NOT NULL,	
	
	team_id BIGINT NOT NULL REFERENCES league(id),	
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE game_style (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	description VARCHAR(1024) NOT NULL,
	num_players INTEGER NOT NULL,
	num_doubles INTEGER NOT NULL,
	game_order VARCHAR(1024) NOT NULL
);

CREATE TABLE match (
	id BIGSERIAl PRIMARY KEY,
	
	title VARCHAR(512) NOT NULL,
	description VARCHAR(1024),	
	home_team_score INTEGER NOT NULL DEFAULT 0,
	guest_team_score INTEGER NOT NULL DEFAULT 0,	
	home_players VARCHAR(1024) NOT NULL,
	guest_players VARCHAR(1024) NOT NULL,
	
	league_id BIGINT NOT NULL REFERENCES league(id),		
	home_team_id BIGINT NOT NULL REFERENCES team(id),
	guest_team_id BIGINT NOT NULL REFERENCES team(id),	
	game_style_id BIGINT NOT NULL REFERENCES game_style(id),
	account_id BIGINT REFERENCES account(id),
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()	
);

CREATE TABLE game (
	id BIGSERIAl PRIMARY KEY,
	
	game_number INTEGER NOT NULL,
	home_player_number INTEGER NOT NULL,
	guest_player_number INTEGER NOT NULL,
	home_player VARCHAR(128) NOT NULL,
	guest_player VARCHAR(128) NOT NULL,
	is_double BOOLEAN NOT NULL DEFAULT false,
	set1 VARCHAR(32),
	set2 VARCHAR(32),
	set3 VARCHAR(32),
	set4 VARCHAR(32),
	set5 VARCHAR(32),
	
	match_id BIGINT NOT NULL REFERENCES match(id),
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()	
);
