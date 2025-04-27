const { Pool } = require("pg");
const DATABASE_URL = process.env.DATABASE_URL;

module.exports = new Pool({ connectionString: DATABASE_URL });
