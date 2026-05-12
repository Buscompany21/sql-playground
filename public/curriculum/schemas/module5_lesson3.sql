-- Module 5, lesson 3 starts in the state lesson 2 would leave behind:
-- new_artists has exactly one row (Echo Park, the artist signed in lesson 2).
-- The learner inserts three more rows in a single INSERT statement.
CREATE TABLE new_artists (
  id INTEGER PRIMARY KEY,
  name TEXT,
  genre TEXT,
  country TEXT,
  signed_date DATE
);

INSERT INTO new_artists (id, name, genre, country, signed_date) VALUES
  (1, 'Echo Park', 'Pop', 'United States', '2026-06-01');
