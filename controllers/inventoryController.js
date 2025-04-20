const db = require("../db/queries");

exports.home = async (req, res) => {
    const books = await db.getAllBooks();
    const genres = await db.getAllGenres();
    res.render("index", { books, genres });
};

exports.addNewBook = async (req, res) => {
    const title = req.body.title;
    await db.addBook(title);
    res.redirect("/");
};

exports.addNewGenre = async (req, res) => {
    const name = req.body.name;
    try {
        await db.addGenre(name);
    } catch (err) {
        console.log(err.detail);
    }
    res.redirect("/");
};

exports.viewBookDetails = async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await db.getBookById(id);
    res.render("bookDetails", { book });
};

exports.searchBook = async (req, res) => {
    const name = req.query.name;
    const book = await db.getBookByName(name);
    if (!book) {
        return res.status(404).render("partials/error");
    }
    res.render("bookDetails", { book });
};

exports.deleteBook = async (req, res) => {
    const id = parseInt(req.params.id);
    await db.deleteBook(id);
    res.redirect("/");
};
