const db = require("../db/queries/bookQueries");
const gdb = require("../db/queries/genreQueries");

exports.home = async (req, res) => {
    const books = await db.getAllBooks();
    const genres = await gdb.getAllGenres();
    res.render("index", { books, genres });
};

exports.viewBookDetails = async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await db.getBookById(id);
    const allGenres = await gdb.getAllGenres();
    const genres = await gdb.getGenreInBook(id);
    res.render("bookDetails", { book, allGenres, genres });
};

exports.searchBook = async (req, res) => {
    const name = req.query.name;
    const books = await db.getBookByName(name);
    if (!books || books.length === 0) {
        return res.status(404).render("partials/error");
    }
    if (books.length === 1) {
        const id = books[0].id;
        return exports.viewBookDetails({ params: { id } }, res);
    } else {
        res.render("searchResults", { books });
    }
};
