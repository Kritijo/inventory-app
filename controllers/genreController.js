const db = require("../db/queries/genreQueries");

exports.addGenre = async (req, res) => {
    const name = req.body.name;
    try {
        await db.addGenre(name);
    } catch (err) {
        console.log(err.detail);
    }
    res.redirect("/");
};

exports.getGenre = async (req, res) => {
    const id = req.params.id;
    const books = await db.getBookInGenre(id);
    const genre = await db.getGenreById(id);
    res.render("genreBooks", { books, genre });
};

exports.deleteGenre = async (req, res) => {
    const id = req.params.id;
    await db.deleteGenre(id);
    res.redirect("/");
};