require("dotenv").config();

const DATABASE_URL = process.env.EXTERNAL_URL || process.env.DATABASE_URL;

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  description TEXT,
  added TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS genres (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS book_genre(
  book_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (book_id, genre_id),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

INSERT INTO genres (name)
VALUES 
  ('Romance'), 
  ('Fantasy'), 
  ('Autobiography');

INSERT INTO books (title, author, description)
VALUES 
  ('Harry Potter and the Goblet of Fire', 'J. K. Rowling', 'Harry competes in the Triwizard Tournament while uncovering dark secrets and Voldemort''s return.'),
  ('Becoming', 'Michelle Obama', 'Michelle Obama''s memoir about her journey from childhood to First Lady of the U.S.'),
  ('Pride and Prejudice', 'Jane Austen', 'A classic romance between Elizabeth Bennet and Mr. Darcy, exploring love and class in 19th-century England.');

INSERT INTO book_genre (book_id, genre_id)
SELECT b.id, g.id
FROM books b
JOIN genres g ON g.name = 'Fantasy'
WHERE b.title = 'Harry Potter and the Goblet of Fire';

INSERT INTO book_genre (book_id, genre_id)
SELECT b.id, g.id
FROM books b
JOIN genres g ON g.name = 'Romance'
WHERE b.title = 'Pride and Prejudice';

INSERT INTO book_genre (book_id, genre_id)
SELECT b.id, g.id
FROM books b
JOIN genres g ON g.name = 'Autobiography'
WHERE b.title = 'Becoming';
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
