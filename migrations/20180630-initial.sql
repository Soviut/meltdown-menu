CREATE TYPE user_types AS ENUM (
  'user', 'staff'
);

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(256) not null DEFAULT '',
  display_name VARCHAR(128) not null DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  user_type user_types DEFAULT 'user',
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc')
);

CREATE TABLE events(
  id SERIAL PRIMARY KEY,
  name VARCHAR(128) not null,
  description TEXT null DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  start_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'),
  end_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'),
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc')
);

CREATE TABLE promos(
  id SERIAL PRIMARY KEY,
  event INTEGER REFERENCES events ON DELETE CASCADE,
  priority INTEGER not null DEFAULT 0,
  public_start_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'),
  public_end_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc'),
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc')
);

CREATE TYPE asset_types AS ENUM (
  'generic', 'poster', 'promo_poster', 'icon', 'schedule_background'
);

CREATE TABLE assets(
  id SERIAL PRIMARY KEY,
  name VARCHAR(1024) not null,
  asset_url VARCHAR(2048) not null,
  thumbnail_url VARCHAR(2048) null DEFAULT '',
  asset_type asset_types DEFAULT 'generic',
  mime_type VARCHAR(128) null DEFAULT '',
  metadata JSON null DEFAULT '{}',
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc')
);

CREATE TABLE event_assets(
  id SERIAL PRIMARY KEY,
  event INTEGER REFERENCES events ON DELETE CASCADE,
  asset INTEGER REFERENCES assets ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'utc')
);

-- default user
INSERT INTO users(
  email,
  display_name,
  user_type
)
VALUES (
  'izamojc@zamtools.com',
  'Ian Zamojc',
  'staff'
);
