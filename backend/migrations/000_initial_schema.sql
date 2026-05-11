-- Full initial schema for E-Achaa backend (inferred from app/tables/*.js).
-- Run from backend/ with env loaded (same as the app):
--   npm run migrate
-- Or:
--   node scripts/apply-sql.js migrations/000_initial_schema.sql
--
-- Safe to re-run: uses IF NOT EXISTS for tables/indexes; seeds use ON CONFLICT DO NOTHING.

-- ---------------------------------------------------------------------------
-- accounts
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- news_sort + news
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS news_sort (
  id SERIAL PRIMARY KEY,
  sort VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title TEXT,
  sort_id INTEGER REFERENCES news_sort (id),
  information TEXT,
  image TEXT,
  created_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS news_sort_id_idx ON news (sort_id);

-- ---------------------------------------------------------------------------
-- academy, publicity, intro_banner
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS academy (
  id SERIAL PRIMARY KEY,
  title TEXT,
  sort INTEGER,
  information TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS publicity (
  id SERIAL PRIMARY KEY,
  text TEXT,
  image TEXT
);

CREATE TABLE IF NOT EXISTS intro_banner (
  id SERIAL PRIMARY KEY,
  type VARCHAR(64) NOT NULL,
  file_url TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS intro_banner_type_unique ON intro_banner (type);

-- ---------------------------------------------------------------------------
-- Lookups: partner express types, package statuses
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS partner_express_type (
  id SERIAL PRIMARY KEY,
  express_type VARCHAR(255) NOT NULL
);

INSERT INTO partner_express_type (id, express_type)
VALUES
  (1, 'Тээвэр зуучийн салбар'),
  (2, 'Чингэлэг тээврийн салбар'),
  (3, 'Вагон тээврийн салбар'),
  (4, 'Онлайн дэлгүүрийн салбар'),
  (5, 'Агаарын тээврийн салбар'),
  (6, 'Улс хот хоорондын салбар')
ON CONFLICT (id) DO NOTHING;

SELECT setval(
  pg_get_serial_sequence('partner_express_type', 'id'),
  (SELECT COALESCE(MAX(id), 1) FROM partner_express_type)
);

CREATE TABLE IF NOT EXISTS package_status (
  id SERIAL PRIMARY KEY,
  status VARCHAR(255) NOT NULL
);

INSERT INTO package_status (id, status)
VALUES
  (1, 'Чөлөөт'),
  (2, 'Хүсэлт илгээсэн'),
  (3, 'Боловсруулж байна'),
  (4, 'Зөвшөөрөгдсөн'),
  (5, 'Тээвэрлэгдэж байна'),
  (6, 'Дууссан')
ON CONFLICT (id) DO NOTHING;

SELECT setval(
  pg_get_serial_sequence('package_status', 'id'),
  (SELECT COALESCE(MAX(id), 1) FROM package_status)
);

-- ---------------------------------------------------------------------------
-- partner_sub_info + partner
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS partner_sub_info (
  id SERIAL PRIMARY KEY,
  company_register TEXT,
  address TEXT,
  certificate_date DATE,
  certificate_image TEXT,
  trans_number TEXT,
  trans_image TEXT,
  start_zone TEXT,
  passed_zone TEXT,
  end_zone TEXT,
  online_storage TEXT,
  online_activity TEXT,
  air_pack_type TEXT,
  admin_position TEXT,
  air_trans_company TEXT,
  trans_type TEXT,
  suggest_service TEXT
);

CREATE TABLE IF NOT EXISTS partner (
  id SERIAL PRIMARY KEY,
  cargo_admin_id INTEGER NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
  sub_info_id INTEGER NOT NULL REFERENCES partner_sub_info (id) ON DELETE CASCADE,
  express_type_id INTEGER NOT NULL REFERENCES partner_express_type (id),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(64),
  web TEXT,
  addition TEXT,
  signed_date TIMESTAMPTZ DEFAULT NOW(),
  confirm BOOLEAN DEFAULT FALSE,
  profile_file TEXT
);

CREATE INDEX IF NOT EXISTS partner_cargo_admin_idx ON partner (cargo_admin_id);

-- ---------------------------------------------------------------------------
-- partner_cross_road (улс хот хоорондын тээвэр)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS partner_cross_road (
  id SERIAL PRIMARY KEY,
  cargo_admin_id INTEGER NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
  insurance TEXT,
  head_number VARCHAR(64),
  ass_number VARCHAR(64),
  trans_mark TEXT,
  storage TEXT,
  ass_length VARCHAR(64),
  ass_width VARCHAR(64),
  start_zone TEXT,
  passed_zone TEXT,
  end_zone TEXT,
  trans_image TEXT,
  addition TEXT,
  trans_type TEXT,
  tonnage VARCHAR(64),
  signed_date TIMESTAMPTZ DEFAULT NOW(),
  confirm BOOLEAN DEFAULT FALSE,
  profile_file TEXT
);

CREATE INDEX IF NOT EXISTS partner_cross_road_admin_idx ON partner_cross_road (cargo_admin_id);

-- ---------------------------------------------------------------------------
-- partner_rate (per cargo admin account)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS partner_rate (
  id SERIAL PRIMARY KEY,
  cargo_admin_id INTEGER NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
  rate NUMERIC(12, 2) DEFAULT 0,
  total_rate NUMERIC(12, 2) DEFAULT 0,
  total_people INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS partner_rate_cargo_admin_idx ON partner_rate (cargo_admin_id);

-- ---------------------------------------------------------------------------
-- transport + packages + invoice
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transport (
  id SERIAL PRIMARY KEY,
  cargo_admin_id INTEGER NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
  container_code TEXT,
  transport_type TEXT,
  location_from TEXT,
  location_to TEXT,
  price_metr NUMERIC(18, 4),
  price_tn NUMERIC(18, 4),
  date_from DATE,
  date_to DATE,
  capacity_tn NUMERIC(18, 4),
  capacity_metr NUMERIC(18, 4),
  tonnage VARCHAR(64),
  container_size VARCHAR(64),
  status TEXT,
  signed_date TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS transport_cargo_admin_idx ON transport (cargo_admin_id);

CREATE TABLE IF NOT EXISTS packages (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
  package_category TEXT,
  addition TEXT,
  package_name TEXT,
  bundle_sort TEXT,
  total_piece INTEGER,
  weight_tn NUMERIC(18, 4),
  weight_kg NUMERIC(18, 4),
  weight_metr NUMERIC(18, 4),
  come_from TEXT,
  go_to TEXT,
  loaded_place TEXT,
  pinned_file TEXT,
  status_id INTEGER NOT NULL DEFAULT 1 REFERENCES package_status (id),
  transport_id INTEGER REFERENCES transport (id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS packages_account_idx ON packages (account_id);
CREATE INDEX IF NOT EXISTS packages_status_idx ON packages (status_id);

CREATE TABLE IF NOT EXISTS invoice (
  id SERIAL PRIMARY KEY,
  cargo_admin_id INTEGER NOT NULL REFERENCES accounts (id) ON DELETE CASCADE,
  user_code VARCHAR(32),
  package_id INTEGER NOT NULL REFERENCES packages (id) ON DELETE CASCADE,
  text TEXT,
  image TEXT,
  sent_date TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS invoice_package_idx ON invoice (package_id);
CREATE INDEX IF NOT EXISTS invoice_user_code_idx ON invoice (user_code);

-- Optional: default news sort for admin UI
INSERT INTO news_sort (id, sort)
VALUES (1, 'Ерөнхий')
ON CONFLICT (id) DO NOTHING;

SELECT setval(
  pg_get_serial_sequence('news_sort', 'id'),
  (SELECT COALESCE(MAX(id), 1) FROM news_sort)
);
