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
