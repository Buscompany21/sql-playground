CREATE TABLE festival_performances (
  id INTEGER PRIMARY KEY,
  venue_id INTEGER NOT NULL REFERENCES venues(id),
  artist_name TEXT NOT NULL,
  set_time TEXT NOT NULL,
  headliner INTEGER NOT NULL DEFAULT 0
);

INSERT INTO festival_performances (venue_id, artist_name, set_time, headliner) VALUES
  (1, 'Sabrina Carpenter', '19:00', 1),
  (1, 'Taylor Swift', '17:30', 0),
  (2, 'Taylor Swift', '20:15', 1),
  (2, 'Beyoncé', '18:00', 0),
  (3, 'Kendrick Lamar', '21:00', 1),
  (3, 'Morgan Wallen', '16:45', 0),
  (4, 'Benson Boone', '19:30', 1),
  (4, 'Lany', '15:00', 0);
