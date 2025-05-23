const { Pool } = require("pg");
const DATABASE_URL = process.env.EXTERNAL_URL;

module.exports = new Pool({
    connectionString: DATABASE_URL,
    ssl:
        process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
});
