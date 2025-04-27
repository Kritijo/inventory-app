const db = require("../db/queries/genreQueries");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

exports.addGenre = async (req, res) => {
    const { name, adminPassword } = req.body.name;
    if (adminPassword !== ADMIN_PASSWORD) {
        return res.status(403).render("partials/error", {
            errorMessage: "Forbidden: Incorrect password.",
        });
    }
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
