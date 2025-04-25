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

exports.updateBook = async (req, res) => {
    const {
        addBookGenre,
        getGenreInBook,
        removeGenresInBook,
    } = require("../db/queries/genreQueries");

    const id = parseInt(req.params.id);
    const { title, author, description, genres } = req.body;

    await db.updateBook(id, title, author, description);

    const newGenres = Array.isArray(genres)
        ? genres.map(Number)
        : [Number(genres)];
    const oldGenres = (await getGenreInBook(id)).map((g) => g.id);

    const toAdd = newGenres.filter((id) => !oldGenres.includes(id));
    const toRemove = oldGenres.filter((id) => !newGenres.includes(id));

    await Promise.all([
        ...toAdd.map((genreId) => addBookGenre(id, genreId)),
        ...toRemove.map((genreId) => removeGenresInBook(id, genreId)),
    ]);

    res.redirect("/");
};
