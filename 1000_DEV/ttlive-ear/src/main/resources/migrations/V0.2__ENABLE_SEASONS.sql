alter table LEAGUE add column is_active boolean not null default true;
alter table LEAGUE add column season varchar(32) default null;
