CREATE TABLE IF NOT EXISTS demo_songs (
  song_title VARCHAR(100),
  artist_name VARCHAR(100),
  submission_date DATE
);

INSERT INTO demo_songs (song_title, artist_name, submission_date) VALUES
  ('Sunset City', 'Luna Ray', '2024-06-01'),
  ('Bounce Back', 'Blaze Carter', '2024-06-02'),
  ('First Light', 'Isla Sky', '2024-06-03');