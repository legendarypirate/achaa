/**
 * Postgres connection — configure via standard PG* env vars or DB_* aliases.
 * Example: PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT
 */
module.exports = {
  user: process.env.PGUSER || process.env.DB_USER || "postgres",
  host: process.env.PGHOST || process.env.DB_HOST || "localhost",
  database: process.env.PGDATABASE || process.env.DB_NAME || "achaa",
  password:
    process.env.PGPASSWORD !== undefined
      ? process.env.PGPASSWORD
      : process.env.DB_PASSWORD || "",
  port: Number(process.env.PGPORT || process.env.DB_PORT || 5432, 10),
};
