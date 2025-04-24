const db = require("../db/queries");

exports.home = async (req, res) => {
    const books = await db.getAllBooks();
    const genres = await db.getAllGenres();
    res.render("index", { books, genres });
};

exports.addNewBook = async (req, res) => {
    const title = req.body.title;
    const id = await db.addBook(title);
    res.redirect(`/book/${id}`);
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

exports.deleteBook = async (req, res) => {
    const id = parseInt(req.params.id);
    await db.deleteBook(id);
    res.redirect("/");
};

exports.getBook = async (req, res) => {
    const id = parseInt(req.params.id);
    const book = await db.getBookById(id);
    res.render("updateDetails", { book });
};

exports.updateBook = async (req, res) => {
    const id = parseInt(req.params.id);
    const form = req.body;
    await db.updateBook(id, form.title, form.author, form.description);
    res.redirect(`/book/${id}`);
};
