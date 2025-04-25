const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

module.exports = new Pool({
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
