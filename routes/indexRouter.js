const { Router } = require("express");
const indexRouter = Router();

const inventoryController = require("../controllers/inventoryController");

indexRouter.get("/", inventoryController.home);
indexRouter.post("/newbook", inventoryController.addNewBook);
indexRouter.post("/newgenre", inventoryController.addNewGenre);
indexRouter.get("/search", inventoryController.searchBook);

module.exports = indexRouter;
