CREATE TABLE action_log (
	id BIGSERIAL PRIMARY KEY,
	state VARCHAR(512) NOT NULL,
	caption VARCHAR(512) NOT NULL,
	message VARCHAR(4096) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE league (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(512) NOT NULL, 
	region VARCHAR(512),
	link VARCHAR(1024),
	contest VARCHAR(512),
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now(),
	
	CONSTRAINT name_unique UNIQUE (name, region, contest)
);

CREATE TABLE team (
	id BIGSERIAL PRIMARY KEY,
	full_name VARCHAR(512) NOT NULL,
	number INTEGER,
	club VARCHAR(512),
	link VARCHAR(1024),
	
	victories INTEGER NOT NULL DEFAULT 0,
	losses INTEGER NOT NULL DEFAULT 0,
	ties INTEGER NOT NULL DEFAULT 0,
	retreated BOOLEAN NOT NULL DEFAULT false,
	
	is_clicktt BOOLEAN NOT NULL DEFAULT false,
	last_fetched TIMESTAMP,
	
	league_id BIGINT REFERENCES league(id) NOT NULL,	
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE match (
	id BIGSERIAl PRIMARY KEY,
	home_team_id BIGINT REFERENCES team(id) NOT NULL,
	guest_team_id BIGINT REFERENCES team(id) NOT NULL,	
	home_team_score INTEGER,
	guest_team_score INTEGER,
	finished BOOLEAN DEFAULT false,
	date TIMESTAMP,
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now(),
	
	CONSTRAINT guest_home_team UNIQUE (home_team_id, guest_team_id)
);



CREATE TABLE account (
	id BIGSERIAl PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(64) NOT NULL,
	email VARCHAR(512) NOT NULL
	isAuthenticated NOT NULL,
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);


CREATE TABLE live_team (
	id BIGSERIAl PRIMARY KEY,
	club VARCHAR(512),
	number INTEGER
	league VARCHAR(512),
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE game_style (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	description VARCHAR(1024) NOT NULL,
	game_order VARCHAR(1024)
);


CREATE TABLE live_match (
	id BIGSERIAl PRIMARY KEY,
	league VARCHAR(512),
	contest VARCHAR(32),	
	
	title VARCHAR(512) NOT NULL,
	description VARCHAR(1024),
	
	home_team_score INTEGER NOT NULL DEFAULT 0,
	guest_team_score INTEGER NOT NULL DEFAULT 0,
	home_players VARCHAR(1024),
	guest_players VARCHAR(1024),
	
	home_team_id BIGINT NOT NULL REFERENCES live_team(id),
	guest_team_id BIGINT NOT NULL REFERENCES live_team(id),
	created_by BIGINT REFERENCES account(id),
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
	
);

CREATE TABLE live_player (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(512),	
	is_clicktt BOOLEAN NOT NULL,
	last_fetched TIMESTAMP,
	
	team_id BIGINT REFERENCES league(id),	
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()
);

