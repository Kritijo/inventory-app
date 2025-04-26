const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";
const fs = require("fs");
const path = require("path");

module.exports = new Pool({
    connectionString: isProduction
        ? process.env.DB_URL
        : process.env.DATABASE_URL,
    ssl: isProduction
        ? {
              rejectUnauthorized: true,
              ca: fs
                  .readFileSync(path.join(__dirname, "../certs/ca.pem"))
                  .toString(),
          }
        : false,
});
