/**
 * Insert a staff admin account (role_id = 2) so you can sign in at /admin on the site.
 * Password is hashed the same way as /accounts/login (APP_SECRET + password + APP_SECRET).
 *
 * Usage (from backend/):
 *   node scripts/create-admin.js admin@example.com "YourSecurePassword"
 *
 * Requires: same .env as the API (PG*, APP_SECRET), and `accounts` table from migrations.
 */
require("dotenv").config({
  path: require("path").join(__dirname, "../.env"),
});

const SHA256 = require("crypto-js/sha256");
const pool = require("../databasePool");
const { APP_SECRET } = require("../secrets");

const hash = (password) =>
  SHA256(`${APP_SECRET}${password}${APP_SECRET}`).toString();

async function main() {
  const [, , email, password] = process.argv;
  if (!email || !password) {
    console.error(
      'Usage: node scripts/create-admin.js <email> "<password>"\n' +
        "Example: node scripts/create-admin.js admin@learnify.mn 'MyLongPassword1!'"
    );
    process.exit(1);
  }

  const user_code = Math.floor(100000 + Math.random() * 900000);
  const passwordHash = hash(password);
  const em = email.toLowerCase().trim();

  const { rows } = await pool.query(
    `INSERT INTO accounts (
        role_id,
        user_code,
        membership,
        firstname,
        lastname,
        phone_number,
        email,
        password,
        image
      ) VALUES (2, $1, NULL, $2, $3, NULL, $4, $5, NULL)
      ON CONFLICT (email) DO UPDATE SET
        role_id = 2,
        password = EXCLUDED.password,
        firstname = COALESCE(accounts.firstname, EXCLUDED.firstname),
        lastname = COALESCE(accounts.lastname, EXCLUDED.lastname)
      RETURNING id, email, role_id, user_code`,
    [user_code, "Admin", "User", em, passwordHash]
  );

  const u = rows[0];
  console.log("Admin ready:", { id: u.id, email: u.email, role_id: u.role_id, user_code: u.user_code });
  console.log(
    "Open in a desktop-class browser: https://<your-domain>/admin\n" +
      "(Routes under /admin are not registered when the app thinks the device is mobile.)"
  );
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
