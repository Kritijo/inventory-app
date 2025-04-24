const db = require("../db/queries/bookQueries");

exports.addBook = async (req, res) => {
    const title = req.body.title;
    const id = await db.addBook(title);
    res.redirect(`/book/${id}`);
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
