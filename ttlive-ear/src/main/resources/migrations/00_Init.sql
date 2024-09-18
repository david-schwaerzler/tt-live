CREATE DATABASE ttlive;

CREATE ROLE ttlive;

ALTER ROLE ttlive WITH ENCRYPTED PASSWORD 'ttlive';
ALTER ROLE ttlive WITH LOGIN;
ALTER ROLE ttlive SET search_path = 'ttlive';


-- ON DATABASE stock_analyze

CREATE SCHEMA ttlive;
GRANT ALL PRIVILEGES ON SCHEMA ttlive TO ttlive;
