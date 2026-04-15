CREATE TABLE venues (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  capacity INTEGER NOT NULL
);

INSERT INTO venues (name, city, capacity) VALUES
  ('Starlight Amphitheater', 'Austin', 5200),
  ('Harbor Stage', 'Seattle', 3100),
  ('Metro Hall', 'Chicago', 4800),
  ('Garden Bowl', 'Portland', 2200);
