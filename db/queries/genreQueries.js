const pool = require("../pool");

async function addGenre(name) {
    await pool.query("INSERT INTO genres (name) VALUES ($1)", [name]);
}

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function addBookGenre(book_id, genre_id) {
    await pool.query(
        "INSERT INTO book_genre (book_id, genre_id) VALUES ($1, $2)",
        [book_id, genre_id]
    );
}

async function getBookInGenre(genre_id) {
    const { rows } = await pool.query(
        "SELECT b.* FROM books b JOIN book_genre bg ON bg.book_id = b.id JOIN genres g ON g.id = bg.genre_id WHERE g.id = $1",
        [genre_id]
    );
    return rows;
}

async function getGenreInBook(book_id) {
    const { rows } = await pool.query(
        "SELECT g.* FROM genres g JOIN book_genre bg ON bg.genre_id = g.id JOIN books b ON b.id = bg.book_id WHERE b.id = $1",
        [book_id]
    );
    return rows;
}

async function getGenreById(genre_id) {
    const { rows } = await pool.query("SELECT * FROM genres WHERE id=$1", [
        genre_id,
    ]);
    return rows[0];
}

async function removeGenresInBook(bookId, genreId) {
    await pool.query(
        "DELETE FROM book_genre WHERE book_id = $1 AND genre_id = $2",
        [bookId, genreId]
    );
}

async function deleteGenre(id) {
    await pool.query("DELETE FROM genres WHERE id=$1", [id]);
}

module.exports = {
    addGenre,
    getAllGenres,
    addBookGenre,
    getBookInGenre,
    getGenreInBook,
    getGenreById,
    removeGenresInBook,
    deleteGenre,
};
