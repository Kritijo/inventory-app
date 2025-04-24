const { Router } = require("express");
const indexRouter = Router();

const inventoryController = require("../controllers/inventoryController");
const genreController = require("../controllers/genreController");
const bookController = require("../controllers/bookController");

indexRouter.get("/", inventoryController.home);
indexRouter.post("/newbook", bookController.addBook);
indexRouter.post("/newgenre", genreController.addGenre);
indexRouter.get("/search", inventoryController.searchBook);

module.exports = indexRouter;
