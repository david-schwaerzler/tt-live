alter table league add column is_active boolean not null default true;
alter table league add column season varchar(32) default null;
alter table contact add column created_at TIMESTAMP NOT NULL DEFAULT now();