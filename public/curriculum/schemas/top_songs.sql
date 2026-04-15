CREATE TABLE top_songs (
  id INTEGER PRIMARY KEY,
  track_name TEXT NOT NULL,
  artist TEXT NOT NULL,
  genre TEXT NOT NULL,
  release_date TEXT NOT NULL,
  spotify_streams INTEGER NOT NULL,
  album_name TEXT NOT NULL,
  duration_ms INTEGER NOT NULL
);

INSERT INTO top_songs (track_name, artist, genre, release_date, spotify_streams, album_name, duration_ms) VALUES
  ('Espresso', 'Sabrina Carpenter', 'Pop', '2024-04-11', 2100000000, 'Short n Sweet', 175000),
  ('Feather', 'Sabrina Carpenter', 'Pop', '2023-08-23', 1250000000, 'Emails I Can''t Send FWD:', 190000),
  ('Last Night', 'Morgan Wallen', 'Country', '2023-01-31', 2300000000, 'One Thing At A Time', 163000),
  ('Thinkin'' Bout Me', 'Morgan Wallen', 'Country', '2023-03-03', 980000000, 'One Thing At A Time', 177000),
  ('Fortnight', 'Taylor Swift', 'Pop', '2024-04-19', 980000000, 'The Tortured Poets Department', 229000),
  ('Cruel Summer', 'Taylor Swift', 'Pop', '2019-08-23', 2100000000, 'Lover', 178000),
  ('Texas Hold ''Em', 'Beyoncé', 'Country', '2024-02-11', 870000000, 'Cowboy Carter', 235000),
  ('Halo', 'Beyoncé', 'R&B', '2008-10-20', 1400000000, 'I Am... Sasha Fierce', 261000),
  ('Not Like Us', 'Kendrick Lamar', 'Hip-Hop', '2024-05-04', 920000000, 'Not Like Us', 274000),
  ('HUMBLE.', 'Kendrick Lamar', 'Hip-Hop', '2017-03-30', 1900000000, 'DAMN.', 177000),
  ('Beautiful Things', 'Benson Boone', 'Pop', '2024-01-18', 1500000000, 'Fireworks and Rollerblades', 180000),
  ('In The Stars', 'Benson Boone', 'Pop', '2022-04-29', 910000000, 'Walk Me Home...', 216000),
  ('Pink Skies', 'Lany', 'Indie', '2024-05-10', 120000000, 'Fables', 201000),
  ('Falling Fast', 'Isla Sky', 'Indie', '2023-02-14', 25000000, 'Forever February', 198000);
