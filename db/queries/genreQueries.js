const pool = require("../pool");

async function addGenre(name) {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

module.exports = { addGenre, getAllGenres };
