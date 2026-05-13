/**
 * Postgres connection — configure via standard PG* env vars or DB_* aliases.
 * Example: PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT
 *
 * `node-pg` SCRAM auth requires `password` to be a string (not a number / undefined).
 */
function str(v, fallback = "") {
  if (v == null || v === "") return fallback;
  return String(v);
}

function pickPassword() {
  const pgPass = process.env.PGPASSWORD;
  const dbPass = process.env.DB_PASSWORD;
  if (pgPass != null && pgPass !== "") return String(pgPass);
  if (dbPass != null && dbPass !== "") return String(dbPass);
  return "";
}

module.exports = {
  user: str(process.env.PGUSER || process.env.DB_USER, "postgres"),
  host: str(process.env.PGHOST || process.env.DB_HOST, "localhost"),
  database: str(process.env.PGDATABASE || process.env.DB_NAME, "achaa"),
  password: pickPassword(),
  port: parseInt(String(process.env.PGPORT || process.env.DB_PORT || "5432"), 10) || 5432,
};
