-- Module 5, lesson 4 starts in the state lesson 3 would leave behind:
-- new_artists holds the four rows built up by lessons 2 and 3 (one signing
-- followed by a three-row showcase signing). The learner runs UPDATE
-- against one of those rows.
CREATE TABLE new_artists (
  id INTEGER PRIMARY KEY,
  name TEXT,
  genre TEXT,
  country TEXT,
  signed_date DATE
);

INSERT INTO new_artists (id, name, genre, country, signed_date) VALUES
  (1, 'Echo Park', 'Pop', 'United States', '2026-06-01'),
  (2, 'River Lights', 'Indie', 'Cambodia', '2026-06-15'),
  (3, 'Crown Heights', 'Hip-Hop', 'England', '2026-06-18'),
  (4, 'Luna Ray', 'R&B', 'Australia', '2026-06-20');
