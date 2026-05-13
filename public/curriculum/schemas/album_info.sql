-- Label directory for Stellar Sound. Album names align with top_songs; two
-- training-chart albums are intentionally omitted so JOIN lessons can show gaps.
CREATE TABLE album_info (
  album_name TEXT PRIMARY KEY,
  label TEXT NOT NULL
);

INSERT INTO album_info (album_name, label) VALUES
  ('Future Nostalgia', 'Warner Records'),
  ('Short n Sweet', 'Island Records'),
  ('The Tortured Poets Department', 'Republic Records'),
  ('Emails I Can''t Send FWD:', 'Island Records'),
  ('One Thing At A Time', 'Big Loud / Republic'),
  ('Lover', 'Republic Records'),
  ('Cowboy Carter', 'Parkwood / Columbia'),
  ('I Am... Sasha Fierce', 'Columbia / Music World'),
  ('Not Like Us', 'pgLang / Interscope'),
  ('DAMN.', 'Top Dawg / Aftermath'),
  ('Fireworks and Rollerblades', 'Night Street / Warner'),
  ('Walk Me Home...', 'Night Street / Warner'),
  ('Fables', 'Lany Music LLC'),
  ('Forever February', 'Skyline Indie'),
  ('Roam City EP', 'Roam City Audio');
