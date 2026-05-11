-- Run once against the same database as in secrets/databaseConfiguration.js (PG* / DB_* env).
-- Example:
--   export PGHOST=127.0.0.1 PGPORT=5432 PGUSER=postgres PGDATABASE=achaa PGPASSWORD=secret
--   psql -f migrations/001_accounts.sql

CREATE TABLE IF NOT EXISTS accounts (
  id SERIAL PRIMARY KEY,
  role_id INTEGER NOT NULL DEFAULT 1,
  user_code INTEGER,
  membership INTEGER,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  phone_number VARCHAR(32),
  email VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  image TEXT,
  expired_date TIMESTAMPTZ,
  confirm BOOLEAN
);

CREATE UNIQUE INDEX IF NOT EXISTS accounts_email_unique ON accounts (email);
CREATE INDEX IF NOT EXISTS accounts_user_code_idx ON accounts (user_code);
