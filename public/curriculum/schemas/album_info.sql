-- Label directory for Stellar Sound. Eight labels only; album_name matches top_songs
-- exactly. Ten chart albums are omitted (no row here) so JOIN lessons show gaps—including
-- ranks 3–4 on the top five, which still have no label directory match.
CREATE TABLE album_info (
  album_name TEXT PRIMARY KEY,
  label TEXT NOT NULL
);

INSERT INTO album_info (album_name, label) VALUES
  ('american dream', 'Prairie Post Sound'),
  ('Blonde', 'Bay Street Entertainment'),
  ('DECIDE', 'Neon Tape LLC'),
  ('Die With A Smile', 'Cedar Lane Label'),
  ('emails i can''t send fwd:', 'Riverside Audio'),
  ('eternal sunshine', 'Midnight Circuit'),
  ('Fireworks & Rollerblades', 'Riverside Audio'),
  ('Flower Boy', 'Bay Street Entertainment'),
  ('Good Luck, Babe!', 'Riverside Audio'),
  ('greedy', 'Midnight Circuit'),
  ('Heading South', 'Summit Records'),
  ('HIT ME HARD AND SOFT', 'Riverside Audio'),
  ('I Love You.', 'Bay Street Entertainment'),
  ('I''ve Tried Everything But Therapy (Part 1)', 'Neon Tape LLC'),
  ('Lover', 'Riverside Audio'),
  ('Lovin On Me', 'Midnight Circuit'),
  ('MILLION DOLLAR BABY', 'Neon Tape LLC'),
  ('Not Like Us', 'Harbor Light Music'),
  ('One Thing At A Time', 'Summit Records'),
  ('Pink Skies', 'Summit Records'),
  ('Scared To Start', 'Neon Tape LLC'),
  ('Short n'' Sweet', 'Riverside Audio'),
  ('Something in the Orange', 'Summit Records'),
  ('SOS', 'Bay Street Entertainment'),
  ('Stick Season', 'Summit Records'),
  ('The Land Is Inhospitable and So Are We', 'Cedar Lane Label'),
  ('The Rise and Fall of a Midwest Princess', 'Riverside Audio'),
  ('THE TORTURED POETS DEPARTMENT', 'Riverside Audio'),
  ('UTOPIA', 'Prairie Post Sound'),
  ('VULTURES 1', 'Prairie Post Sound'),
  ('WE DON''T TRUST YOU', 'Harbor Light Music'),
  ('Zach Bryan', 'Summit Records');
