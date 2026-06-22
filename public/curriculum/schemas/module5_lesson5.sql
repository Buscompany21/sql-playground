-- Module 5, lesson 5 starts in the state lesson 4 would leave behind:
-- the same four rows as lesson 4's schema, except Echo Park (id 1) has
-- already been moved from United States to Mexico by the lesson-4 UPDATE.
-- The learner runs DELETE to drop the Australia artist.
CREATE TABLE new_artists (
  id INTEGER PRIMARY KEY,
  name TEXT,
  genre TEXT,
  country TEXT,
  signed_date DATE
);

INSERT INTO new_artists (id, name, genre, country, signed_date) VALUES
  (1, 'Echo Park', 'Pop', 'Mexico', '2026-06-01'),
  (2, 'River Lights', 'Indie', 'Cambodia', '2026-06-15'),
  (3, 'Crown Heights', 'Hip-Hop', 'England', '2026-06-18'),
  (4, 'Luna Ray', 'R&B', 'Australia', '2026-06-20');
