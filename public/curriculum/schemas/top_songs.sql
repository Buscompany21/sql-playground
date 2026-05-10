CREATE TABLE top_songs (
  id INTEGER PRIMARY KEY,
  track_name TEXT NOT NULL,
  artist TEXT NOT NULL,
  genre TEXT NOT NULL,
  release_date TEXT NOT NULL,
  spotify_streams INTEGER NOT NULL,
  album_name TEXT NOT NULL,
  duration_ms INTEGER NOT NULL,
  weeks_on_chart INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE album_info (
  album_name TEXT PRIMARY KEY,
  label TEXT NOT NULL
);

INSERT INTO album_info (album_name, label) VALUES
  ('Future Nostalgia', 'Warner Records'),
  ('Short n Sweet', 'Island Records'),
  ('The Tortured Poets Department', 'Republic Records'),
  ('Cowboy Carter', 'Parkwood / Columbia'),
  ('One Thing At A Time', 'Big Loud / Republic'),
  ('Lover', 'Republic Records'),
  ('DAMN.', 'Top Dawg / Aftermath'),
  ('Not Like Us', 'pgLang / Interscope');

INSERT INTO top_songs (id, track_name, artist, genre, release_date, spotify_streams, album_name, duration_ms, weeks_on_chart) VALUES
  (1001, 'Training Wheels', 'Nova Keys', 'Pop', '2024-01-10', 120000000, 'Indie Loft Sessions', 188000, 8),
  (1002, 'Neon River', 'Nova Keys', 'Pop', '2024-02-05', 95000000, 'River City Mixtape', 192000, 11),
  (1003, 'Levitating', 'Dua Lipppa', 'Pop', '2020-10-01', 1900000000, 'Future Nostalgia', 203000, 36),
  (1004, 'Please Please Please', 'Sabrina Carpenter', 'Pop', '2024-06-07', 800000000, 'Short n Sweet', 186000, 18),
  (1005, 'Fortnight', 'Taylor Swift', 'Pop', '2024-04-19', 980000000, 'The Tortured Poets Department', 229000, 40),
  (1, 'Feather', 'Sabrina Carpenter', 'Pop', '2023-08-23', 1250000000, 'Emails I Can''t Send FWD:', 190000, 19),
  (2, 'Last Night', 'Morgan Wallen', 'Country', '2023-01-31', 2300000000, 'One Thing At A Time', 163000, 31),
  (3, 'Thinkin'' Bout Me', 'Morgan Wallen', 'Country', '2023-03-03', 980000000, 'One Thing At A Time', 177000, 17),
  (4, 'Cruel Summer', 'Taylor Swift', 'Pop', '2019-08-23', 2100000000, 'Lover', 178000, 52),
  (5, 'Texas Hold ''Em', 'Beyoncé', 'Country', '2024-02-11', 870000000, 'Cowboy Carter', 235000, 28),
  (6, 'Halo', 'Beyoncé', 'R&B', '2008-10-20', 1400000000, 'I Am... Sasha Fierce', 261000, 45),
  (7, 'Not Like Us', 'Kendrick Lamar', 'Hip-Hop', '2024-05-04', 920000000, 'Not Like Us', 274000, 20),
  (8, 'HUMBLE.', 'Kendrick Lamar', 'Hip-Hop', '2017-03-30', 1900000000, 'DAMN.', 177000, 33),
  (9, 'Beautiful Things', 'Benson Boone', 'Pop', '2024-01-18', 1500000000, 'Fireworks and Rollerblades', 180000, 21),
  (10, 'In The Stars', 'Benson Boone', 'Pop', '2022-04-29', 910000000, 'Walk Me Home...', 216000, 14),
  (11, 'Pink Skies', 'Lany', 'Indie', '2024-05-10', 120000000, 'Fables', 201000, 16),
  (12, 'Falling Fast', 'Isla Sky', 'Indie', '2023-02-14', 25000000, 'Forever February', 198000, 9),
  (13, 'Night Market Beat', 'Roam City', 'Pop', '2024-06-15', 50000000, 'Roam City EP', 200000, 5),
  (14, 'River Run', 'Roam City', 'Indie', '2024-06-20', 45000000, 'Roam City EP', 205000, 7);
