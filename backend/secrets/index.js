/**
 * JWT signing secret — set in production via environment (never commit real values elsewhere).
 * PM2: `env: { APP_SECRET: "..." }` or use a systemd / shell export.
 */
const APP_SECRET = process.env.APP_SECRET || process.env.JWT_SECRET;

if (!APP_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing APP_SECRET or JWT_SECRET. Set one of these environment variables before starting the backend."
    );
  }
  // Local dev only; replace with env vars for anything beyond localhost.
  module.exports = { APP_SECRET: "dev-insecure-secret-change-me" };
} else {
  module.exports = { APP_SECRET };
}
