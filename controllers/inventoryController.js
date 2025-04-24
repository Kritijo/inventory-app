const db = require("../db/queries/bookQueries");

exports.home = async (req, res) => {
    const books = await db.getAllBooks();
    const genres = await db.getAllGenres();
    res.render("index", { books, genres });
};

exports.viewBookDetails = async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await db.getBookById(id);
    res.render("bookDetails", { book });
};

exports.searchBook = async (req, res) => {
    const name = req.query.name;
    const books = await db.getBookByName(name);
    if (!books || books.length === 0) {
        return res.status(404).render("partials/error");
    }
    if (books.length === 1) {
        res.render("bookDetails", { book: books[0] });
    } else {
        res.render("searchResults", { books });
    }
};


