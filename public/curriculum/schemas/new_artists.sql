CREATE TABLE IF NOT EXISTS new_artists (
  name VARCHAR(100),
  genre VARCHAR(50),
  city VARCHAR(100),
  state VARCHAR(100)
);

INSERT INTO new_artists (name, genre, city, state) VALUES
  ('Luna Ray', 'Pop', 'Austin', 'TX'),
  ('Blaze Carter', 'Hip-Hop', 'Detroit', 'MI'),
  ('Isla Sky', 'Indie', 'Portland', 'OR');
