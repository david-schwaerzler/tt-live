CREATE TABLE action_log (
	id BIGSERIAL PRIMARY KEY,
	state VARCHAR(512) NOT NULL,
	caption VARCHAR(512) NOT NULL,
	message VARCHAR(4096) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE settings (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(512) NOT NULL,
	value VARCHAR(512) NOT NULL
);

INSERT INTO settings(name, value) VALUES ('dataDir', '/home/home-pc/finanz_data/');

CREATE TABLE stock (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(512) NOT NULL,
	symbol VARCHAR(512) NOT NULL UNIQUE,
	category VARCHAR(512) NOT NULL
);

CREATE TABLE raw_data (
	id BIGSERIAL PRIMARY KEY,
	stock_id BIGINT REFERENCES stock(id),
	date DATE NOT NULL,
	open FLOAT NOT NULL,
	high FLOAT NOT NULL,
	low FLOAT NOT NULL,
	close FLOAT NOT NULL,
	adj_close FLOAT NOT NULL,
	volume BIGINT NOT NULL,
	UNIQUE(stock_id, date)
);

CREATE TABLE normalized_data (
	id BIGSERIAL PRIMARY KEY,
	stock_id BIGINT REFERENCES stock(id),
	time_slot BIGINT NOT NULL,
	date DATE NOT NULL,
	open FLOAT NOT NULL,
	high FLOAT NOT NULL,
	low FLOAT NOT NULL,
	close FLOAT NOT NULL,
	adj_close FLOAT NOT NULL,
	volume BIGINT NOT NULL,
	valid BOOL NOT NULL,
	UNIQUE(stock_id, date)
);

CREATE TABLE preprocessor(
 	id BIGSERIAL PRIMARY KEY,
 	type VARCHAR(512) NOT NULL,
 	config VARCHAR(4096) NOT NULL 	
);

CREATE TABLE selector(
	id BIGSERIAL PRIMARY KEY,
	type VARCHAR(512) NOT NULL,
 	config VARCHAR(4096) NOT NULL
);

create table strategy (
	id BIGSERIAL primary key not null,
	name VARCHAR(512) NOT NULL,
	type VARCHAR(512) NOT NULL,
	lookahead_slots INT not null,
	num_stocks INT not null,
	input_slots INT not null,
	config VARCHAR(512),
	preprocessor_id BIGINT not null references preprocessor(id),   
	selector_id BIGINT not null references selector(id)	
);

CREATE TABLE training_conf (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	category VARCHAR(265) NOT NULL,	
	eval_every INT NOT NULL,
	eval_dataset_size INT NOT NULL,	
	training_data_start DATE NOT NULL,
	training_data_end DATE NOT NULL,
	test_data_start DATE NOT NULL,
	test_data_end DATE NOT NULL,		
	batch_size INT NOT NULL,
	dataset_size INT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE network (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(512) UNIQUE,	
	layer VARCHAR(512) NOT NULL,
	learn_rate double precision NOT NULL,
	total_epochs INT NOT NULL,
	current_epoch INT,
	description VARCHAR(2048) NOT NULL,
	file VARCHAR(4096),
	score_file VARCHAR(512),
	learn_duration BIGINT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	
	strategy_id BIGINT REFERENCES strategy(id),
	training_id BIGINT REFERENCES training_conf(id)
);


CREATE TABLE deployment (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	network_id BIGINT REFERENCES network(id),
	name VARCHAR(512) NOT NULL,
	status VARCHAR(512) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
