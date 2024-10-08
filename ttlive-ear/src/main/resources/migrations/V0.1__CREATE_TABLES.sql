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
	role VARCHAR(64) NOT NULL,
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

CREATE TABLE game_style (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(64) NOT NULL,
	description VARCHAR(1024) NOT NULL,
	num_players INTEGER NOT NULL,
	num_doubles INTEGER NOT NULL,
	game_order VARCHAR(1024) NOT NULL,
	games_to_finish INTEGER NOT NULL,
	finish_early BOOLEAN NOT NULL
);

CREATE TABLE match (
	id BIGSERIAl PRIMARY KEY,
	
	title VARCHAR(512) NOT NULL,
	description VARCHAR(1024),	
	home_team_score INTEGER NOT NULL DEFAULT 0,
	guest_team_score INTEGER NOT NULL DEFAULT 0,	
	
	editorCode VARCHAR(16) NOT NULL,
	code VARCHAR(16) NOT NULL,
	state VARCHAR(32) NOT NULL DEFAULT 'NOT_STARTED',
	visibility VARCHAR(256) NOT NULL,
	start_date TIMESTAMP NOT NULL,
	end_date TIMESTAMP,
	
	league_id BIGINT NOT NULL REFERENCES league(id),		
	home_team_id BIGINT NOT NULL REFERENCES team(id),
	guest_team_id BIGINT NOT NULL REFERENCES team(id),	
	game_style_id BIGINT NOT NULL REFERENCES game_style(id),
	account_id BIGINT REFERENCES account(id),	
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()	
);

CREATE TABLE doubles (
	id BIGSERIAl PRIMARY KEY,
	position INTEGER NOT NULL,	
	is_home_team BOOLEAN NOT NULL,	
	player_1 VARCHAR(128) NOT NULL,
	player_2 VARCHAR(128) NOT NULL,
	match_id BIGINT NOT NULL REFERENCES match(id)
);

CREATE TABLE player (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(512) NOT NULL,	
	position INTEGER NOT NULL,
	is_home_team BOOLEAN NOT NULL,
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now(),
	
	match_id BIGINT NOT NULL REFERENCES match(id)	
);

CREATE TABLE game (
	id BIGSERIAl PRIMARY KEY,
	
	state VARCHAR(32) NOT NULL DEFAULT 'NOT_STARTED',
	
	game_number INTEGER NOT NULL,
	is_doubles BOOLEAN NOT NULL DEFAULT false,
	set1 VARCHAR(32),
	set2 VARCHAR(32),
	set3 VARCHAR(32),
	set4 VARCHAR(32),
	set5 VARCHAR(32),
	
	home_sets INTEGER NOT NULL DEFAULT 0,
	guest_sets INTEGER NOT NULL DEFAULT 0,
	
	match_id BIGINT NOT NULL REFERENCES match(id),
	home_player_id BIGINT REFERENCES player(id),
	guest_player_id BIGINT REFERENCES player(id),
	
	home_doubles_id BIGINT REFERENCES doubles(id),
	guest_doubles_id BIGINT REFERENCES doubles(id),
	
	created_at TIMESTAMP NOT NULL DEFAULT now(),
	modified_at TIMESTAMP NOT NULL DEFAULT now()	
);

CREATE TABLE chat_message (
	id BIGSERIAl PRIMARY KEY,
	text VARCHAR(256) NOT NULL,
	username VARCHAR(64),
	is_editor BOOLEAN NOT NULL DEFAULT false,
	account_id BIGINT REFERENCES account(id),
	match_id BIGINT NOT NULL REFERENCES match(id),
	created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE contact (
	 id BIGSERIAL PRIMARY KEY,
	 text VARCHAR(4096),
	 recipient VARCHAR(256)
);

CREATE TABLE account_filter_set (
	id BIGSERIAl PRIMARY KEY,
	name VARCHAR(256) NOT NULL,
	is_active BOOLEAN NOT NULL DEFAULT false,
	is_default BOOLEAN NOT NULL DEFAULT false,
	account_id BIGINT NOT NULL REFERENCES account(id)
);

CREATE TABLE account_filter (
	id BIGSERIAl PRIMARY KEY,
	type VARCHAR(64) NOT NULL,
	value VARCHAR(256) NOT NULL,
	set_id BIGINT NOT NULL REFERENCES account_filter_set(id)
);