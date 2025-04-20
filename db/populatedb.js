require("dotenv").config();
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
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: isProduction
            ? process.env.DB_URL
            : process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
