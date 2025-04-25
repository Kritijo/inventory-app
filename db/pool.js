const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

module.exports = new Pool({
    connectionString: isProduction
        ? process.env.DB_URL
        : process.env.DATABASE_URL,
    ssl: isProduction
        ? {
              rejectUnauthorized: false,
              ca: fs.readFileSync("/path/to/ca-certificate.crt").toString(),
          }
        : false,
});
