-- Module 5, lesson 2 starts in the state lesson 1 would leave behind:
-- the new_artists table exists but is empty. The learner inserts one row.
CREATE TABLE new_artists (
  id INTEGER PRIMARY KEY,
  name TEXT,
  genre TEXT,
  country TEXT,
  signed_date DATE
);
