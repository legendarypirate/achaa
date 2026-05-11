/**
 * Apply a .sql file using the same DB config as the app (PG* / DB_* from .env).
 * Usage (from backend/):
 *   npm run migrate
 *   node scripts/apply-sql.js migrations/000_initial_schema.sql
 */
require("dotenv").config({
  path: require("path").join(__dirname, "../.env"),
});

const fs = require("fs");
const path = require("path");
const pool = require("../databasePool");

const rel = process.argv[2];
if (!rel) {
  console.error("Usage: node scripts/apply-sql.js <path-to.sql>");
  process.exit(1);
}

const file = path.isAbsolute(rel) ? rel : path.join(__dirname, "..", rel);
const sql = fs.readFileSync(file, "utf8");

pool
  .query(sql)
  .then(() => {
    console.log("Applied:", file);
    return pool.end();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    pool.end(() => process.exit(1));
  });
