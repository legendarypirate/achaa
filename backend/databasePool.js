const { Pool } = require("pg");
const dbConfig = require("./secrets/databaseConfiguration");

// node-pg ConnectionParameters does `password: config.password || env || defaults`.
// An empty string is falsy, so it becomes `defaults.password` (null), which breaks
// SCRAM-SHA-256: "client password must be a string".
if (dbConfig.password === "") {
  console.error(
    "[database] PostgreSQL password is missing or empty.\n" +
      "Set one of these in backend/.env (for the same DB user as PGUSER / DB_USER):\n" +
      "  PGPASSWORD=your_postgres_password\n" +
      "  DB_PASSWORD=your_postgres_password\n" +
      "\n" +
      "If the server uses trust/peer and ignores passwords, set any non-empty value, e.g. PGPASSWORD=x.\n" +
      "(node-pg drops an empty string and SCRAM then fails with \"client password must be a string\".)"
  );
  process.exit(1);
}

const pool = new Pool(dbConfig);

module.exports = pool;
