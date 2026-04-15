CREATE TABLE festival_performances (
  id INTEGER PRIMARY KEY,
  venue_id INTEGER NOT NULL REFERENCES venues(id),
  artist_name TEXT NOT NULL,
  set_time TEXT NOT NULL,
  headliner INTEGER NOT NULL DEFAULT 0
);

INSERT INTO festival_performances (venue_id, artist_name, set_time, headliner) VALUES
  (1, 'Luna Rivers', '19:00', 1),
  (1, 'The Velvet Keys', '17:30', 0),
  (2, 'Maya Chen', '20:15', 1),
  (2, 'Coastal Kids', '18:00', 0),
  (3, 'Jordan Blake', '21:00', 1),
  (3, 'Neko Pulse', '16:45', 0),
  (4, 'Sofia Alvarez', '19:30', 1);
