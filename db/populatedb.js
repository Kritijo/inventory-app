require("dotenv").config();
const fs = require("fs");
const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

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
)
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: isProduction
            ? process.env.DB_URL
            : process.env.DATABASE_URL,
        ssl: isProduction
            ? {
                  rejectUnauthorized: false,
                  ca: fs
                      .readFileSync(path.join(__dirname, "ca-certificate.crt"))
                      .toString(),
              }
            : false,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
