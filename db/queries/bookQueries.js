const pool = require("../pool");

async function getAllBooks() {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows;
}

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function addBook(title) {
    const result = await pool.query(
        "INSERT INTO books (title) VALUES ($1) RETURNING id",
        [title]
    );
    return result.rows[0].id;
}

async function getBookById(id) {
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1", [
        id,
    ]);
    return rows[0];
}

async function getBookByName(name) {
    const { rows } = await pool.query(
        "SELECT * FROM books WHERE title ILIKE $1",
        [`${name}%`]
    );
    return rows;
}

async function deleteBook(id) {
    await pool.query("DELETE FROM books WHERE id=$1", [id]);
}

async function updateBook(id, title, author, description) {
    await pool.query(
        "UPDATE books SET title = $1, author = $2, description = $3 WHERE id = $4",
        [title, author, description, id]
    );
}

module.exports = {
    getAllBooks,
    getAllGenres,
    addBook,
    getBookById,
    getBookByName,
    deleteBook,
    updateBook,
};
