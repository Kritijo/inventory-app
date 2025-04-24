const pool = require("../pool");

async function addGenre(name) {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

module.exports = { addGenre };
